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
    this.apiUrl = environment.apiUrl + `/admin/authenticate`;
  }

  public get currentAdminValue(): Admin {
    console.log(' From currentAdminValue', this.currentAdminSubject.value);
    return this.currentAdminSubject.value;
  }


  login(email: string, password: string): any {
    return this.http.post<any>(this.apiUrl, { email, password }, environment.httpOptions)
      .pipe(map(Admin => {
        console.log(' Admin: ', Admin);
        // login successful if there's a jwt token in the response
        if (Admin.result.status) {
          // store Admin details and jwt token in local storage to keep Admin logged in between page refreshes
          localStorage.setItem('currentAdmin', JSON.stringify(Admin.result.result));
          const stringData = JSON.stringify({name: 'Amit' });
          localStorage.setItem('currentAdmin_id', stringData);
          console.log(' localstorageItem: ', localStorage.getItem('currentAdmin'));
          console.log(' Admin.result.result: ', Admin.result.result);
          console.log(' stringData ', stringData);
          this.currentAdminSubject.next(Admin.result.result);
        }

        return Admin.result.status;
      }));
  }

  logout(): any {
    // remove Admin from local storage to log Admin out
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
  }

}
