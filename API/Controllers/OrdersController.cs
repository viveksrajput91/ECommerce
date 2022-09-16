using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;
        private readonly ILogger<OrdersController> logger;

        public OrdersController(IOrderService orderService,IMapper mapper,ILogger<OrdersController> logger)
        {
            this.orderService = orderService;
            this.mapper = mapper;
            this.logger = logger;
        }
        [HttpPost]
        public async Task<ActionResult<OrderToReturnDto>> CreateOrderAsync(OrderDto orderDto)
        {
            var buyerEmail= HttpContext.User.GetUserEmailFromClaimsPrincipal();
            var shippingAddress = mapper.Map<AddressDto,Address>(orderDto.ShippingAddress);
            var order = await orderService.CreateOrderAsync(buyerEmail,orderDto.DeliveryMethodId,orderDto.BasketId,shippingAddress);
            if(order==null)
                return BadRequest(new ApiResponse(400,"Error while creating Order"));
            
            return Ok(mapper.Map<Order,OrderToReturnDto>(order));

        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUserAsync()
        {
            var buyerEmail= HttpContext.User.GetUserEmailFromClaimsPrincipal();
            var order = await orderService.GetOrdersForUserAsync(buyerEmail);
            logger.LogInformation("Orders",order);
            return Ok(mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(order));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var buyerEmail= HttpContext.User.GetUserEmailFromClaimsPrincipal();
            var order = await orderService.GetOrderByIdAsync(id,buyerEmail);
            if(order==null) return BadRequest(new ApiResponse(404));
            return mapper.Map<Order,OrderToReturnDto>(order);
        }

        [HttpGet("deliveryMethod")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
        {
            return Ok(await orderService.GetDeliveryMethodsAsync());
        }
    }
}