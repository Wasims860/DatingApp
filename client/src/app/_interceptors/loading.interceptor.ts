import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';
import { BusyServiceService } from './../_services/busy-service.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyServiceService:BusyServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):
   Observable<HttpEvent<unknown>> {
    this.busyServiceService.busy(); // Show loading spinner
    return next.handle(request).pipe(
      delay(1000),
      finalize(() => {
        this.busyServiceService.idle(); // Hide loading spinner when request is finished or failed
      })
    );
  }
}
