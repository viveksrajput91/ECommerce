using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message=null)
        {
            StatusCode = statusCode;
            Message = message ?? GetCustomizedError(statusCode);
        }

        private string GetCustomizedError(int statusCode)
        {
            return statusCode switch
            {
                400=>"A Bad Request",
                401=>"A Non-Authorize Request",
                404=>"A Not Found Request",
                500=>"A Server Error Request",
                _=>null
            };
        }

        public int StatusCode { get; set; }
        
        public string Message { get; set; }
        
        
    }
}