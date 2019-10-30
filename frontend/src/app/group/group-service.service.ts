import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
 private url = 'http://localhost:3000';

 public userNames;
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


public createExpense(data):Observable<any>{

  const params = new HttpParams()
  .set('groupId', data.groupId)
  .set('expName', data.expName )
  .set('amount', data.amount )
  .set('payerName', data.payerName )
  .set('payerId', data.payerId)
  .set('expAdder', data.expAdder)
  return this.http.post(`${this.url}/expenses/create`, params);
}

public getAllExpenses(groupId):Observable<any>{

  return this.http.get(`${this.url}/expenses/view/${groupId}`);
}

public getSingleExpense(expId):Observable<any>{
  return this.http.get(`${this.url}/expenses/single/${expId}`);
}

public setUserNames = (userNames) =>{
this.userNames = userNames;
}
public getUserNames = () =>{
  return this.userNames;
}
public deleteExpense = (expId) =>{
  let data = {};
  return this.http.post(`${this.url}/expenses/delete/${expId}`, data);
}

public editExpense = (expId, data)=>{

  return this.http.put(`${this.url}/expenses/edit/${expId}`, data);
}

public createHistory = (data) =>{
  
   return this.http.post(`${this.url}/history/create`, data); 
}

public getAllHistory = () =>{
  
  return this.http.get(`${this.url}/history/view`);
}

}
