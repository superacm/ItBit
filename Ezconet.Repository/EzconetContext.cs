using Ezconet.Domain;
using Microsoft.EntityFrameworkCore;

namespace Ezconet.Repository
{
    public class EzconetContext :DbContext
    {
        public EzconetContext(DbContextOptions<EzconetContext> options) : base (options) {}
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Sexo> Sexos { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Sexo>().HasKey(u => new {u.Id});
        }
    }
}