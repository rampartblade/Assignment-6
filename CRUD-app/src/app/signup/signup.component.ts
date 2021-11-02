import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RegisterService } from '../services/register.service';
import { DatabaseService } from '../services/database.service';
import { User } from 'src/models/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [NgbModalConfig, NgbModal]

})
export class SignupComponent implements OnInit {

  constructor(    
    public registerService: RegisterService,
    public databaseService: DatabaseService,
    config: NgbModalConfig, 
    private modalService: NgbModal
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  database: User[] = []

  form = {
    inputData: new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email : new FormControl('',[Validators.required, Validators.email]),
      role: new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(5)]),
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
   
  }

  
  getAllUser(){
    this.databaseService.getDatabase().subscribe((res: any)=>{
      if(res) this.database = res
    })
  }

  registerUser(){
    this.registerService.signUp(this.form.inputData.value).subscribe((res)=>{
      if(res){
        this.form.inputData.reset()
        this.modalService.dismissAll()
      }
      this.getAllUser()
    })
  }

  /* updateUser(){
    this.registerService.updateData(this.form.inputData.value).subscribe((res)=>{
      if(res){
        this.form.inputData.reset()
      }
    })
  } */

  open(content:any) {
    this.modalService.open(content);
  }
}
