using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;
using Microsoft.Extensions.Configuration;
using Stripe;
namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        public PaymentService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
        {
            this._config = config;
            this._unitOfWork = unitOfWork;
            this._basketRepository = basketRepository;
        }

        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey= _config["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsync(basketId);
            if(basket ==null) return null;
            
            var shippingPrice = 0m;
            if(basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync((int)basket.DeliveryMethodId);
                shippingPrice=deliveryMethod.Price;
            }

            foreach (var item in basket.Items)
            {
                var product = await _unitOfWork.Repository<Core.Entities.Product>().GetByIdAsync(item.Id);
                if(product.Price != item.Price)
                    item.Price=product.Price;
            }

            var service = new PaymentIntentService();
            PaymentIntent intent;

            if(string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions{
                    Amount = basket.Items.Sum(i=>i.Quantity * (long)(i.Price * 100)) + (long)(shippingPrice*100),
                    Currency="usd",
                    PaymentMethodTypes=new List<string>{"card"},
                    Description="Software testing",
                    Shipping = new ChargeShippingOptions
                                    {
                                        Name = "Vivek Singh",
                                        Address = new AddressOptions
                                        {
                                            Line1 = "510 Townsend St",
                                            PostalCode = "98140",
                                            City = "San Francisco",
                                            State = "CA",
                                            Country = "US",
                                        },
                                    },
                };

                intent = await service.CreateAsync(options);
                basket.PaymentIntentId=intent.Id;
                basket.ClientSecret=intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions{
                    Amount = basket.Items.Sum(i=>i.Quantity + (long)(i.Price *100)) + (long)(shippingPrice*100)
                };
                await service.UpdateAsync(basket.PaymentIntentId,options);
            }

            var customerOptions = new CustomerCreateOptions
            {
                Name = "Vivek Singh",
                Address = new AddressOptions
                {
                    Line1 = "510 Townsend St",
                    PostalCode = "98140",
                    City = "San Francisco",
                    State = "CA",
                    Country = "US",
                },
            };
            var customerService = new CustomerService();
            await customerService.CreateAsync(customerOptions);

            await _basketRepository.UpdateBasketAsync(basket);

            return basket;
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);
            if(order == null) return null;

            order.OrderStatus=OrderStatus.PaymentReceived;
            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.Complete();
            return order;        
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymenttIntentId)
        {
            var spec = new OrderByPaymentIntentIdSpecification(paymenttIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);
            if(order == null) return null;
            order.OrderStatus=OrderStatus.PaymentFailed;
            _unitOfWork.Repository<Order>().Update(order);
            await _unitOfWork.Complete();
            return order;
        }
    }
}