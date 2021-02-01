using System;

namespace Ezconet.Domain
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int SexoId { get; set; }
        public Sexo Sexos { get; }
        public bool Ativo { get; set; }
    }

}