using Microsoft.eShopOnContainers.Services.Catalog.API.SeedWork;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model
{
    public class CatalogDimension : ValueObject
    {
        public int Width { get; set; }
        public int Height { get; set; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Width;
            yield return Height;
        }
    }
}