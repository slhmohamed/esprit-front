import { APP_ID, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { Item } from './items/item';
import { Badge } from './badge';
import { ItemsService } from './items/items.service';
import { environment } from '../../../../environments/environment';
import { InvitationService } from './../../../service/invitation.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { EventserviceService } from 'src/app/eventservice.service';
import { get } from 'jquery';
import { Subject } from 'rxjs';
import { Ev } from 'src/app/ev';
const STATE_KEY_ITEMS = makeStateKey('items');

declare const bootstrap: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  itemsLoaded: boolean;
  items: Item[];
  badges: Badge[];
  searchField: string;
  player: string;
  playerLoaded: boolean;
  modalPlayer: any;
  loaded: boolean;
  filtersEnabled: boolean;
  resultsFound: boolean;
 
  formFilters = this.fb.group({
    dateType: [''],
    fromDate: [''],
    toDate: [''],
    sortType: [''],
    show: [''],
    movie: [''],
    clip: [''],
    game: [''],
    elementsCount: [''],
  });
  filterForm: FormGroup;
  submitted = false;
  constructor(
    public router: Router,
    private itemsService: ItemsService,
    private fb: FormBuilder,
     private formBuilder: FormBuilder,
    private invitationService:InvitationService,
    private studentservice:EventserviceService,private state: TransferState,
     @Inject(PLATFORM_ID) private platformId: object,
    @Inject(APP_ID) private appId: string) {

    this.loaded = false;
    this.items = [];
    this.badges = [];
    this.itemsLoaded = false;
    this.searchField = ''
    this.player = '';
    this.playerLoaded = false;
    this.filtersEnabled = false;
    this.resultsFound = false;

    this.formFilters.setValue({
      dateType: 1,
      fromDate: '',
      toDate: '',
      sortType: 1,
      show: false,
      movie: false,
      clip: false,
      game: false,
      elementsCount: 20,
    });

  }

  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>= new Subject();

  students: any =[];

  student : Ev=new Ev();
  deleteMessage=false;
  studentlist:any;
  isupdated = false;
  eventssss :Ev[] =[];
   searchTerm!: String;
  ngOnInit() {
    this.invitationService.getAllInvitation().subscribe(data =>{
      this.student =data;
       })
    this.isupdated=false;
    this.dtOptions = {
      pageLength: 6,
      stateSave:true,
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],
      processing: true
    };
    
    
    this.filterForm = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      
 
     });
    }
  
  // convenience getter for easy access to form fields
  get f() { return this.filterForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.filterForm.invalid) {
          return;
      }
 
this.invitationService.filterInvitation(this.filterForm.value.start,this.filterForm.value.end).subscribe(res=>{

this.student=res
  
this.onReset()
})

 
    }

  onReset() {
      this.submitted = false;
      this.filterForm.reset();
  }

  search(){
    this.invitationService.serachInvitation(this.searchField).subscribe(res=>{
      this.student=res
    })
    
  }

  getItems(): any {
    this.loaded = false;
    const url = environment.urlNews;
    /*    setTimeout(() => {
          this.itemsService.getItems(url)
            .subscribe(
              items => {
                this.items = items;
                this.loaded = true;
              }
            );
        }, 500); */
    this.itemsService.getItems(url)
      .subscribe(
        items => {
          this.items = items;
          this.loaded = true;
        }
      );
  }

  formFiltersChanged(data: any, closingBadge: boolean) {
    this.badges = [];
    if (data["movie"]) {
      this.badges.push({ name: 'movie', caption: 'Movie', icon: 'fas fa-film' })
    };
    if (data["show"]) {
      this.badges.push({ name: 'show', caption: 'Show', icon: 'fas fa-desktop' });
    };
    if (data["clip"]) {
      this.badges.push({ name: 'clip', caption: 'Clip', icon: 'fas fa-volume-up' })
    };
    if (data["game"]) {
      this.badges.push({ name: 'game', caption: 'Game', icon: 'fab fa-playstation' })
    };
    if (!closingBadge) {
      this.closeFilters();
    }
    this.getItems();
  }

  closeFilters() {
    this.filtersEnabled = !this.filtersEnabled;
    const collapse = document.getElementById('collapseFilters')
    new bootstrap.Collapse(collapse, { hide: true });
  }

  addItem() {
    this.router.navigate(['/news', 0]);
  }


  closeBadge(badge: string) {
    this.closeFilters();
  }

  openTrailer(item: any, id: any) {
    this.player = item.youtubeLink;
    this.playerLoaded = true;
    if (this.modalPlayer === undefined) {
      this.modalPlayer = new bootstrap.Modal(document.getElementById('newsModal'), {
        keyboard: true
      })
      const selectPlayer = document.getElementById('newsModal')
      selectPlayer?.addEventListener('show.bs.modal', this.onShowModal.bind(this));
      selectPlayer?.addEventListener('hidden.bs.modal', this.onCloseModal.bind(this));
    }
    this.modalPlayer?.show();
  }

  onShowModal() {
  }

  onCloseModal() {
    this.player = '';
    this.playerLoaded = false;
  }

  onHandleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  onSearch() {
    this.getItems();
  }

  onLoading(event: any) {
  }

  loadError(event: any) {
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
     this.loaded = true;
  }


}

