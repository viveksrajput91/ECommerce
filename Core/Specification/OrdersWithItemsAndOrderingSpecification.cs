using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;

namespace Core.Specification
{
    public class OrdersWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItemsAndOrderingSpecification(string buyerEmail) : base(o=>o.BuyerEmail==buyerEmail)
        {
            AddInclude(o=>o.DeliveryMethod);
            AddInclude(o=>o.OrderItems);
            AddOrderByDesc(o=>o.OrderDate);
        }

        public OrdersWithItemsAndOrderingSpecification(int id,string buyerEmail) : base(o=>o.Id==id && o.BuyerEmail==buyerEmail)
        {
            AddInclude(o=>o.DeliveryMethod);
            AddInclude(o=>o.OrderItems);   
        }
    }
}