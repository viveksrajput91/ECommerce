using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo,IGenericRepository<ProductBrand> productBrandRepo,
            IGenericRepository<ProductType> productTypeRepo,IMapper mapper)
        {
            _mapper = mapper;
            _productRepo = productRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
        }

        [HttpGet]
        [Cached(600)]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productSpecParams)
        {
            var spec=new ProductsWithTypesAndBrandsSpecification(productSpecParams);
            var countSpec=new ProductsWithFiltersCountSpecification(productSpecParams);
            var count= await _productRepo.CountAsync(countSpec);
            var products = await _productRepo.ListAsync(spec);  

            var Data= _mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products);      

            return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex,productSpecParams.PageSize,count,Data));
        }

        [HttpGet("{id}")]
        [Cached(600)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec=new ProductsWithTypesAndBrandsSpecification(p=>p.Id==id);
            var product= await _productRepo.GetEntityWithSpecification(spec);
            if(product==null) return NotFound(new ApiResponse(404));
            return _mapper.Map<Product,ProductToReturnDto>(product);
        }
        
        [HttpGet("brands")]
        [Cached(600)]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProductBrands()
        {
            return  Ok(await _productBrandRepo.ListAllAsync());
        }

        [HttpGet("types")]
        [Cached(600)]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }
    }
}