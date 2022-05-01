import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { News } from '../news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})
export class ListnewsComponent implements OnInit {
   News : News[] =[];
   invitationStatus ?: string;
  constructor(private studentservice:NewsService) { }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  student : News=new News();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;


  students?: News[] =[];


  eventssss :News[] =[];
   searchTerm!: String;

  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentservice.afficherNew().subscribe(data =>{
    this.students =data;
    this.dtTrigger.next;
    })
  }

  deleteEvent(invitation_id: number) {
    this.studentservice.deletet(invitation_id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.studentservice.afficherNew().subscribe(data =>{
            this.students =data
            })
        },
        error => console.log(error));
  }

  updateStudent(id: number){
    this.studentservice.affEvent(id)
      .subscribe(
        data => {
          this.studentlist=data
        },
        error => console.log(error));
  }

  studentupdateform=new FormGroup({
    student_id:new FormControl(),
    student_name:new FormControl(),
    student_email:new FormControl(),

  });


  get Studentpublishedat(){
    return this.studentupdateform.get('publishedat');
  }
  get StudentName(){
    return this.studentupdateform.get('newsTitle');
  }

  get StudentEmail(){
    return this.studentupdateform.get('newsDescription');
  }


  get StudentId(){
    return this.studentupdateform.get('news_id');
  }

  get Studentrating(){
    return this.studentupdateform.get('rating');
  }
  changeisUpdate() {
    this.isupdated=false;
  }
  submitData(value: any) {
    const body = {
      invita: value.invitationTitle,
      age: value.invitationBody
    }
    this.studentservice.postInvitation(body)
      .subscribe(response => {
        console.log(response)
      })
  }
  Search() {
    this.News =this.News.filter(res=>{
      return res.invitationStatus.toLocaleLowerCase().match(this.invitationStatus!.toLocaleLowerCase());
    })
  }

}
