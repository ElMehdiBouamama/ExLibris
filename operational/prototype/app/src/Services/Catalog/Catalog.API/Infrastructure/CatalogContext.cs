using Microsoft.eShopOnContainers.Services.Catalog.API.Model;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Infrastructure;

public class CatalogContext : DbContext
{
    public CatalogContext(DbContextOptions<CatalogContext> options) : base(options)
    {
    }
    public DbSet<CatalogItem> CatalogItems { get; set; }
    public DbSet<CatalogBrand> Brands { get; set; }
    public DbSet<CatalogColors> CatalogColors { get; set; }
    public DbSet<CatalogColor> Colors { get; set; }
    public DbSet<CatalogTags> CatalogTags { get; set; }
    public DbSet<CatalogTag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new CatalogItemEntityTypeConfiguration());
        builder.ApplyConfiguration(new CatalogBrandEntityTypeConfiguration());
        builder.ApplyConfiguration(new CatalogTagEntityTypeConfiguration());
        builder.ApplyConfiguration(new CatalogColorsEntityTypeConfiguration());
    }
}


public class CatalogContextDesignFactory : IDesignTimeDbContextFactory<CatalogContext>
{
    public CatalogContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<CatalogContext>()
            .UseSqlServer("server=localhost,5433;Database=Microsoft.eShopOnContainers.Services.CatalogDb;User Id=sa;Password=Pass@word");

        return new CatalogContext(optionsBuilder.Options);
    }
}
