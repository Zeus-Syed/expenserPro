import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000';
  constructor(public http: HttpClient) { }


  //signup funct
  public signupFunction(data):Observable<any> {
    const params = new HttpParams()
   .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('phoneNo',data.phoneNo)
    .set('email',data.email)
    .set('password',data.password)
    return this.http.post(this.url+'/users/signup',data);
  }

  public setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  public getUserInfoFromLocalStorage =() =>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public loginFunc(data):Observable<any> {
    const params = new HttpParams()
    .set('email', data.email)
    .set('password',data.password)
    return this.http.post(this.url+'/users/login', data);
  }

  public logout(): Observable<any> {
    const params = new HttpParams()
    .set('authToken',Cookie.get('authToken'))
    return this.http.post(`${this.url}/users/logout`, params);
  }

  public getAllUsers(): Observable<any> {
//let authToken = Cookie.get('authToken');
return this.http.get(`${this.url}/users/view/all`);
  }
}
