using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace YK.Data.Migrations
{
    public partial class Inital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: "User"),
                    Created_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_Date = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Modified_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modified_Date = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Deleted_Flag = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Company", "Created_By", "Deleted_Flag", "Email", "FirstName", "LastName", "Modified_By", "Password", "RoleName", "UserName" },
                values: new object[] { 1, "YALKHA", null, false, "tejpaldev@gmail.com", "Tej", "Pal", null, "ii0KN5kVKXJ2r1sjgKuyjQ==", "Admin", "tejpaldev" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Company", "Created_By", "Deleted_Flag", "Email", "FirstName", "LastName", "Modified_By", "Password", "RoleName", "UserName" },
                values: new object[] { 2, "YALKHA", null, false, "tejpaldev@outlook.com", "Tej", "Pal", null, "ii0KN5kVKXJ2r1sjgKuyjQ==", "User", "tejpaldev1" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email_UserName",
                table: "Users",
                columns: new[] { "Email", "UserName" },
                unique: true,
                filter: "[Email] IS NOT NULL AND [UserName] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
