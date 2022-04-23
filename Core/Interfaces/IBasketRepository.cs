using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync(string Id);
        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket);
        Task<bool> DeleteCustomerBasket(string Id);   
    }
}