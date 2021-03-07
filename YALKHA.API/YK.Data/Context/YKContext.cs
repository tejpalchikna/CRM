using YK.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace YK.Data.Context
{
    public class YKContext : DbContext
    {
        public YKContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<Contacts> Contacts { get; set; }
        public DbSet<Organizations> Organizations { get; set; }
        public DbSet<Emails> Emails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Users
            modelBuilder.Entity<Users>().HasData(new Users { Id = 1, Email = "tejpaldev@gmail.com", LastName = "Pal", FirstName = "Tej", Password = "ii0KN5kVKXJ2r1sjgKuyjQ==", RoleName = "Admin", Company = "YALKHA", Deleted_Flag = false, UserName = "tejpaldev" });
            modelBuilder.Entity<Users>().HasData(new Users { Id = 2, Email = "tejpaldev@outlook.com", LastName = "Pal", FirstName = "Tej", Password = "ii0KN5kVKXJ2r1sjgKuyjQ==", RoleName = "User", Company = "YALKHA", Deleted_Flag = false, UserName = "tejpaldev1" });
            modelBuilder.Entity<Users>().Property(x => x.Created_Date).HasDefaultValueSql("getdate()");
            modelBuilder.Entity<Users>().Property(x => x.Modified_Date).HasDefaultValueSql("getdate()");
            modelBuilder.Entity<Users>().Property(user => user.RoleName).HasDefaultValue("User");
            modelBuilder.Entity<Users>().HasIndex(p => new { p.Email, p.UserName }).IsUnique();

            //Roles
            modelBuilder.Entity<Roles>().HasData(new Roles { Id = 1, RoleName = "Admin", RoleType = "Admin" });
            modelBuilder.Entity<Roles>().HasIndex(p => new { p.RoleName }).IsUnique();
            modelBuilder.Entity<Roles>().Property(x => x.Created_Date).HasDefaultValueSql("getdate()");
            modelBuilder.Entity<Roles>().Property(x => x.Modified_Date).HasDefaultValueSql("getdate()");

            //


        }
    }
}