using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class ProdutImageandProductRelationonetooe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductImage_productid",
                table: "ProductImage");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_productid",
                table: "ProductImage",
                column: "productid",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ProductImage_productid",
                table: "ProductImage");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_productid",
                table: "ProductImage",
                column: "productid");
        }
    }
}
