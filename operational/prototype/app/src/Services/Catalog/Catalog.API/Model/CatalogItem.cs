using System.ComponentModel.DataAnnotations.Schema;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model;

public class CatalogItem
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public decimal Price { get; set; }

    public string PictureFileName { get; set; }

    public string PictureUri { get; set; }

    public int NumberOfLines { get; set; }

    public int CategoryId { get; set; }

    public CatalogCategory Category { get; set; }

    public int BrandId { get; set; }

    public CatalogBrand Brand { get; set; }

    /// <summary>
    /// Dimension is an owned entity that will be added as a column in the CatalogItem table 
    /// Therefore it doesn't require a DimensionId for persistence.
    /// </summary>
    public CatalogDimension Dimension { get; set; }

    // DDD Patterns comment
    // Using a private collection field, better for DDD Aggregate's encapsulation
    // so OrderItems cannot be added from "outside the AggregateRoot" directly to the collection,
    // but only through the method OrderAggrergateRoot.AddOrderItem() which includes behaviour.
    public List<CatalogColors> Colors { get; set; }

    public List<CatalogTags> Tags { get; set; }

    public CatalogItem() { }

}