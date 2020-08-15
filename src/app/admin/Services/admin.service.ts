import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../modal/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private chPassword: string;
  private httpOptions: { headers: HttpHeaders };

  private apiUrl: string;
  private apidelete: string;
  private apiEdit: string;
  private apiupdate: string;
  private apiAll: string;

  private currentAllUserSubject: BehaviorSubject<User>;
  private currentAllUser: Observable<User>;
  private currentUserEditSubject: BehaviorSubject<User>;
  private currentEditUser: Observable<User>;
  private currentDistinctUserSubject: BehaviorSubject<User>;
  private currentDeletedUserSubject: BehaviorSubject<User>;
  private currentDistinctUser: Observable<User>;
  private currentDeletedtUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.chPassword = environment.apiUrl + `/ChangePassword`;

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserEditSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentEditUser')));
    this.currentDistinctUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('DistinctUser')));
    this.currentDeletedUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('lastDeletedUser')));

    this.currentUser = this.currentUserSubject.asObservable();
    this.currentEditUser = this.currentUserEditSubject.asObservable();
    this.currentDistinctUser = this.currentDistinctUserSubject.asObservable();
    this.currentDeletedtUser = this.currentDistinctUserSubject.asObservable();

    this.currentAllUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('allUser')));
    this.currentAllUser = this.currentAllUserSubject.asObservable();

    this.apiUrl = environment.apiUrlUser + `/register`;
    this.apiupdate = environment.apiUrlUser + `/updateUser`;
    this.apidelete = environment.apiUrlUser + `/deleteUser`;
    this.apiEdit = environment.apiUrlUser + `/updateUser`;
    this.apiAll = environment.apiUrlUser + `/getAllUser`;

  }


  getAlluser(): any {
    return this.http.get<any>(this.apiAll, environment.httpOptions).pipe(map(user => {
      console.log(' user  service : ', user);
      localStorage.setItem('allUser', JSON.stringify(user));
      this.currentAllUserSubject.next(user);
      return user;
      console.groupEnd();
    }));
  }

  deleteUser(Obj): any {
    return this.http.post<any>(this.apidelete, { Email: Obj.Email}, environment.httpOptions)
      .pipe(map(user => {
        console.log(' Delete user service : ', user);

        if (user.nModified) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('lastDeletedUser', JSON.stringify(user));
          this.currentDeletedUserSubject.next(user);
          console.log(' From delete Function ', user);
        }
        return user;
        console.groupEnd();
      }));
  }

  updateUser(user): any {
    return this.http.post<any>(this.apiupdate, user, environment.httpOptions)
      .pipe(map(userData => {
        console.log(' Edit user  service : ', userData);

        if (userData.nModified) {
          const userDocument = Object.assign({_id: user._id}, user.fieldData);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('EditUser', JSON.stringify(userDocument));
          this.currentUserSubject.next(userDocument);
          return userData;
        }
        return userData;
        console.groupEnd();
      }));
  }

}
