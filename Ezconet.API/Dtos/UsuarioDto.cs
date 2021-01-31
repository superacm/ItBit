using System;
using System.ComponentModel.DataAnnotations;

namespace Ezconet.API.Dtos
{
    public class UsuarioDto
    {
         public int Id { get; set; }
         [Required (ErrorMessage="O nome é obrigatorio")]
         [StringLength(200, MinimumLength=3, ErrorMessage="Digite no minimo 3 e no maximo 200 caracteres")]
        public string Nome { get; set; }
        [Required (ErrorMessage="Data de Nascimento é obrigatorio")]
        public DateTime DataNascimnento { get; set; }
        [EmailAddress]
        [Required (ErrorMessage="Email é obrigatorio")]
        public string Email { get; set; }
        public string Senha { get; set; }
        public int SexoId { get; set; }
        public bool Ativo { get; set; }
    }
}