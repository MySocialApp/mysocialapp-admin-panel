import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {chatHistory} from './message';


@Injectable()
export class QuickviewService {

    constructor(private http: HttpClient) {
    }

    // Get from the API
    getNotes() {
        return this.http.get('assets/data/notes.json').pipe(
            map(res => res['result'] as []));
    }

    getUsers() {
        return this.http.get('assets/data/users.json').pipe(
            map(res => res['result'] as []));
    }

    getChatMessages() {
        return this.http.get('assets/data/messages.json').pipe(
            map(res => res['result'] as chatHistory));
    }
}
