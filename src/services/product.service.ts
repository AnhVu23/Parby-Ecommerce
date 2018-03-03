
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Review} from "../model/review.model";

@Injectable()
export class ProductService {
  baseUrl = 'http://media.mw.metropolia.fi/wbma';
  constructor(private http: HttpClient, private auth: AuthService) {}

  getImageByTag(tag: string) {
    const token = localStorage.getItem('token');
    const settings = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
        .append('x-access-token', token)
    };
    return this.http.get(this.baseUrl + '/tags/' + tag, settings);
  }

  getFileByFileId(fileId: number) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.get(this.baseUrl + '/media/' + fileId);
  }

  getRatingbyFileId(fileId: number) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.get(this.baseUrl + '/ratings/file/' + fileId);
  }

  getCommentByFileId(fileId: number) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.get(this.baseUrl + '/comments/file/' + fileId);
  }


}
