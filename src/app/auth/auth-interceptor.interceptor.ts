import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("interceptors is called")
    let token = localStorage.getItem('jwtToken');
    if(token !== null){
      let newRequest = request.clone({setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }})
      console.log(newRequest)
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
