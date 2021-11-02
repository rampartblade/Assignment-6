import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  endpoint: string='http://localhost:4000'
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  signUp(user: User): Observable<any>{
    const api = `${this.endpoint}/users`;
    return this.http.post(api, user).pipe(catchError(this.handleError))
  }

  updateData(user: User, id: number): Observable<any>{
    const api = `${this.endpoint}/users/`+id;
    return this.http.put(api, user).pipe(catchError(this.handleError))
  }

  handleError(err: HttpErrorResponse){
    let msg='';
    if(err.error instanceof ErrorEvent){
      msg = err.error.message;
    }
    else{
      msg = `Server-side Error Code: ${err.status} \n Message: ${err.message}`;
    }
    return throwError(msg);
  }
}
