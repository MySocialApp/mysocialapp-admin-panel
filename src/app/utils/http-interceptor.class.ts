import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

let accessToken: string;

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

    static SetAccessToken(token: string) {
        accessToken = token;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let h = {headers: req.headers.append('Content-Type', 'application/json')};
        if (accessToken) {
            h = {headers: h.headers.append('Authorization', accessToken)};
        }
        return next.handle(req.clone(h));
    }

}
