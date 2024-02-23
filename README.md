# Razvoj softvera - ispit

## Upute

- Otvoriti SqlServer Managment Studio, konektovati se na sql server i napraviti novu bazu podataka u čijem nazivu je broj indeksa.
    - sql server adresa: 10.10.10.18
    - sql server integrated security: false
    - username: sa
    - password: test
- Otvoriti WebAPI
    1. Prepraviti connection string (upisati broj indeksa za dbname)
    2. Izvršiti migracije (update-database) te pokrenuti projekat
    3. Generisati testne podatke preko akcije TestniPodaci/Generisi

## Zadatak 1

Omogućiti sljedeće opcije samo za logiranog korisnika. Provjeru logiranog korisnika uraditi na front endu (angular) i backendu (web api).

Za angular validaciju logina koristite token i *CanActive*-implementacije iz foldera **_guards**.

### 1A

Implementirati formu za prikaz studenata sa dva filtera

1. po „imenu i prezimenu“ + „prezime i imenu“. Znači, korisnik može upisati
    - „Ahmed H“
    - „Heric A“
2. po opštini rođenja

Filteri se aktiviraju sa pripadajućom kontrolom checkbox.

Ukoliko checkbox nije označen onda pripadajući textbox i select-combobox mora imati status **„disabled“**.

### 1B

Implementirati opciju za dodavanje i uređivanje podataka o studentu (ime, prezime, opština rođenja) u bootstrap dijalogu. Opštine prikazati u combobox-u.

**Opcija Dodaj** treba preuzet string iz textboxa pretrage „ah“ i kopirati ga u defaultno ime studenta.

Defaultna vrijednost za opštinu rođenja (kod dodavanja novog studenta) treba da bude opština zadnjeg dodanog studenta.

**Opcija Obrisi** treba da radi soft delete, odnosno da "obrisanog" studenta sakrije.

![1b](https://github.com/adinpilavdzija/rs1-ispit/assets/65655945/3e1043de-5e8c-4b1a-b43b-03835e60ebb8)

Primjer Html code za bootstrap dijalog se nalazi u student-maticnaknjiga.component.html.

## Zadatak 2

Omogućiti sljedeće opcije samo za logiranog korisnika. Provjeru logiranog korisnika uraditi na front endu (angular) i backendu (web api).

Za angular validaciju logina koristite token i CanActive-implementacije iz foldera _guards.

**Implementirati formu za uređivanje matične knjige studenta, tj. opcije upis godine studija i ovjera semestara.**

### 2a

Omogućiti otvaranje komponente prosljeđivanjem parametra **student ID** u url putanji. Koristiti **Angular router**.

### 2b

Omogućiti dodavanje **nove upisane godine** (potrebna nova entity klasa i migracija za novu tabelu):  
    - datum upisa u zimski semestar: DateTime  
    - godina studija: int  
    - akademska godina: FK na tabelu **AkademskaGodina** (prikazati unutar combobox-a)  
    - cijena školarine: float  
    - obnova: bool  
    - datum ovjere: DateTime  
    - napomena za ovjeru: text  

### 2c

Prikazati **upisane godine** studija.

### 2d

Omogućiti **ovjeru zimskog semestra** sa tekst **napomenom**. Dodati dijalog za odabir datuma i unosom napomene. Kao defaultni postaviti trenutni datum.

![2d](https://github.com/adinpilavdzija/rs1-ispit/assets/65655945/bd3698f5-00e4-4daf-8d76-5f36d7613711)
