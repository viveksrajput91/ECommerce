using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specification;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> QueryableEntity, ISpecification<TEntity> spec)
        {
            var Query = QueryableEntity;
            if (spec.Criteria != null)
            {
                Query = Query.Where(spec.Criteria);
            }

            if (spec.OrderBy != null)
            {
                Query = Query.OrderBy(spec.OrderBy);
            }

            if (spec.OrderByDescending != null)
            {
                Query = Query.OrderByDescending(spec.OrderByDescending);
            }

            if(spec.IsPagingEnabled)
            {
                Query=Query.Skip(spec.Skip).Take(spec.Take);
            }

            Query = spec.Includes.Aggregate(Query, (Current, inclue) => Current.Include(inclue));

            return Query;
        }
    }
}