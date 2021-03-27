using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class ClientOrderModel10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "oid",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "oid",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "oid",
                table: "OrderDetails");

            migrationBuilder.RenameColumn(
                name: "productid",
                table: "OrderDetails",
                newName: "Productid");

            migrationBuilder.RenameColumn(
                name: "orderid",
                table: "ClientOrder",
                newName: "Orderid");

            migrationBuilder.AddColumn<int>(
                name: "ClientOrderOrderid",
                table: "Transaction",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Orderid",
                table: "Transaction",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClientOrderOrderid",
                table: "ShippingDetails",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Orderid",
                table: "ShippingDetails",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClientOrderOrderid",
                table: "OrderDetails",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Orderid",
                table: "OrderDetails",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_ClientOrder_ClientOrderOrderid",
                table: "OrderDetails",
                column: "ClientOrderOrderid",
                principalTable: "ClientOrder",
                principalColumn: "Orderid",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_ClientOrder_ClientOrderOrderid",
                table: "ShippingDetails",
                column: "ClientOrderOrderid",
                principalTable: "ClientOrder",
                principalColumn: "Orderid",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_ClientOrder_ClientOrderOrderid",
                table: "Transaction",
                column: "ClientOrderOrderid",
                principalTable: "ClientOrder",
                principalColumn: "Orderid",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_ClientOrder_ClientOrderOrderid",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_ClientOrder_ClientOrderOrderid",
                table: "ShippingDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_ClientOrder_ClientOrderOrderid",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ClientOrderOrderid",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_ShippingDetails_ClientOrderOrderid",
                table: "ShippingDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_ClientOrderOrderid",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "ClientOrderOrderid",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "Orderid",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "ClientOrderOrderid",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "Orderid",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "ClientOrderOrderid",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "Orderid",
                table: "OrderDetails");

            migrationBuilder.RenameColumn(
                name: "Productid",
                table: "OrderDetails",
                newName: "productid");

            migrationBuilder.RenameColumn(
                name: "Orderid",
                table: "ClientOrder",
                newName: "orderid");

            migrationBuilder.AddColumn<int>(
                name: "oid",
                table: "Transaction",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "oid",
                table: "ShippingDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "oid",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
