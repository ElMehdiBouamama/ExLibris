namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model
{

    public class CatalogTags
    {
        public int CatalogItemId { get; set; }

        public CatalogItem CatalogItem { get; set; }

        public int CatalogTagId { get; set; }

        public CatalogTag CatalogTag { get; set; }
    }

}
