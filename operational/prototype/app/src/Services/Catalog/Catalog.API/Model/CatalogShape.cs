using Microsoft.eShopOnContainers.Services.Catalog.API.SeedWork;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model;

public class CatalogShape : ValueObject
{
    public int Id { get; set; }
    public string Shape { get; set; }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return Shape;
    }
}
