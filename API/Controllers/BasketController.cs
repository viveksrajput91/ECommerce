using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using AutoMapper;
using API.Dtos;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketByIdAsync(string Id)
        {
            var basket= await _basketRepository.GetBasketAsync(Id);
            return Ok(basket??new CustomerBasket(Id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync(CustomerBasketDto customerBasketDto)
        {
            var customerBasket= _mapper.Map<CustomerBasketDto,CustomerBasket>(customerBasketDto);
            var basket=await _basketRepository.UpdateBasketAsync(customerBasket);
            return Ok(basket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string Id)
        {
            await _basketRepository.DeleteCustomerBasket(Id);
        }
    }
}