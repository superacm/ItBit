using System.Threading.Tasks;
using Ezconet.Domain;

namespace Ezconet.Repository
{
    public interface IEzconetRepository
    {
         //GERAL
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;
        Task<bool> SaveChangesAsync();

        //Usuarios
        Task<Usuario[]> GetAllUsuariosAsyncByName(string name);
        Task<Usuario[]> GetAllUsuarioAsync();
        Task<Usuario> GetUsuarioAsyncById(int UsuarioId);
    }
}