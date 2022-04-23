using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product,ProductToReturnDto>()
                .ForMember(dest=>dest.ProductType,o=>o.MapFrom(src=>src.ProductType.Name))
                .ForMember(dest=>dest.ProductBrand,o=>o.MapFrom(p=>p.ProductBrand.Name))
                .ForMember(dest=>dest.PictureUrl,o=>o.MapFrom<ProductUrlResolver>());
        }
    }
}