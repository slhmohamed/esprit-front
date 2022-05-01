/*import { isPlatformBrowser } from '@angular/common';
import { APP_ID, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { Ev } from '../ev';
import { EventserviceService } from '../eventservice.service';
const STATE_KEY_ITEMS = makeStateKey('items');

@Component({
  selector: 'app-listeev',
  templateUrl: './listeev.component.html',
  styleUrls: ['./listeev.component.css']
})
export class ListeevComponent implements OnInit {
  items: any = [];
  loaded!: boolean;
  constructor(private studentservice:EventserviceService,private state: TransferState,
    private itemsService: ItemsService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {
      this.loaded = false;
  }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  students?: Ev[] =[];

  student : Ev=new Ev();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;
  eventssss :Ev[] =[];
   searchTerm!: String;
  ngOnInit() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentservice.afficherevents().subscribe(data =>{
    this.students =data;
    this.dtTrigger.next;
    })
  }
  findevents() {
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    this.studentservice.findevents(this.searchTerm).subscribe(data =>{
    this.students =data;
    this.dtTrigger.next;
    })
  }
  deleteEvent(event_id: number) {
    this.studentservice.deleteEvent(event_id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage=true;
          this.studentservice.afficherevents().subscribe(data =>{
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
  participants(id: number){
    this.studentservice.participants(id).subscribe(
      data => {
        console.log(data);
        this.deleteMessage=true;
        this.studentservice.afficherevents().subscribe(data =>{
          this.students =data
          })
      },
      error => console.log(error));
}
  studentupdateform=new FormGroup({
    event_id:new FormControl(),
    eventTitle:new FormControl(),
    eventDescription:new FormControl(),
    eventDate:new FormControl() ,
    lieu:new FormControl(),
    type:new FormControl(),
    eventDuration:new FormControl(),
    nbmax:new FormControl()

  });

  updateStu(updstu : any){
    this.student=new Ev();
   this.student.event_id=this.StudentId!.value;
   this.student.eventTitle=this.StudentName?.value;
   this.student.eventDescription=this.StudentEmail?.value;
   this.student.eventDate=this.StudentBranch?.value;
   this.student.lieu=this.student_lieu?.value;
   this.student.type=this.student_type?.value;
   this.student.eventDuration=this.student_duration?.value;
   this.student.nbmax=this.student_nbmax?.value;
   console.log(this.StudentBranch?.value);


   this.studentservice.updateEVent(this.student).subscribe(
    data => {
      this.isupdated=true;
      this.studentservice.afficherevents().subscribe(data =>{
       this.students =data
       })
    },
    error => console.log(error));
  }

  get StudentName(){
    return this.studentupdateform.get('eventTitle');
  }

  get StudentEmail(){
    return this.studentupdateform.get('eventDescription');
  }

  get StudentBranch(){
    return this.studentupdateform.get('eventDate');
  }

  get StudentId(){
    return this.studentupdateform.get('event_id');
  }
  get student_lieu(){
    return this.studentupdateform.get('lieu');
  }

  get student_type(){
    return this.studentupdateform.get('type');
  }

  get student_duration(){
    return this.studentupdateform.get('eventDuration');
  }

  get student_nbmax(){
    return this.studentupdateform.get('nbmax');
  }

  get student_donation(){
    return this.studentupdateform.get('donation');
  }
  changeisUpdate(){
    this.isupdated=false;
  }




  ngOnInitd(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loaded = false;

    this.items = this.state.get(STATE_KEY_ITEMS, <any> []);

    if (this.items.length === 0) {
      this.itemsService.getItems('https://jsonplaceholder.typicode.com/users')
        .subscribe(
          items => {
            const platform = isPlatformBrowser(this.platformId) ?
              'in the browser' : 'on the server';
            console.log(`getUsers : Running ${platform} with appId=${this.appId}`);
            this.items = items;
            this.loaded = true;
            this.state.set(STATE_KEY_ITEMS, <any> items);
          });
    } else {
      this.loaded = true;
    }
  }

  resetUsers(): void {
    this.items = null;
    this.loaded = true;
  }






}
*/
