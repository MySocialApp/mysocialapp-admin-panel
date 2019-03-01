import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class GraphTileWidgetService {

    constructor(private http: HttpClient) {
    }

    // Get all data from the API
    getChartSampleData() {
        return this.http.get('assets/data/charts.json').pipe(
            map(res => res['result']));
    }
}
