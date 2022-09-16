using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers
{
    public class CachedAttribute : Attribute, IAsyncActionFilter
    {
        private readonly int _timeToLiveInSeconds;
        public CachedAttribute(int timeToLiveInSeconds)
        {
            this._timeToLiveInSeconds = timeToLiveInSeconds;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var cacheService = context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();   
            var cacheKey= GenerateCacheKeyFromRequest(context.HttpContext.Request);
            var cachedRespone = await cacheService.GetResponseAsync(cacheKey);
            if(!string.IsNullOrEmpty(cachedRespone))
            {
                var contentResult= new ContentResult
                {
                    Content=cachedRespone,
                    ContentType="application/json",
                    StatusCode=200
                };

                context.Result=contentResult;
                return;
            }

            var executedContext = await next(); //move to controller
            if(executedContext.Result is OkObjectResult okObjectResult)
            {
                await cacheService.CacheResponseAsync(cacheKey,okObjectResult.Value,TimeSpan.FromSeconds(_timeToLiveInSeconds));
            }
        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            var KeyBuilder = new StringBuilder();
            KeyBuilder.Append($"{request.Path}");
            foreach (var (key,value) in request.Query.OrderBy(x=>x.Key))
            {
                KeyBuilder.Append($"|{key}-{value}");
            }   
            return KeyBuilder.ToString();
        }
    }
}