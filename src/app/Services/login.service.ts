import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }



  Login(reqBody): any{
    return this.http.post('/FromSubmit', reqBody, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        // Authorization: 'authkey',
        // userid: '1'
      })
    }).pipe(map(LoginValue => {
      if (LoginValue){
        return LoginValue;
      }

      return LoginValue;
    }));
  }
}
