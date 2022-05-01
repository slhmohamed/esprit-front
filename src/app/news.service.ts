import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {News} from "./news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:8112/invit/';

  constructor(private http:HttpClient) { }

  afficherNew(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'retrieve-all');
  }

  ajouterNew(event: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'ajouterNew', event);
  }

  deletet(invitation_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`+'delete/'+invitation_id);
  }


  affEvent(Event_id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/event/${Event_id}`);
  }

  updateEVent(Event_id: number, value: any): Observable<Object> {
    return this.http.post(`${this.baseUrl}/updateEVent/${Event_id}`, value);
  }

  rate(news_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`+'deleteNew/'+news_id);
  }
  findevents(searchTerm: String): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'findnews/'+searchTerm);
  }

  postInvitation(news: { invita: number; age: string }) {

    return this.http.post(`${this.baseUrl}updateEVent`, News);  }


}
