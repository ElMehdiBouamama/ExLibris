using Microsoft.eShopOnContainers.Services.Catalog.API.SeedWork;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model;

public class CatalogCategory : ValueObject
{
    public int Id { get; set; }

    public string Name { get; set; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Name;
    }
}
