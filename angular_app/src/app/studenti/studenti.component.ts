import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  title:string = 'angularFIT2';
  ime_prezime:string = '';
  opstina: string = '';
  studentPodaci: any;
  filter_ime_prezime: boolean;
  filter_opstina: boolean;


  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.studentPodaci = x;
    });
  }

  ngOnInit(): void {
    this.testirajWebApi();
  }

  getFiltered() {
    if (!this.filter_opstina && !this.filter_ime_prezime)
      this.testirajWebApi();
    else
    {
      this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetAll?ime_prezime="+this.ime_prezime, MojConfig.http_opcije()).subscribe(x=>{
        this.studentPodaci = x;

        if(this.filter_opstina)
          this.studentPodaci=this.studentPodaci.filter((s:any)=>s.opstina_rodjenja.description.toLowerCase().startsWith(this.opstina.toLowerCase()))
      });
    }
  }
}
