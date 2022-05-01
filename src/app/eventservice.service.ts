import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventserviceService {
  a! : String  ;

  private baseUrl = 'http://localhost:8085/SpringMVC/';  
  log: any;
  logError: any;
  
  constructor(private http:HttpClient) { }  
  
  afficherevents(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'afficherevents');  
  }  
  
  ajouterEvent(event: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'ajouterEvent', event);  
  }  
  
  deleteEvent(event_id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}`+'deleteEvent/'+event_id);  
  }  
  
  affEvent(event_id: number): Observable<Object> {  
    return this.http.get(`${this.baseUrl}`+'affEvent/'+event_id);  
  }  
  
  updateEVent(event: object): Observable<Object> {  
    return this.http.put(`${this.baseUrl}`+'updateEVent',event);  
  }  
  afficherlesparticipants(event_id: number): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'afficherlesparticipants/'+event_id);  
  }
  findevents(searchTerm: String): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'findevents/'+searchTerm);  
  }
  
  participants(event_id: number): Observable<any> { //Blob> {  
   return this.http.get(`${this.baseUrl}`+'participants/export/pdf/'+event_id);// ,  { responseType 'blob' });  
  }

   participer(event_id: number, idUser: number): Observable<Object> {  
    return this.http.post(`${this.baseUrl}`+'participer/'+event_id+'/' +idUser, { responseType: 'text' });  
  }
  annulerlaparticipation(event_id: number, idUser: number): Observable<Object> {  
    return this.http.post(`${this.baseUrl}`+'annulerlaparticipation/'+event_id+'/' +idUser , { responseType: 'text' })
      
    ;;  
  }




  FetchUsername(event_id: number, idUser: number) {
    return this.http.get(`${this.baseUrl}`+'participer/'+event_id+'/' +idUser);
  }
}
