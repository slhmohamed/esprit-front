import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NewsService} from "../news.service";
import { InvitationService } from '../service/invitation.service';

@Component({
  selector: 'app-add-invitation',
  templateUrl: './add-invitation.component.html',
  styleUrls: ['./add-invitation.component.css']
})
export class AddInvitationComponent implements OnInit {

   invitationForm: FormGroup;
  submitted = false;
  users = [
    {id: 1, name: 'Youssef Nassri'},
    {id: 2, name: 'Ali Salah'},
    {id: 3, name: 'Mostafa kammoun'},
    {id: 4, name: 'Amine ali'},
  ];
  selected:any = [];
  constructor(private formBuilder: FormBuilder,private invitationService:InvitationService) {
    localStorage.setItem('id',"1")
   }

  ngOnInit() {
   
    
 
    
    this.invitationService.getUsers().subscribe(res=>{
  ///    this.users=res
    })
      this.invitationForm = this.formBuilder.group({
        invitationTitle: ['', Validators.required],
        invitationBody: ['', Validators.required],
          invitationType: ['', Validators.required],
          selected:[]
        
   
       });
  }

  // convenience getter for easy access to form fields
  get f() { return this.invitationForm.controls; }
  addCustomUser (){
    console.log("test o");
    
  }
  onSubmit() {
    console.log(this.invitationForm.value);
    
      this.submitted = true;

      // stop here if form is invalid
      if (this.invitationForm.invalid) {
          return;
      }
      console.log(this.selected);
      let users=[{}];
    this.invitationForm.value.selected.forEach((obj:any)=>{
      console.log(obj);
      this.users.forEach(user=>{
        if(obj===user.id){
          users.push(user)
          
          
        }
      })
      

    }  
    )
let data={
  "invitationTitle":this.invitationForm.value.invitationTitle,
  "invitationBody":this.invitationForm.value.invitationBody,
  "invitationType":this.invitationForm.value.invitationType,
  "users":users,
  "trip":null
}
console.log(data);

this.invitationService.sendInvitation(data).subscribe(res=>{

  console.log(res);
  this.onReset()
  

})

 
    }

  onReset() {
      this.submitted = false;
      this.invitationForm.reset();
  }
}