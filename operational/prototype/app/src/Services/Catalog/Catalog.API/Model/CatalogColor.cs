using Microsoft.eShopOnContainers.Services.Catalog.API.SeedWork;
using System.Drawing;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Model
{
    public class CatalogColor
    {
        public int Id { get; set; }

        public string Name{ get; set; }

        public List<CatalogColors> Items { get; set; }

        public CatalogColor() { }

        public Color getColor()
        {
            if (Name != null)
            {
                return ColorTranslator.FromHtml(Name);
            }
            return Color.Empty;
        }
    }
}