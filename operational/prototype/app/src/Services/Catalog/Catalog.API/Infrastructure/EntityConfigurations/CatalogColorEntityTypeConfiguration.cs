namespace Microsoft.eShopOnContainers.Services.Catalog.API.Infrastructure.EntityConfigurations;

class CatalogTagEntityTypeConfiguration
    : IEntityTypeConfiguration<CatalogTags>
{
    public void Configure(EntityTypeBuilder<CatalogTags> builder)
    {
        builder.ToTable("CatalogTags");
        
        builder.HasKey(ci => new { ci.CatalogItemId, ci.CatalogTagId });
        
        builder.HasOne(ci => ci.CatalogItem)
            .WithMany(ci => ci.Tags)
            .HasForeignKey(ci => ci.CatalogItemId);

        builder.HasOne(ci => ci.CatalogTag)
            .WithMany(ci => ci.Items)
            .HasForeignKey(ci => ci.CatalogTagId);
    }
}
