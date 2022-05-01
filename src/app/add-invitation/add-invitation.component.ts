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

  constructor(private formBuilder: FormBuilder,private invitationService:InvitationService) {
    localStorage.setItem('id',"1")
   }

  ngOnInit() {
      this.invitationForm = this.formBuilder.group({
        invitationTitle: ['', Validators.required],
        invitationBody: ['', Validators.required],
          invitationType: ['', Validators.required],
       
   
       });
  }

  // convenience getter for easy access to form fields
  get f() { return this.invitationForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.invitationForm.invalid) {
          return;
      }
let data={
  "invitationTitle":this.invitationForm.value.invitationTitle,
  "invitationBody":this.invitationForm.value.invitationBody,
  "invitationType":this.invitationForm.value.invitationType,
  "users":[],
  "trip":null
}
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