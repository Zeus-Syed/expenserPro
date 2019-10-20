import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
 private url = 'http://localhost:3000';
  constructor(public http: HttpClient) { }

  //public getGroups():Observable<any>{
       
//return this.http.get(this.url+'/group/view');
 // }

public createGroup(data):Observable<any>{
const params = new HttpParams()
.set('groupName', data.groupName)
.set('userList', JSON.stringify(data.usersList))

return this.http.post(`${this.url}/group/create`, params);
}

public getAllGroups():Observable<any>{
  return this.http.get(`${this.url}/group/view/all`);
}

public getSingleGroup(groupId):Observable<any>{
  return this.http.get(`${this.url}/group/view/${groupId}`);
}
  
public deleteGroup(groupId):Observable<any>{
let data = {}
  return this.http.post(`${this.url}/group/delete/${groupId}`,data);
}

}
