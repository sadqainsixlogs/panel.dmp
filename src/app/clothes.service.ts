import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// mport { ConfigProvider } from '../config/config';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as xml2js from "xml2js";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class ClothesService {
// baseURL:any="http://dressmepro-server.kq39epmump.us-east-2.elasticbeanstalk.com";
baseURL:any="https://368f3cd8.ngrok.io"
// baseURL:any="https://api.dressmepro.com";
  constructor(public http: HttpClient ) { }

  getdetails(): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization' : 'Bearer ' + this.token  })
    // };
    return this.http.get(this.baseURL+'/cloth/getPanelData')
        .map((res)=>{return res}
       
        );
  }
  postdeatil(user: any): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + this.token  })
    // };
    return this.http.post<any>(this.baseURL+'/cloth/add',user,httpOptions)
        .map((res)=>{return res}
       
        );
  }
  addsignin(user: any): Observable<any> {
    return this.http.post<any>(this.baseURL+'/user/login',user,httpOptions)
        .map((res)=>{return res}
       
        );
  }
  // postData(): Observable<any> {
  //   var url = "https://wwd.com/custom-feed/fashion/"
  //   return this.http.get(url)
  //       .map((res)=>{ return res}
       
  //       );
  // }
 
}
