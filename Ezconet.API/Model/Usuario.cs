namespace Ezconet.API.Model
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
        public string DataNascimnento { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int SexoId { get; set; }
        public bool Ativo { get; set; }
    }

}