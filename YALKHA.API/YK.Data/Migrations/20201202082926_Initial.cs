using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace YK.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Emails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmailTo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    HasError = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modified_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Deleted_Flag = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPerson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonAltEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactPersonAltPhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrgContactNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrgEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modified_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Deleted_Flag = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    RoleType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UsersId = table.Column<int>(type: "int", nullable: true),
                    Created_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_Date = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Modified_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modified_Date = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "getdate()"),
                    Deleted_Flag = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Designation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlternateEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OfficePhone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNbr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AlternateMobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Anniversary = table.Column<DateTime>(type: "datetime2", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    organizationsId = table.Column<int>(type: "int", nullable: true),
                    Created_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modified_By = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modified_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Deleted_Flag = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contacts_Organizations_organizationsId",
                        column: x => x.organizationsId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Created_By", "Deleted_Flag", "Modified_By", "RoleName", "RoleType", "UsersId" },
                values: new object[] { 1, null, false, null, "Admin", "Admin", null });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_organizationsId",
                table: "Contacts",
                column: "organizationsId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_RoleName",
                table: "Roles",
                column: "RoleName",
                unique: true,
                filter: "[RoleName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_UsersId",
                table: "Roles",
                column: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Emails");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Organizations");
        }
    }
}
