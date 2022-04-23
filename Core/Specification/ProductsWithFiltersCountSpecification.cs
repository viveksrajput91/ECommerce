using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class ProductsWithFiltersCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersCountSpecification(ProductSpecParams productSpecParams) : 
            base(x=>(string.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Contains(productSpecParams.Search)) && 
                (!productSpecParams.TypeId.HasValue || x.ProductTypeId==productSpecParams.TypeId)
                && (!productSpecParams.BrandId.HasValue || x.ProductBrandId==productSpecParams.BrandId))
        {
        }
    }
}