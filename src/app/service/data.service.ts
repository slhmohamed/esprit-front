import { Injectable } from '@angular/core';


 
 import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Inject } from '@angular/core'
 @Injectable()
export class DataService {
    isLogged: boolean = false;
    currentAdmin: any;
    config:any;
    private url;
    private endpoint;
    currentUser: any;
    constructor( @Inject('endPoint') private endPoint: string,  @Inject('routeService') private routeService: string, @Inject('http')  private http: HttpClient) {
  
      this.endpoint = endPoint;
      this.url = endPoint+routeService;
      
       
      
    
      }

     
       
      setUrl(segment: string){
        this.url = this.endPoint + this.routeService + segment;
      }
 
      insertData(resource: any){
       return  this.http.post(this.url,resource)
      }
    
      getAlll(): Observable<any> {
    
          return this.http.get(this.url);
            
            
        }
        deleteData(id:string,url:string){
          this.setUrl(url);
          console.log(this.url);
          console.log(id);
          
          
          return this.http.delete(this.url + id);

         
        }


getById(id:string,url:string){
  this.setUrl(url)
  return this.http.get(this.url +id);
}

updateData(data:any,id:string,url:string){
  this.setUrl(url);
return   this.http.put(this.url+id,data);
}     
    }