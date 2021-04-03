using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class ClientOrderUpdateRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transaction_ClientOrderOrderid",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_ShippingDetails_ClientOrderOrderid",
                table: "ShippingDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_ClientOrderOrderid",
                table: "OrderDetails");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ClientOrderOrderid",
                table: "Transaction",
                column: "ClientOrderOrderid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShippingDetails_ClientOrderOrderid",
                table: "ShippingDetails",
                column: "ClientOrderOrderid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ClientOrderOrderid",
                table: "OrderDetails",
                column: "ClientOrderOrderid",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transaction_ClientOrderOrderid",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_ShippingDetails_ClientOrderOrderid",
                table: "ShippingDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_ClientOrderOrderid",
                table: "OrderDetails");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ClientOrderOrderid",
                table: "Transaction",
                column: "ClientOrderOrderid");

            migrationBuilder.CreateIndex(
                name: "IX_ShippingDetails_ClientOrderOrderid",
                table: "ShippingDetails",
                column: "ClientOrderOrderid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ClientOrderOrderid",
                table: "OrderDetails",
                column: "ClientOrderOrderid");
        }
    }
}
