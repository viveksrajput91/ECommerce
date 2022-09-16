using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database=redis.GetDatabase();
        }

        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if(response ==null)
            {
                return;
            }

            var option = new JsonSerializerOptions{
                PropertyNamingPolicy=JsonNamingPolicy.CamelCase
            };

            var serializedResponse= JsonSerializer.Serialize(response,option);

            await _database.StringSetAsync(cacheKey,serializedResponse,timeToLive);
        }

        public async Task<string> GetResponseAsync(string cacheKey)
        {
            return await _database.StringGetAsync(cacheKey);
        }
    }
}