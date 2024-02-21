using System;

namespace FIT_Api_Examples.Modul3_MaticnaKnjiga.ViewModels
{
    public class UpisAkGodinaVM
    {
        public int id { get; set; }
        public DateTime datumUpisa { get; set; }
        public int godinaStudija { get; set; }
        public float cijenaSkolarine { get; set; }
        public bool isObnova { get; set; }
        public DateTime? datumOvjere { get; set; }
        public string? ovjeraNapomene { get; set; }

        public int studentId { get; set; }
        public string akGodina { get; set; }
        public string korisnik { get; set; }
    }
}
