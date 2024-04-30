using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.eShopOnContainers.Services.Catalog.API.Model;
using Polly;

namespace Microsoft.eShopOnContainers.Services.Catalog.API.Infrastructure;

public class CatalogContextSeed
{
    public async Task SeedAsync(CatalogContext context, IWebHostEnvironment env, IOptions<CatalogSettings> settings, ILogger<CatalogContextSeed> logger)
    {
        var policy = CreatePolicy(logger, nameof(CatalogContextSeed));

        await policy.ExecuteAsync(async () =>
        {
            var useCustomizationData = settings.Value.UseCustomizationData;
            var contentRootPath = env.ContentRootPath;
            var picturePath = env.WebRootPath;

            if (!context.Brands.Any())
            {
                await context.Brands.AddRangeAsync(useCustomizationData
                    ? GetCatalogBrandsFromFile(contentRootPath, logger)
                    : GetPreconfiguredCatalogBrands());

                await context.SaveChangesAsync();
            }

            if (!context.Tags.Any())
            {
                await context.Tags.AddRangeAsync(useCustomizationData
                    ? GetCatalogTagsFromFile(contentRootPath, logger)
                    : GetPreconfiguredCatalogTags());

                await context.SaveChangesAsync();
            }

            //if (!context.CatalogItems.Any())
            //{
            //    await context.CatalogItems.AddRangeAsync(useCustomizationData
            //        ? GetCatalogItemsFromFile(contentRootPath, context, logger)
            //        : GetPreconfiguredItems());

            //    await context.SaveChangesAsync();

            //    GetCatalogItemPictures(contentRootPath, picturePath);
            //}
        });
    }

