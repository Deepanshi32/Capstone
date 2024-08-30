import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
   
import { Login } from './login.model';
    
@Injectable({providedIn: 'root'})

export class LoginService {

  private _loginURL = "http://localhost:3000/api/v1/authentication";
  
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
   
  constructor(private httpClient: HttpClient) { }
    
  // loginAdmin(admin: Login){
  //   return this.httpClient.post(this._loginURL, admin)
  // }

  getAuthentication(): Observable<any> {
    return this.httpClient.get(this._loginURL )
    .pipe(
      catchError(this.errorHandler)
    )
    
  }

  ValidateLogin() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var data = {
      "id": 99,
      "patientId": 938993,
      "doctorId": 7324
    };
    return this.httpClient.post<any>("https://localhost:7010/api/ChatHistory", data, { headers: headers })
  }


  
  create(post: any): Observable<any> {
    return this.httpClient.post(this._loginURL , JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  // find(id: string): Observable<Login> {
  //   return this.httpClient.get<Login>(this.LoginURL + id)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
    
  // update(id: string, post: any): Observable<Login> {
  //   return this.httpClient.put<Login>(this.LoginURL + id, JSON.stringify(post), this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
    
  // delete(id: string){
  //   return this.httpClient.delete<Login>(this.LoginURL + id, this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }

  
     
   
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

 
}