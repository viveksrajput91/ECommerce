using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using API.Errors;
using System.IO;
using Stripe;
using Core.Entities.OrderAggregate;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        private readonly ILogger<PaymentsController> logger;
        private const string WhSecret = "whsec_f5f14c1d1ca66948dc830af1d00d0a72ae144cdba6b9b4952d24173f74825bfc";

        public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger)
        {
            _paymentService = paymentService;
            this.logger = logger;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var CustomerBasket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);
            return CustomerBasket==null?
            BadRequest(new ApiResponse(400,"There is some issue with your basket")):CustomerBasket;
        }

        [HttpPost("webhook")]

        public async Task<ActionResult> StripeWebHook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json,Request.Headers["Stripe-Signature"],WhSecret);
            PaymentIntent paymentIntent;
            Order order;
            switch(stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    paymentIntent=(PaymentIntent) stripeEvent.Data.Object;
                    logger.LogInformation("Payment succeeded: ",paymentIntent.Id);
                    order = await _paymentService.UpdateOrderPaymentSucceeded(paymentIntent.Id);
                    logger.LogInformation("Order updated to payment received");
                    break;
                case "payment_intent.payment_failed":
                    paymentIntent=(PaymentIntent) stripeEvent.Data.Object;
                    logger.LogInformation("Payment Failed: ",paymentIntent.Id);
                    order = await _paymentService.UpdateOrderPaymentFailed(paymentIntent.Id);
                    logger.LogInformation("Order updated to payment failed");
                    break;    
            }

            return new EmptyResult();
        }
        
    }
}