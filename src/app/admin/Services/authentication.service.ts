import { Injectable } from '@angular/core';
import {Admin} from '../modal/modal';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentAdminSubject: BehaviorSubject<Admin>;
  public currentAdmin: Observable<Admin>;
  private apiUrl: string;
  private httpOptions: { headers: HttpHeaders };


  constructor(private http: HttpClient) {
    this.currentAdminSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();
    this.apiUrl = environment.apiUrl + `/Login`;
  }

  public get currentAdminValue(): Admin {
    console.log(' From currentAdminValue', this.currentAdminSubject.value);
    return this.currentAdminSubject.value;
  }


  login(email: string, password: string): any {
    return this.http.post<any>(this.apiUrl, { Email: email, Password: password }, environment.httpOptions)
      .pipe(map(AdminData => {
        console.log(' Admin: ', AdminData);
        // login successful if there's a jwt token in the response
        if (AdminData.status) {
          // store Admin details and jwt token in local storage to keep Admin logged in between page refreshes
          localStorage.setItem('currentAdmin', JSON.stringify(AdminData.result));
          this.currentAdminSubject.next(AdminData.result);
          return AdminData.status;
        }
        return AdminData.status;
      }));
  }

  logout(): any {
    // remove Admin from local storage to log Admin out
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
  }

}
