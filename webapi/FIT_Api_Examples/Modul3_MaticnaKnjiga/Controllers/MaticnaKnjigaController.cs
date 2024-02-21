using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FIT_Api_Examples.Data;
using FIT_Api_Examples.Helper;
using FIT_Api_Examples.Helper.AutentifikacijaAutorizacija;
using FIT_Api_Examples.Modul0_Autentifikacija.Models;
using FIT_Api_Examples.Modul2.Models;
using FIT_Api_Examples.Modul2.ViewModels;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FIT_Api_Examples.Modul2.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class MaticnaKnjigaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MaticnaKnjigaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<List<UpisAkGodinaVM>> GetById(int id)
        {
            if (!HttpContext.GetLoginInfo().isLogiran)
                return BadRequest("nije logiran");

            var response = _dbContext.UpisAkGodina
                .Where(s => s.studentId == id && !s.student.isDeleted)
                .Include(s => new UpisAkGodinaVM
                {
                    id = s.id,
                    studentId = s.studentId,
                    datumUpisa = s.datumUpisa,
                    datumOvjere = s.datumOvjere,
                    godinaStudija = s.godinaStudija,
                    isObnova = s.isObnova,
                    korisnik = s.korisnik.korisnickoIme,
                    ovjeraNapomene = s.ovjeraNapomene,
                    cijenaSkolarine = s.cijenaSkolarine
                }).ToList();

            return Ok(response);
        }

        [HttpPut]
        public ActionResult SaveChanges(UpisAkGodina upis)
        {
            if (!HttpContext.GetLoginInfo().isLogiran)
                return BadRequest("nije logiran");

            UpisAkGodina noviUpis;
            if (upis.id == 0)
            {
                noviUpis = new UpisAkGodina
                {
                    id = upis.id,
                    akGodinaId=upis.akGodinaId,
                    datumUpisa= upis.datumUpisa,
                    godinaStudija=upis.godinaStudija,
                    cijenaSkolarine=upis.cijenaSkolarine,
                    isObnova=upis.isObnova,
                    korisnikId=HttpContext.GetLoginInfo().korisnickiNalog.id,
                    studentId=upis.studentId,
                };
                _dbContext.UpisAkGodina.Add(noviUpis);
            }
            else
            {
                noviUpis = _dbContext.UpisAkGodina.Find(upis.id);

                noviUpis.datumOvjere = upis.datumOvjere;
                noviUpis.ovjeraNapomene = upis.ovjeraNapomene;
            }

            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
