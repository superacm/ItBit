using System.Linq;
using System.Threading.Tasks;
using Ezconet.Domain;
using Microsoft.EntityFrameworkCore;

namespace Ezconet.Repository
{
    public class EzconetRepository : IEzconetRepository
    {
        private readonly EzconetContext _context;

        public EzconetRepository(EzconetContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        public async Task<Usuario[]> GetAllUsuarioAsync()
        {
            IQueryable<Usuario> query = _context.Usuarios;

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }
        public async Task<Usuario[]> GetAllUsuariosAsyncByName(string name)
        {
            IQueryable<Usuario> query = _context.Usuarios;

           query = query.AsNoTracking()
                        .OrderByDescending(c => c.DataNascimnento)
                        .Where(c => c.Nome.ToLower().Contains(name.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Usuario> GetUsuarioAsyncById(int UsuarioId)
        {
            IQueryable<Usuario> query = _context.Usuarios;
            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == UsuarioId);

            return await query.FirstOrDefaultAsync();
        }

    }
}