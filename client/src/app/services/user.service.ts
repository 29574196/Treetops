import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { User } from '../user';
    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "https://treehousechallenge.contractornation.com/newsletter";
  private authKey = 'a3bab730-dc2b-11ec-b6b2-73c685953c36'
    
  httpOptions = {
    headers: new HttpHeaders().set('Authorization',  `${this.authKey}`)
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<User[]> {
    return this.httpClient.get<any[]>(this.apiURL,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(user:any): Observable<User> {
    return this.httpClient.post<User>(this.apiURL, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id:any): Observable<User> {
    return this.httpClient.get<User>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id:any, user:any): Observable<User> {
    return this.httpClient.put<User>(this.apiURL, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id:any){
    return this.httpClient.delete<User>(this.apiURL + '/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
