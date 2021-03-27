using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class ClientOrderModel9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_ClientOrder_ClientOrderorderid",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_ClientOrder_ClientOrderorderid",
                table: "ShippingDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_ClientOrder_ClientOrderorderid",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ClientOrderorderid",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_ShippingDetails_ClientOrderorderid",
                table: "ShippingDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_ClientOrderorderid",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "ClientOrderorderid",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "ClientOrderorderid",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "ClientOrderorderid",
                table: "OrderDetails");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ClientOrderorderid",
                table: "Transaction",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientOrderorderid",
                table: "ShippingDetails",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientOrderorderid",
                table: "OrderDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ClientOrderorderid",
                table: "Transaction",
                column: "ClientOrderorderid");

            migrationBuilder.CreateIndex(
                name: "IX_ShippingDetails_ClientOrderorderid",
                table: "ShippingDetails",
                column: "ClientOrderorderid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ClientOrderorderid",
                table: "OrderDetails",
                column: "ClientOrderorderid");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_ClientOrder_ClientOrderorderid",
                table: "Transaction",
                column: "ClientOrderorderid",
                principalTable: "ClientOrder",
                principalColumn: "orderid",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
