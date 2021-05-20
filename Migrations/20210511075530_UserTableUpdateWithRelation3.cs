using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class UserTableUpdateWithRelation3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Transaction",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "ShippingDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "OrderDetails",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "ClientOrder",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_ApplicationUserId",
                table: "Transaction",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ShippingDetails_ApplicationUserId",
                table: "ShippingDetails",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_ApplicationUserId",
                table: "OrderDetails",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientOrder_ApplicationUserId",
                table: "ClientOrder",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientOrder_AspNetUsers_ApplicationUserId",
                table: "ClientOrder",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_AspNetUsers_ApplicationUserId",
                table: "OrderDetails",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingDetails_AspNetUsers_ApplicationUserId",
                table: "ShippingDetails",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transaction_AspNetUsers_ApplicationUserId",
                table: "Transaction",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientOrder_AspNetUsers_ApplicationUserId",
                table: "ClientOrder");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_AspNetUsers_ApplicationUserId",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingDetails_AspNetUsers_ApplicationUserId",
                table: "ShippingDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Transaction_AspNetUsers_ApplicationUserId",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_Transaction_ApplicationUserId",
                table: "Transaction");

            migrationBuilder.DropIndex(
                name: "IX_ShippingDetails_ApplicationUserId",
                table: "ShippingDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_ApplicationUserId",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_ClientOrder_ApplicationUserId",
                table: "ClientOrder");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Transaction");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "ShippingDetails");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "ClientOrder");
        }
    }
}
