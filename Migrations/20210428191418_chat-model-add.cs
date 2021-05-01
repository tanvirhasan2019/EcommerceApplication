using Microsoft.EntityFrameworkCore.Migrations;

namespace EcommerceApp.Migrations
{
    public partial class chatmodeladd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_FromId",
                table: "Messages");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_AspNetUsers_ToId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_FromId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ToId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "FromId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ToId",
                table: "Messages");

            migrationBuilder.AddColumn<int>(
                name: "ChatTableId",
                table: "Messages",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ChatTables",
                columns: table => new
                {
                    ChatTableId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdminId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatTables", x => x.ChatTableId);
                    table.ForeignKey(
                        name: "FK_ChatTables_AspNetUsers_AdminId",
                        column: x => x.AdminId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatTables_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChatTableId",
                table: "Messages",
                column: "ChatTableId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatTables_AdminId",
                table: "ChatTables",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatTables_UserId",
                table: "ChatTables",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatTables_ChatTableId",
                table: "Messages",
                column: "ChatTableId",
                principalTable: "ChatTables",
                principalColumn: "ChatTableId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatTables_ChatTableId",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "ChatTables");

            migrationBuilder.DropIndex(
                name: "IX_Messages_ChatTableId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ChatTableId",
                table: "Messages");

            migrationBuilder.AddColumn<string>(
                name: "FromId",
                table: "Messages",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ToId",
                table: "Messages",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_FromId",
                table: "Messages",
                column: "FromId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ToId",
                table: "Messages",
                column: "ToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_FromId",
                table: "Messages",
                column: "FromId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_AspNetUsers_ToId",
                table: "Messages",
                column: "ToId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
