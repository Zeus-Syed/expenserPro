import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://api.zeussyed.xyz';
  constructor(public http: HttpClient) {
    console.log('user service called!!!');
   }


  //signup funct
  public signupFunction(data):Observable<any> {
    const params = new HttpParams()
   .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('phoneNo',data.phoneNo)
    .set('email',data.email)
    .set('password',data.password)
    .set('countryCode', data.countryCode)
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

  public logOut(authToken): Observable<any> {
   let data = {};
    return this.http.post(`${this.url}/users/logout/${authToken}`, data);
  }

  public getAllUsers(): Observable<any> {
//let authToken = Cookie.get('authToken');
return this.http.get(`${this.url}/users/view/all`);
  }

  public getSingleUser(userId):Observable<any>{
    return this.http.get(`${this.url}/users/${userId}/details`);
  }

  public getSingleUserByEmail(email):Observable<any>{
    return this.http.get(`${this.url}/users/details/${email}`);
  }

  public sendMail(data):Observable<any>{
    return this.http.post(`${this.url}/users/sendmail`, data);
  }

  public resetPassword(data):Observable<any>{
    //const params = new HttpParams()
    //.set('email', data.email)
    //.set('password',data.password)
    return this.http.put(this.url+'/users/reset', data);
  }

}
