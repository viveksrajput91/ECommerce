using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configs
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p=>p.Id).IsRequired();
            builder.Property(p=>p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p=>p.Description).IsRequired().HasMaxLength(180);
            builder.Property(p=>p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p=>p.PictureUrl).IsRequired();
            builder.HasOne(b=>b.ProductBrand).WithMany()
            .HasForeignKey(f=>f.ProductBrandId);
            builder.HasOne(t=>t.ProductType).WithMany()
            .HasForeignKey(f=>f.ProductTypeId);
        }
    }
}