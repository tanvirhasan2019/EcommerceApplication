using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class ClientOrderModel12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Orderid",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "Orderid",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "Orderid",
                table: "OrderDetails");

            migrationBuilder.AlterColumn<int>(
                name: "ClientOrderOrderid",
                table: "Transaction",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientOrderOrderid",
                table: "ShippingDetails",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientOrderOrderid",
                table: "OrderDetails",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_ClientOrder_ClientOrderOrderid",
                table: "OrderDetails",
                column: "ClientOrderOrderid",
                principalTable: "ClientOrder",
                principalColumn: "Orderid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_ClientOrder_ClientOrderOrderid",
                table: "ShippingDetails",
                column: "ClientOrderOrderid",
                principalTable: "ClientOrder",
                principalColumn: "Orderid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_ClientOrder_ClientOrderOrderid",
                table: "Transaction",
                column: "ClientOrderOrderid",
                principalTable: "ClientOrder",
                principalColumn: "Orderid",
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.AlterColumn<int>(
                name: "ClientOrderOrderid",
                table: "Transaction",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "Orderid",
                table: "Transaction",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ClientOrderOrderid",
                table: "ShippingDetails",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "Orderid",
                table: "ShippingDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ClientOrderOrderid",
                table: "OrderDetails",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "Orderid",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

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
    }
}
