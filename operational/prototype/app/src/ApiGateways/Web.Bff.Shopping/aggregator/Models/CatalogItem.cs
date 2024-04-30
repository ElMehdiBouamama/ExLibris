namespace Microsoft.eShopOnContainers.Web.Shopping.HttpAggregator.Models;

public class CatalogItem
{
    public int Id { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }

    public string PictureUri { get; set; }

    public int NumberOfLines { get; set; }

    public string Brand { get; set; }

    public string Shape { get; set; }
    public int[] Dimensions { get; set; } = Array.Empty<int>();

}


