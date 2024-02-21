import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css']
})
export class StudentMaticnaknjigaComponent implements OnInit {
  showModal: boolean;
  selectedStudent: any;
  id: number;
  akGodine: any;
  upisGodine: any;

  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute) {}

  ovjeriLjetni(s:any) {

  }

  upisLjetni(s:any) {

  }

  ovjeriZimski(s:any) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((s:any) => {
      this.id=+s["id"];
      this.getStudent();
    })
    this.getAkGodine();
  }

  private getStudent() {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Student/GetById?id=" + this.id, MojConfig.http_opcije()).subscribe(x=>{
      this.selectedStudent = x;
    })
  }

  upisiZimski() {
    this.upisGodine = {
      id: 0,
      datumUpisa: '',
      godinaStudija: '',
      isObnova: false,
      cijenaSkolarine: '',
      studentId: this.id,
      akGodinaId: 2
    }
    this.showModal = true;
  }

  getAkGodine() {
    this.httpKlijent.get(MojConfig.adresa_servera + "/AkademskeGodine/GetAll_ForCmb", MojConfig.http_opcije()).subscribe(x=>{
      this.akGodine = x;
    })
  }

  saveChanges() {
    this.httpKlijent.put(MojConfig.adresa_servera + "/MaticnaKnjiga/SaveChanges" + this.upisGodine, MojConfig.http_opcije()).subscribe(x=>{
    });
    this.showModal = false;
  }
}
