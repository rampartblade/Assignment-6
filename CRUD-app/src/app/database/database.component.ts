import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from 'src/models/user';
import { DatabaseService } from '../services/database.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class DatabaseComponent implements OnInit {

  database: User[]=[]
  temp: number= 0

  constructor(
    private databaseService: DatabaseService,
    private http: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private modal2: NgbModal,
    private registerService: RegisterService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

   form = {
    inputData: new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(5)]),
    }),
    updateData: new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('',[Validators.required, Validators.minLength(5)]),
    })
  }

  get title(){
    return this.form.inputData.get('title')
  }

  get firstName(){
    return this.form.inputData.get('firstName')
  }
  get lastName(){
    return this.form.inputData.get('lastName')
  }
  
  get role(){
    return this.form.inputData.get('role')
  }

  get email(){
    return this.form.inputData.get('email')
  }

  get password(){
    return this.form.inputData.get('password')
  }

  get confirmPassword(){
    return this.form.inputData.get('confirmPassword')
  }

  ngOnInit(): void {
    this.databaseService.getDatabase().subscribe((res: any)=>{
      if(res) this.database = res
    })
  }

  deleteUser(){
    this.databaseService.deleteData(this.temp).subscribe((res: any)=>{
      if(res) this.database = res
      this.modalService.dismissAll()
    })
    this.getAllUser()
    //console.log(this.getAllUser())
  }

  getAllUser(){
    this.databaseService.getDatabase().subscribe((res: any)=>{
      if(res) this.database = res
    })
  }

  getUserId(id: number){
    this.temp = id
    //console.log(this.temp)
  }

  open(content:any) {
    this.modalService.open(content, { size: 'lg' });
    /* this.databaseService.getDataById(this.temp).subscribe((res: any)=>{
      console.log(res)
      if(res){
        this.form.updateData.reset()
        this.form.updateData.setValue({
        title: res.title,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        role: res.role
      })
      this.form.updateData.reset()
      
      }
    }) */
    //console.log(this.database)
    //const data = this.database.find(x => x.id == this.temp)!
    

  }

  /* deleteModal(longContent: any){
    this.modal2.open(longContent)
  } */
  updateUser(){
    this.registerService.updateData(this.form.inputData.value, this.temp).subscribe((res: any)=>{
      if(res){ 
        this.database = res
        this.modalService.dismissAll()
      }
      this.getAllUser()
    })
  }

  onEdit(item: any){
    this.temp = item.id;
    this.form.updateData.controls['title'].setValue(item.title)
    this.form.updateData.controls['firstName'].setValue(item.firstName)
    this.form.updateData.controls['lastName'].setValue(item.lastName)
    this.form.updateData.controls['email'].setValue(item.email)
    if(item.role ==' User'){
      this.form.updateData.controls['role'].setValue('1')
    }
    else
    {
      this.form.updateData.controls['role'].setValue('0')
    }
  }

  editData(){
    const editDatabase = this.form.updateData.value;
    console.log(this.temp,this.database)
    this.registerService.updateData(editDatabase, this.temp)
    .subscribe(res=> {
      alert("Update Success")
      let ref = document.getElementById('cancel2')
      ref?.click();
      this.form.updateData.reset();
      this.getAllUser();
      //this.showAllData();
    })
  }
}
