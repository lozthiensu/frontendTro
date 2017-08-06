import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }

  private headers = new Headers({ 'Access-Control-Allow-Origin':'*',  'Content-Type': 'application/json' });
  private baseUrl = 'http://localhost:8235/api/';

  login(param: any): Promise<any> {
    return this.http
      .post(this.baseUrl + 'login', JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  setPrice(param: any): Promise<any> {
    return this.http
      .post(this.baseUrl + 'setPrice', JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  setTypeNotification(param: any): Promise<any> {
    return this.http
      .post(this.baseUrl + 'setTypeNotification', JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  setAddress(param: any): Promise<any> {
    return this.http
      .post(this.baseUrl + 'setAddress', JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  getPosts(param: any): Promise<any> {
    return this.http
      .post(this.baseUrl + 'listFeed', JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  getNewPosts(param: any): Promise<any> {
    return this.http
      .post(this.baseUrl + 'loadNewerFeeds', JSON.stringify(param), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  getGooglemapLocation(param: any): Promise<any> {
    return this.http
      .get('https://maps.google.com/maps/api/geocode/json?address='+param+'&key='+'AIzaSyBH275p6ql8fFdoQxmnBS42_EZD2R-0SNg')
      .toPromise()
      .then(res => res.json() as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
