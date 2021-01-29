using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ezconet.Domain;
using Ezconet.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ezconet.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        public readonly IEzconetRepository _repo;
        public UsuarioController(IEzconetRepository repo)
        {
            _repo = repo;

        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repo.GetAllUsuarioAsync();
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var result = await _repo.GetUsuarioAsyncById(id);
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
            
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
           try
            {
                var result = await _repo.GetAllUsuariosAsyncByName(nome);
                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post(Usuario model)
        {
            try
            {
                 _repo.Add(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/usuario/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
           return BadRequest();
        }

        // PUT api/values/5
        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int UsuarioId, Usuario model)
        {
            try
            {
                var usuario = _repo.GetUsuarioAsyncById(UsuarioId);
                if(usuario == null) return NotFound();

                 _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/usuario/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
           return BadRequest();
        }

        // DELETE api/values/5
        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int UsuarioId)
        {
            try
            {
                var usuario = _repo.GetUsuarioAsyncById(UsuarioId);
                if(usuario == null) return NotFound();

                 _repo.Delete(usuario);

                if(await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
           return BadRequest();
        }
    }
}
