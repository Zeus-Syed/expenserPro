import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupServiceService {
 private url = 'http://localhost:3000';
  constructor(public http: HttpClient) { }

  public getGroups():Observable<any>{
       
return this.http.get(this.url+'/group/view');
  }


  

}
