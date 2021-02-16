using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class shipping_model_add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShippingDetails",
                columns: table => new
                {
                    shippingid = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    orderid = table.Column<int>(nullable: false),
                    firstname = table.Column<string>(nullable: true),
                    lastname = table.Column<string>(nullable: true),
                    address1 = table.Column<string>(nullable: true),
                    phonenumber = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    country = table.Column<string>(nullable: true),
                    zip = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingDetails", x => x.shippingid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShippingDetails");
        }
    }
}
