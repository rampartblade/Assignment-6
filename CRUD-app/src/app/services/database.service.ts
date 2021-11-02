import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  endpoint: string='http://localhost:4000/users'

  constructor(
    private http: HttpClient
  ) { }

  getDatabase(): Observable<any>{
    const api = `${this.endpoint}`;
    return this.http.get(api).pipe(catchError(this.handleError))
  }

  getDataById(id: number): Observable<any>{
    const api = `${this.endpoint}/`+id;
    return this.http.get(api).pipe(catchError(this.handleError))
  }

  deleteData(id: number): Observable<any>{
    const api = `${this.endpoint}/`+ id;
    return this.http.delete(api).pipe(catchError(this.handleError))
  }

  updateData(users: User): Observable<any>{
    const api = `${this.endpoint}/`;
    return this.http.put(api,users).pipe(catchError(this.handleError))
  }

  handleError(err: HttpErrorResponse){
    if(err.error instanceof ErrorEvent)
      return throwError(err.error.message)
    else
      return throwError(`Server-side Error code: ${err.status} \nMessage : ${err.message}`)
  }
}
