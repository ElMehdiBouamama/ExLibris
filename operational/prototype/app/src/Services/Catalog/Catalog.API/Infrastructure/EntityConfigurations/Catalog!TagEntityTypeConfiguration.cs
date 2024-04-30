namespace Microsoft.eShopOnContainers.Services.Catalog.API.Infrastructure.EntityConfigurations;

class CatalogColorsEntityTypeConfiguration
    : IEntityTypeConfiguration<CatalogColors>
{
    public void Configure(EntityTypeBuilder<CatalogColors> builder)
    {
        builder.ToTable("CatalogColors");

        builder.HasKey(ci => new { ci.CatalogItemId, ci.CatalogColorId });
        
        builder.HasOne(ci => ci.CatalogItem)
            .WithMany(ci => ci.Colors)
            .HasForeignKey(ci => ci.CatalogItemId);

        builder.HasOne(ci => ci.CatalogColor)
            .WithMany(ci => ci.Items)
            .HasForeignKey(ci => ci.CatalogColorId);
    }
}
