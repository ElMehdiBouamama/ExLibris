namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model
{
    public class CatalogTag
    {
        public int Id { get; set; }

        public string Name{ get; set; }

        public List<CatalogTags> Items { get; set; }

        public CatalogTag() { }
    }
}