
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class MediaService {
  baseUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient) {}
  getImageByTag(tag: string) {
    const token = localStorage.getItem('token');
    const settings = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append('x-access-token', token)
    };
    return this.http.get(this.baseUrl + '/tags/' + tag, settings);
  }
}
