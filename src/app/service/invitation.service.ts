import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends DataService  {

  constructor(http: HttpClient) {
    super('http://localhost:8112', '/invit', http);
     
  }
  getUsers(){
    this.setUrl('/getUsers');
    return this.getAlll()
  }
  sendInvitation(invitation:any){
    let user_id=localStorage.getItem('id')
      this.setUrl("/save/"+user_id)
    return  this.insertData(invitation)
      
  }
  serachInvitation(title:any){
      this.setUrl("/filter/"+title)
     return  this.getAlll()
  }
  filterInvitation(start:any,end:any){
    this.setUrl('/between/'+start+"/"+end)
    return this.getAlll()
  }
  getAllInvitation(){
    this.setUrl('/retrieve-all')
    return this.getAlll()
  }
  
}