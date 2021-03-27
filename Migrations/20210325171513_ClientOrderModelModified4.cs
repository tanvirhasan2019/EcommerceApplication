using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class ClientOrderModelModified4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_ClientOrder_ClientOrderorderid",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_ClientOrder_ClientOrderorderid",
                table: "ShippingDetails");

            migrationBuilder.RenameColumn(
                name: "ClientOrderorderid",
                table: "ShippingDetails",
                newName: "clientorderorderid");

            migrationBuilder.RenameIndex(
                name: "IX_ShippingDetails_ClientOrderorderid",
                table: "ShippingDetails",
                newName: "IX_ShippingDetails_clientorderorderid");

            migrationBuilder.RenameColumn(
                name: "ClientOrderorderid",
                table: "OrderDetails",
                newName: "clientorderorderid");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetails_ClientOrderorderid",
                table: "OrderDetails",
                newName: "IX_OrderDetails_clientorderorderid");

            migrationBuilder.AddColumn<int>(
                name: "OrderDetailsid",
                table: "Products",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_OrderDetailsid",
                table: "Products",
                column: "OrderDetailsid");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_ClientOrder_clientorderorderid",
                table: "OrderDetails",
                column: "clientorderorderid",
                principalTable: "ClientOrder",
                principalColumn: "orderid",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_OrderDetails_OrderDetailsid",
                table: "Products",
                column: "OrderDetailsid",
                principalTable: "OrderDetails",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_ClientOrder_clientorderorderid",
                table: "ShippingDetails",
                column: "clientorderorderid",
                principalTable: "ClientOrder",
                principalColumn: "orderid",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_ClientOrder_clientorderorderid",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_OrderDetails_OrderDetailsid",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_ClientOrder_clientorderorderid",
                table: "ShippingDetails");

            migrationBuilder.DropIndex(
                name: "IX_Products_OrderDetailsid",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "OrderDetailsid",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "clientorderorderid",
                table: "ShippingDetails",
                newName: "ClientOrderorderid");

            migrationBuilder.RenameIndex(
                name: "IX_ShippingDetails_clientorderorderid",
                table: "ShippingDetails",
                newName: "IX_ShippingDetails_ClientOrderorderid");

            migrationBuilder.RenameColumn(
                name: "clientorderorderid",
                table: "OrderDetails",
                newName: "ClientOrderorderid");

            migrationBuilder.RenameIndex(
                name: "IX_OrderDetails_clientorderorderid",
                table: "OrderDetails",
                newName: "IX_OrderDetails_ClientOrderorderid");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_ClientOrder_ClientOrderorderid",
                table: "OrderDetails",
                column: "ClientOrderorderid",
                principalTable: "ClientOrder",
                principalColumn: "orderid",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_ClientOrder_ClientOrderorderid",
                table: "ShippingDetails",
                column: "ClientOrderorderid",
                principalTable: "ClientOrder",
                principalColumn: "orderid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
