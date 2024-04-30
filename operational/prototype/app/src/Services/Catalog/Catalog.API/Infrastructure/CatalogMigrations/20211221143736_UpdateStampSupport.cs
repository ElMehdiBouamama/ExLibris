using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Catalog.API.Infrastructure.CatalogMigrations
{
    public partial class UpdateStampSupport : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Catalog_CatalogBrand_CatalogBrandId",
                table: "Catalog");

            migrationBuilder.DropForeignKey(
                name: "FK_Catalog_CatalogType_CatalogTypeId",
                table: "Catalog");

            migrationBuilder.DropTable(
                name: "CatalogType");

            migrationBuilder.DropIndex(
                name: "IX_Catalog_CatalogTypeId",
                table: "Catalog");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CatalogBrand",
                table: "CatalogBrand");

            migrationBuilder.DropSequence(
                name: "catalog_type_hilo");

            migrationBuilder.DropColumn(
                name: "AvailableStock",
                table: "Catalog");

            migrationBuilder.DropColumn(
                name: "OnReorder",
                table: "Catalog");

            migrationBuilder.RenameTable(
                name: "CatalogBrand",
                newName: "Brand");

            migrationBuilder.RenameColumn(
                name: "RestockThreshold",
                table: "Catalog",
                newName: "ShapeId");

            migrationBuilder.RenameColumn(
                name: "MaxStockThreshold",
                table: "Catalog",
                newName: "NumberOfLines");

            migrationBuilder.RenameColumn(
                name: "CatalogTypeId",
                table: "Catalog",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "CatalogBrandId",
                table: "Catalog",
                newName: "BrandId");

            migrationBuilder.RenameIndex(
                name: "IX_Catalog_CatalogBrandId",
                table: "Catalog",
                newName: "IX_Catalog_BrandId");

            migrationBuilder.RenameColumn(
                name: "Brand",
                table: "Brand",
                newName: "Name");

            migrationBuilder.CreateSequence(
                name: "categoryseq",
                incrementBy: 10);

            migrationBuilder.CreateSequence(
                name: "shapeseq",
                incrementBy: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Catalog",
                type: "decimal(4,2)",
                precision: 4,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<string>(
                name: "PictureUri",
                table: "Catalog",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Brand",
                table: "Brand",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CatalogItemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Category_Catalog_CatalogItemId",
                        column: x => x.CatalogItemId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Colors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dimension",
                columns: table => new
                {
                    CatalogItemId = table.Column<int>(type: "int", nullable: false),
                    Width = table.Column<int>(type: "int", nullable: false),
                    Height = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dimension", x => x.CatalogItemId);
                    table.ForeignKey(
                        name: "FK_Dimension_Catalog_CatalogItemId",
                        column: x => x.CatalogItemId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Shape",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Shape = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CatalogItemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shape", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shape_Catalog_CatalogItemId",
                        column: x => x.CatalogItemId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogColors",
                columns: table => new
                {
                    CatalogItemId = table.Column<int>(type: "int", nullable: false),
                    CatalogColorId = table.Column<int>(type: "int", nullable: false),
                    AvailableStock = table.Column<int>(type: "int", nullable: false),
                    RestockThreshold = table.Column<int>(type: "int", nullable: false),
                    MaxStockThreshold = table.Column<int>(type: "int", nullable: false),
                    OnReorder = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogColors", x => new { x.CatalogItemId, x.CatalogColorId });
                    table.ForeignKey(
                        name: "FK_CatalogColors_Catalog_CatalogItemId",
                        column: x => x.CatalogItemId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CatalogColors_Colors_CatalogColorId",
                        column: x => x.CatalogColorId,
                        principalTable: "Colors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CatalogTags",
                columns: table => new
                {
                    CatalogItemId = table.Column<int>(type: "int", nullable: false),
                    CatalogTagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogTags", x => new { x.CatalogItemId, x.CatalogTagId });
                    table.ForeignKey(
                        name: "FK_CatalogTags_Catalog_CatalogItemId",
                        column: x => x.CatalogItemId,
                        principalTable: "Catalog",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CatalogTags_Tags_CatalogTagId",
                        column: x => x.CatalogTagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CatalogColors_CatalogColorId",
                table: "CatalogColors",
                column: "CatalogColorId");

            migrationBuilder.CreateIndex(
                name: "IX_CatalogTags_CatalogTagId",
                table: "CatalogTags",
                column: "CatalogTagId");

            migrationBuilder.CreateIndex(
                name: "IX_Category_CatalogItemId",
                table: "Category",
                column: "CatalogItemId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Shape_CatalogItemId",
                table: "Shape",
                column: "CatalogItemId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Catalog_Brand_BrandId",
                table: "Catalog",
                column: "BrandId",
                principalTable: "Brand",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Catalog_Brand_BrandId",
                table: "Catalog");

            migrationBuilder.DropTable(
                name: "CatalogColors");

            migrationBuilder.DropTable(
                name: "CatalogTags");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Dimension");

            migrationBuilder.DropTable(
                name: "Shape");

            migrationBuilder.DropTable(
                name: "Colors");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Brand",
                table: "Brand");

            migrationBuilder.DropSequence(
                name: "categoryseq");

            migrationBuilder.DropSequence(
                name: "shapeseq");

            migrationBuilder.DropColumn(
                name: "PictureUri",
                table: "Catalog");

            migrationBuilder.RenameTable(
                name: "Brand",
                newName: "CatalogBrand");

            migrationBuilder.RenameColumn(
                name: "ShapeId",
                table: "Catalog",
                newName: "RestockThreshold");

            migrationBuilder.RenameColumn(
                name: "NumberOfLines",
                table: "Catalog",
                newName: "MaxStockThreshold");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Catalog",
                newName: "CatalogTypeId");

            migrationBuilder.RenameColumn(
                name: "BrandId",
                table: "Catalog",
                newName: "CatalogBrandId");

            migrationBuilder.RenameIndex(
                name: "IX_Catalog_BrandId",
                table: "Catalog",
                newName: "IX_Catalog_CatalogBrandId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "CatalogBrand",
                newName: "Brand");

            migrationBuilder.CreateSequence(
                name: "catalog_type_hilo",
                incrementBy: 10);

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Catalog",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(4,2)",
                oldPrecision: 4);

            migrationBuilder.AddColumn<int>(
                name: "AvailableStock",
                table: "Catalog",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "OnReorder",
                table: "Catalog",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CatalogBrand",
                table: "CatalogBrand",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "CatalogType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Catalog_CatalogTypeId",
                table: "Catalog",
                column: "CatalogTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Catalog_CatalogBrand_CatalogBrandId",
                table: "Catalog",
                column: "CatalogBrandId",
                principalTable: "CatalogBrand",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Catalog_CatalogType_CatalogTypeId",
                table: "Catalog",
                column: "CatalogTypeId",
                principalTable: "CatalogType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
