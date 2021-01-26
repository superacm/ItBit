using Ezconet.API.Model;
using Microsoft.EntityFrameworkCore;

namespace Ezconet.API.Data
{
    public class DataContext :DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Sexo> Sexos { get; set; }
        
    }
}