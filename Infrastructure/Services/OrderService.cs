using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specification;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository basketRepository;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IBasketRepository basketRepository,IUnitOfWork unitOfWork)
        {
            this.basketRepository = basketRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            var basket= await basketRepository.GetBasketAsync(basketId);
            var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem= await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered=new ProductItemOrdered(productItem.Id,productItem.Name,productItem.PictureUrl);
                var orderItem=new OrderItem(itemOrdered,productItem.Price,item.Quantity);
                items.Add(orderItem);
            }

            var deliveryMethod= await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            var subTotal= items.Sum(i=>i.Price * i.Quantity);
            var order= new Order(items,buyerEmail,shippingAddress,deliveryMethod,subTotal);

            _unitOfWork.Repository<Order>().Add(order);

            var result = await _unitOfWork.Complete();

            if(result <=0) return null;

            await basketRepository.DeleteCustomerBasket(basketId);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec= new OrdersWithItemsAndOrderingSpecification(id,buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpecification(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec=new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);   
        }
    }
}