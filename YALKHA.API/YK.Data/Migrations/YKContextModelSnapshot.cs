﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using YK.Data.Context;

namespace YK.Data.Migrations
{
    [DbContext(typeof(YKContext))]
    partial class YKContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("YK.Data.Model.Contacts", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("AlternateEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AlternateMobile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Anniversary")
                        .HasColumnType("datetime2");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Created_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DOB")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Deleted_Flag")
                        .HasColumnType("bit");

                    b.Property<string>("Designation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MobileNbr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Modified_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Modified_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("OfficePhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("organizationsId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("organizationsId");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("YK.Data.Model.Emails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Body")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Created_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Deleted_Flag")
                        .HasColumnType("bit");

                    b.Property<string>("EmailTo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HasError")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Modified_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Modified_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Subject")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Emails");
                });

            modelBuilder.Entity("YK.Data.Model.Organizations", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPerson")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPersonAltEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPersonAltPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPersonEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ContactPersonPhone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Created_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created_Date")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Deleted_Flag")
                        .HasColumnType("bit");

                    b.Property<string>("Modified_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Modified_Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrgContactNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrgEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OrganizationName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("YK.Data.Model.Roles", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Created_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created_Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<bool>("Deleted_Flag")
                        .HasColumnType("bit");

                    b.Property<string>("Modified_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Modified_Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("RoleName")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UsersId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleName")
                        .IsUnique()
                        .HasFilter("[RoleName] IS NOT NULL");

                    b.HasIndex("UsersId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Created_Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Deleted_Flag = false,
                            Modified_Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            RoleName = "Admin",
                            RoleType = "Admin"
                        });
                });

            modelBuilder.Entity("YK.Data.Model.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Company")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Created_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Created_Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<bool>("Deleted_Flag")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Modified_By")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Modified_Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleName")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(max)")
                        .HasDefaultValue("User");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("Email", "UserName")
                        .IsUnique()
                        .HasFilter("[Email] IS NOT NULL AND [UserName] IS NOT NULL");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Company = "YALKHA",
                            Created_Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Deleted_Flag = false,
                            Email = "tejpaldev@gmail.com",
                            FirstName = "Tej",
                            LastName = "Pal",
                            Modified_Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Password = "ii0KN5kVKXJ2r1sjgKuyjQ==",
                            RoleName = "Admin",
                            UserName = "tejpaldev"
                        },
                        new
                        {
                            Id = 2,
                            Company = "YALKHA",
                            Created_Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Deleted_Flag = false,
                            Email = "tejpaldev@outlook.com",
                            FirstName = "Tej",
                            LastName = "Pal",
                            Modified_Date = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Password = "ii0KN5kVKXJ2r1sjgKuyjQ==",
                            RoleName = "User",
                            UserName = "tejpaldev1"
                        });
                });

            modelBuilder.Entity("YK.Data.Model.Contacts", b =>
                {
                    b.HasOne("YK.Data.Model.Organizations", "organizations")
                        .WithMany()
                        .HasForeignKey("organizationsId");

                    b.Navigation("organizations");
                });

            modelBuilder.Entity("YK.Data.Model.Roles", b =>
                {
                    b.HasOne("YK.Data.Model.Users", null)
                        .WithMany("role")
                        .HasForeignKey("UsersId");
                });

            modelBuilder.Entity("YK.Data.Model.Users", b =>
                {
                    b.Navigation("role");
                });
#pragma warning restore 612, 618
        }
    }
}