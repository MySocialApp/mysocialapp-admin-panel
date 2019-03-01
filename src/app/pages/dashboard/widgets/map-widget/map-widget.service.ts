import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class MapWidgetService {

    constructor(private http: HttpClient) {
    }

    getMapData() {
        return this.http.get('assets/data/map.json').pipe(
            map(res => res['result']));
    }
}
