﻿// <auto-generated />
using System;
using Culturapp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Culturapp.Migrations
{
    [DbContext(typeof(CulturappDbContext))]
    partial class CulturappDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Culturapp.Models.Address", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<string>("Complement")
                        .HasColumnType("longtext");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<int?>("EnterpriseId")
                        .HasColumnType("int");

                    b.Property<int?>("EventId")
                        .HasColumnType("int");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("longtext");

                    b.Property<string>("Number")
                        .HasColumnType("longtext");

                    b.Property<string>("State")
                        .HasColumnType("longtext");

                    b.Property<string>("Street")
                        .HasColumnType("longtext");

                    b.Property<string>("ZipCode")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId")
                        .IsUnique();

                    b.HasIndex("EnterpriseId")
                        .IsUnique();

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Culturapp.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int>("EventId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Culturapp.Models.Checking", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CheckString")
                        .HasColumnType("longtext");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateTime")
                        .HasColumnType("datetime(6)");

                    b.Property<int?>("EventId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("Checks");
                });

            modelBuilder.Entity("Culturapp.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CPF")
                        .HasColumnType("longtext");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Culturapp.Models.Enterprise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Cnpj")
                        .HasColumnType("longtext");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Enterprises ");
                });

            modelBuilder.Entity("Culturapp.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("Capacity")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<int?>("EnterpriseId")
                        .HasColumnType("int");

                    b.Property<int?>("EventLocationId")
                        .HasColumnType("int");

                    b.Property<string>("Location")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<int?>("Price")
                        .HasColumnType("int");

                    b.Property<double?>("ScoreValue")
                        .HasColumnType("double");

                    b.Property<string>("Status")
                        .HasColumnType("longtext");

                    b.Property<double?>("TicketPrice")
                        .HasColumnType("double");

                    b.HasKey("Id");

                    b.HasIndex("EnterpriseId");

                    b.HasIndex("EventLocationId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Culturapp.Models.EventLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AddressId")
                        .HasColumnType("int");

                    b.Property<int?>("Capacity")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Telephone")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("EventLocations");
                });

            modelBuilder.Entity("Culturapp.Models.Faq", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Answer")
                        .HasColumnType("longtext");

                    b.Property<string>("Question")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Faqs");
                });

            modelBuilder.Entity("Culturapp.Models.Phone", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Number")
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Phones");
                });

            modelBuilder.Entity("Culturapp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AddressId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<string>("Phone")
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Culturapp.Models.Address", b =>
                {
                    b.HasOne("Culturapp.Models.Customer", "Customer")
                        .WithOne("Address")
                        .HasForeignKey("Culturapp.Models.Address", "CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Culturapp.Models.Enterprise", "Enterprise")
                        .WithOne("Address")
                        .HasForeignKey("Culturapp.Models.Address", "EnterpriseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Culturapp.Models.Event", "Event")
                        .WithOne("Address")
                        .HasForeignKey("Culturapp.Models.Address", "EventId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Customer");

                    b.Navigation("Enterprise");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("Culturapp.Models.Category", b =>
                {
                    b.HasOne("Culturapp.Models.Event", "Event")
                        .WithOne("Category")
                        .HasForeignKey("Culturapp.Models.Category", "EventId")
                        .OnDelete(DeleteBehavior.SetNull)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("Culturapp.Models.Checking", b =>
                {
                    b.HasOne("Culturapp.Models.Customer", "Customer")
                        .WithMany("Checks")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Culturapp.Models.Event", "Event")
                        .WithOne("Checking")
                        .HasForeignKey("Culturapp.Models.Checking", "EventId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Customer");

                    b.Navigation("Event");
                });

            modelBuilder.Entity("Culturapp.Models.Customer", b =>
                {
                    b.HasOne("Culturapp.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Culturapp.Models.Enterprise", b =>
                {
                    b.HasOne("Culturapp.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Culturapp.Models.Event", b =>
                {
                    b.HasOne("Culturapp.Models.Enterprise", "Enterprise")
                        .WithMany()
                        .HasForeignKey("EnterpriseId");

                    b.HasOne("Culturapp.Models.EventLocation", "EventLocation")
                        .WithMany()
                        .HasForeignKey("EventLocationId");

                    b.Navigation("Enterprise");

                    b.Navigation("EventLocation");
                });

            modelBuilder.Entity("Culturapp.Models.EventLocation", b =>
                {
                    b.HasOne("Culturapp.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");

                    b.Navigation("Address");
                });

            modelBuilder.Entity("Culturapp.Models.User", b =>
                {
                    b.HasOne("Culturapp.Models.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");

                    b.Navigation("Address");
                });

            modelBuilder.Entity("Culturapp.Models.Customer", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Checks");
                });

            modelBuilder.Entity("Culturapp.Models.Enterprise", b =>
                {
                    b.Navigation("Address");
                });

            modelBuilder.Entity("Culturapp.Models.Event", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Category");

                    b.Navigation("Checking");
                });
#pragma warning restore 612, 618
        }
    }
}
