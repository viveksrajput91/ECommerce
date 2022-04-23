using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database;
        public BasketRepository(IConnectionMultiplexer connectionMultiplexer)
        {
            _database=connectionMultiplexer.GetDatabase();
        }
        public async Task<bool> DeleteCustomerBasket(string Id)
        {
            return await _database.KeyDeleteAsync(Id);
        }

        public async Task<CustomerBasket> GetBasketAsync(string Id)
        {
            var data= await _database.StringGetAsync(Id);
            return data.IsNullOrEmpty ? null:JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket)
        {
            var created= await _database.StringSetAsync(customerBasket.Id,JsonSerializer.Serialize(customerBasket));
            if(!created) return null;
            return await GetBasketAsync(customerBasket.Id);
        }
    }
}