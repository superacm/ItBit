using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Ezconet.API.Dtos;
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
         private readonly IMapper _mapper;
        public UsuarioController(IEzconetRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var usuarios = await _repo.GetAllUsuarioAsync();

                var results = _mapper.Map<UsuarioDto[]>(usuarios); 
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Falha ao acessar o banco de dados {ex.Message}");
            }
            
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var usuario = await _repo.GetUsuarioAsyncById(id);

                var result = _mapper.Map<UsuarioDto>(usuario); 

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
                var usuario = await _repo.GetAllUsuariosAsyncByName(nome);

                var result = _mapper.Map<UsuarioDto>(usuario);

                return Ok(result);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha ao acessar o banco de dados");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post(UsuarioDto model)
        {
            try
            {
                var usuario = _mapper.Map<Usuario>(model);

                 _repo.Add(usuario);

                if(await _repo.SaveChangesAsync())
                {
                    return Created($"/api/usuario/{model.Id}", _mapper.Map<UsuarioDto>(usuario));
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
                    return Created($"/api/usuario/{model.Id}", _mapper.Map<UsuarioDto>(usuario));
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
