namespace Microsoft.eShopOnContainers.Services.Catalog.API.Infrastructure.EntityConfigurations;

class CatalogItemEntityTypeConfiguration
    : IEntityTypeConfiguration<CatalogItem>
{
    public void Configure(EntityTypeBuilder<CatalogItem> builder)
    {
        builder.ToTable("Catalog");

        builder.Property(ci => ci.Id)
            .UseHiLo("catalog_hilo")
            .IsRequired();

        builder.Property(ci => ci.Name)
            .IsRequired(true)
            .HasMaxLength(50);

        builder.Property(ci => ci.Price)
            .HasColumnType(typeof(decimal).Name)
            .HasPrecision(8)
            .IsRequired(true);

        builder.Property(ci => ci.PictureFileName)
            .IsRequired(false);

        builder.Property(ci => ci.NumberOfLines)
            .IsRequired(true);

        builder.HasOne(ci => ci.Brand)
            .WithMany()
            .HasForeignKey(ci => ci.BrandId);

        builder.OwnsOne(ci => ci.Category, od =>
        {
            od.ToTable("Category");
            od.HasKey(ci => ci.Id);
            od.Property(ci => ci.Id).UseHiLo("categoryseq");
        });

        builder.OwnsOne(ci => ci.Dimension, od => 
        {
            od.ToTable("Dimension");
        });

    }
}