    private IEnumerable<CatalogBrand> GetCatalogBrandsFromFile(string contentRootPath, ILogger<CatalogContextSeed> logger)
    {
        string csvFileCatalogBrands = Path.Combine(contentRootPath, "Setup", "CatalogBrands.csv");

        if (!File.Exists(csvFileCatalogBrands))
        {
            return GetPreconfiguredCatalogBrands();
        }

        string[] csvheaders;
        try
        {
            string[] requiredHeaders = { "catalogbrand" };
            csvheaders = GetHeaders(csvFileCatalogBrands, requiredHeaders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message);
            return GetPreconfiguredCatalogBrands();
        }

        return File.ReadAllLines(csvFileCatalogBrands)
                                    .Skip(1) // skip header row
                                    .SelectTry(x => CreateCatalogBrand(x))
                                    .OnCaughtException(ex => { logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message); return null; })
                                    .Where(x => x != null);
    }

    private IEnumerable<CatalogTag> GetCatalogTagsFromFile(string contentRootPath, ILogger<CatalogContextSeed> logger)
    {
        string csvFileCatalogTags = Path.Combine(contentRootPath, "Setup", "CatalogTags.csv");

        if (!File.Exists(csvFileCatalogTags))
        {
            return GetPreconfiguredCatalogTags();
        }

        string[] csvheaders;
        try
        {
            string[] requiredHeaders = { "catalogtags" };
            csvheaders = GetHeaders(csvFileCatalogTags, requiredHeaders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message);
            return GetPreconfiguredCatalogTags();
        }

        return File.ReadAllLines(csvFileCatalogTags)
                                    .Skip(1) // skip header row
                                    .SelectTry(x => CreateCatalogTag(x))
                                    .OnCaughtException(ex => { logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message); return null; })
                                    .Where(x => x != null);
    }

    private IEnumerable<CatalogDimension> GetCatalogDimensionsFromFile(string contentRootPath, ILogger<CatalogContextSeed> logger)
    {
        string csvFileCatalogDimensions = Path.Combine(contentRootPath, "Setup", "CatalogDimensions.csv");

        if (!File.Exists(csvFileCatalogDimensions))
        {
            return GetPreconfiguredCatalogDimensions();
        }

        string[] csvheaders;
        try
        {
            string[] requiredHeaders = { "width", "height" };
            csvheaders = GetHeaders(csvFileCatalogDimensions, requiredHeaders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message);
            return GetPreconfiguredCatalogDimensions();
        }

        return File.ReadAllLines(csvFileCatalogDimensions)
                                    .Skip(1) // skip header row
                                    .Select(row => Regex.Split(row, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"))
                                    .SelectTry(column => CreateCatalogDimension(column, csvheaders))
                                    .OnCaughtException(ex => { logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message); return null; })
                                    .Where(x => x != null);
    }

    private CatalogBrand CreateCatalogBrand(string brand)
    {
        brand = brand.Trim('"').Trim();

        if (String.IsNullOrEmpty(brand))
        {
            throw new Exception("catalog Brand Name is empty");
        }

        return new CatalogBrand
        {
            Name = brand,
        };
    }

    private CatalogTag CreateCatalogTag(string tag)
    {
        tag = tag.Trim('"').Trim();

        if (String.IsNullOrEmpty(tag))
        {
            throw new Exception("catalog Tag Name is empty");
        }

        return new CatalogTag
        {
            Name = tag,
        };
    }

    private CatalogDimension CreateCatalogDimension(string[] column, string[] headers)
    {
        if (column.Count() != headers.Count())
        {
            throw new Exception($"column count '{column.Count()}' not the same as headers count'{headers.Count()}'");
        }

        string width = column[Array.IndexOf(headers, "width")].Trim('"').Trim();
        if (!Int32.TryParse(width, NumberStyles.Integer, CultureInfo.InvariantCulture, out Int32 _))
        {
            throw new Exception($"number of lines={width}is not a valid integer number");
        }

        string height = column[Array.IndexOf(headers, "height")].Trim('"').Trim();
        if (!Int32.TryParse(height, NumberStyles.Integer, CultureInfo.InvariantCulture, out Int32 _))
        {
            throw new Exception($"number of lines={height}is not a valid integer number");
        }

        var catalogDimension = new CatalogDimension()
        {
            Width = Int32.Parse(width),
            Height = Int32.Parse(height)
        };

        return catalogDimension;
    }

    private IEnumerable<CatalogBrand> GetPreconfiguredCatalogBrands()
    {
        return new List<CatalogBrand>()
        {
            new CatalogBrand() { Name = "Other" }
        };
    }

    private IEnumerable<CatalogTag> GetPreconfiguredCatalogTags()
    {
        return new List<CatalogTag>()
        {
            new CatalogTag() { Name = "Other" }
        };
    }

    private IEnumerable<CatalogDimension> GetPreconfiguredCatalogDimensions()
    {
        return new List<CatalogDimension>()
        {
            new CatalogDimension() { Width = 0, Height = 0 }
        };
    }

    private IEnumerable<CatalogCategory> GetCatalogTypesFromFile(string contentRootPath, ILogger<CatalogContextSeed> logger)
    {
        string csvFileCatalogTypes = Path.Combine(contentRootPath, "Setup", "CatalogTypes.csv");

        if (!File.Exists(csvFileCatalogTypes))
        {
            return GetPreconfiguredCatalogTypes();
        }

        string[] csvheaders;
        try
        {
            string[] requiredHeaders = { "catalogtype" };
            csvheaders = GetHeaders(csvFileCatalogTypes, requiredHeaders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message);
            return GetPreconfiguredCatalogTypes();
        }

        return File.ReadAllLines(csvFileCatalogTypes)
                                    .Skip(1) // skip header row
                                    .SelectTry(x => CreateCatalogType(x))
                                    .OnCaughtException(ex => { logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message); return null; })
                                    .Where(x => x != null);
    }

    private CatalogCategory CreateCatalogType(string type)
    {
        type = type.Trim('"').Trim();

        if (String.IsNullOrEmpty(type))
        {
            throw new Exception("catalog Type Name is empty");
        }

        return new CatalogCategory
        {
            Name = type,
        };
    }

    private IEnumerable<CatalogCategory> GetPreconfiguredCatalogTypes()
    {
        return new List<CatalogCategory>()
        {
            new CatalogCategory() { Name = "Custom Stamp" }
        };
    }

    private IEnumerable<CatalogItem> GetCatalogItemsFromFile(string contentRootPath, CatalogContext context, ILogger<CatalogContextSeed> logger)
    {
        string csvFileCatalogItems = Path.Combine(contentRootPath, "Setup", "CatalogItems.csv");

        if (!File.Exists(csvFileCatalogItems))
        {
            return GetPreconfiguredItems();
        }

        string[] csvheaders;
        try
        {
            string[] requiredHeaders = { "catalogtypename", "catalogbrandname", "description", "name", "price", "picturefilename", "catalogshapename", "catalogcolorname" };
            string[] optionalheaders = { "availablestock", "restockthreshold", "maxstockthreshold", "onreorder" };
            csvheaders = GetHeaders(csvFileCatalogItems, requiredHeaders, optionalheaders);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message);
            return GetPreconfiguredItems();
        }

        var catalogBrandIdLookup = context.Brands.ToDictionary(ct => ct.Name, ct => ct.Id);

        return File.ReadAllLines(csvFileCatalogItems)
                    .Skip(1) // skip header row
                    .Select(row => Regex.Split(row, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"))
                    .SelectTry(column => CreateCatalogItem(column, csvheaders, catalogBrandIdLookup))
                    .OnCaughtException(ex => { logger.LogError(ex, "EXCEPTION ERROR: {Message}", ex.Message); return null; })
                    .Where(x => x != null);
    }

    private CatalogItem CreateCatalogItem(string[] column, string[] headers,
        Dictionary<String, int> catalogBrandIdLookup)
    {
        if (column.Count() != headers.Count())
        {
            throw new Exception($"column count '{column.Count()}' not the same as headers count'{headers.Count()}'");
        }

        string catalogBrandName = column[Array.IndexOf(headers, "catalogbrandname")].Trim('"').Trim();
        if (!catalogBrandIdLookup.ContainsKey(catalogBrandName))
        {
            throw new Exception($"type={catalogBrandName} does not exist in catalogTypes");
        }

        string priceString = column[Array.IndexOf(headers, "price")].Trim('"').Trim();
        if (!Decimal.TryParse(priceString, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out Decimal price))
        {
            throw new Exception($"price={priceString}is not a valid decimal number");
        }

        string numberOfLineString = column[Array.IndexOf(headers, "numberoflines")].Trim('"').Trim();
        if (!Int32.TryParse(numberOfLineString, NumberStyles.Integer, CultureInfo.InvariantCulture, out Int32 numberoflines))
        {
            throw new Exception($"number of lines={numberOfLineString}is not a valid integer number");
        }

        var catalogItem = new CatalogItem()
        {
            BrandId = catalogBrandIdLookup[catalogBrandName],
            Description = column[Array.IndexOf(headers, "description")].Trim('"').Trim(),
            Name = column[Array.IndexOf(headers, "name")].Trim('"').Trim(),
            Price = price,
            NumberOfLines = numberoflines,
            PictureFileName = column[Array.IndexOf(headers, "picturefilename")].Trim('"').Trim(),
        };

        int availableStockIndex = Array.IndexOf(headers, "availablestock");
        if (availableStockIndex != -1)
        {
            string availableStockString = column[availableStockIndex].Trim('"').Trim();
            if (!String.IsNullOrEmpty(availableStockString))
            {
                if (int.TryParse(availableStockString, out int availableStock))
                {
                    catalogItem.Colors.FirstOrDefault().AvailableStock = availableStock;
                }
                else
                {
                    throw new Exception($"availableStock={availableStockString} is not a valid integer");
                }
            }
        }

        int restockThresholdIndex = Array.IndexOf(headers, "restockthreshold");
        if (restockThresholdIndex != -1)
        {
            string restockThresholdString = column[restockThresholdIndex].Trim('"').Trim();
            if (!String.IsNullOrEmpty(restockThresholdString))
            {
                if (int.TryParse(restockThresholdString, out int restockThreshold))
                {
                    catalogItem.Colors.FirstOrDefault().RestockThreshold = restockThreshold;
                }
                else
                {
                    throw new Exception($"restockThreshold={restockThreshold} is not a valid integer");
                }
            }
        }

        int maxStockThresholdIndex = Array.IndexOf(headers, "maxstockthreshold");
        if (maxStockThresholdIndex != -1)
        {
            string maxStockThresholdString = column[maxStockThresholdIndex].Trim('"').Trim();
            if (!String.IsNullOrEmpty(maxStockThresholdString))
            {
                if (int.TryParse(maxStockThresholdString, out int maxStockThreshold))
                {
                    catalogItem.Colors.FirstOrDefault().MaxStockThreshold = maxStockThreshold;
                }
                else
                {
                    throw new Exception($"maxStockThreshold={maxStockThreshold} is not a valid integer");
                }
            }
        }

        int onReorderIndex = Array.IndexOf(headers, "onreorder");
        if (onReorderIndex != -1)
        {
            string onReorderString = column[onReorderIndex].Trim('"').Trim();
            if (!String.IsNullOrEmpty(onReorderString))
            {
                if (bool.TryParse(onReorderString, out bool onReorder))
                {
                    catalogItem.Colors.FirstOrDefault().OnReorder = onReorder;
                }
                else
                {
                    throw new Exception($"onReorder={onReorderString} is not a valid boolean");
                }
            }
        }

        return catalogItem;
    }

    private IEnumerable<CatalogItem> GetPreconfiguredItems()
    {
        return new List<CatalogItem>()
        {
            new CatalogItem { CategoryId = 2, BrandId = 2, Description = ".NET Bot Black Hoodie", Name = ".NET Bot Black Hoodie", Price = 19.5M, PictureFileName = "1.png" }
        };
    }

    private string[] GetHeaders(string csvfile, string[] requiredHeaders, string[] optionalHeaders = null)
    {
        string[] csvheaders = File.ReadLines(csvfile).First().ToLowerInvariant().Split(',');

        if (csvheaders.Count() < requiredHeaders.Count())
        {
            throw new Exception($"requiredHeader count '{requiredHeaders.Count()}' is bigger then csv header count '{csvheaders.Count()}' ");
        }

        if (optionalHeaders != null)
        {
            if (csvheaders.Count() > (requiredHeaders.Count() + optionalHeaders.Count()))
            {
                throw new Exception($"csv header count '{csvheaders.Count()}'  is larger then required '{requiredHeaders.Count()}' and optional '{optionalHeaders.Count()}' headers count");
            }
        }

        foreach (var requiredHeader in requiredHeaders)
        {
            if (!csvheaders.Contains(requiredHeader))
            {
                throw new Exception($"does not contain required header '{requiredHeader}'");
            }
        }

        return csvheaders;
    }

    private void GetCatalogItemPictures(string contentRootPath, string picturePath)
    {
        if (picturePath != null)
        {
            DirectoryInfo directory = new DirectoryInfo(picturePath);
            foreach (FileInfo file in directory.GetFiles())
            {
                file.Delete();
            }

            string zipFileCatalogItemPictures = Path.Combine(contentRootPath, "Setup", "CatalogItems.zip");
            ZipFile.ExtractToDirectory(zipFileCatalogItemPictures, picturePath);
        }
    }

    private AsyncRetryPolicy CreatePolicy(ILogger<CatalogContextSeed> logger, string prefix, int retries = 3)
    {
        return Policy.Handle<SqlException>().
            WaitAndRetryAsync(
                retryCount: retries,
                sleepDurationProvider: retry => TimeSpan.FromSeconds(5),
                onRetry: (exception, timeSpan, retry, ctx) =>
                {
                    logger.LogWarning(exception, "[{prefix}] Exception {ExceptionType} with message {Message} detected on attempt {retry} of {retries}", prefix, exception.GetType().Name, exception.Message, retry, retries);
                }
            );
    }
}
