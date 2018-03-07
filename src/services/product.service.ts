
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
    return this.http.get(this.baseUrl + '/media/' + fileId);
  }

  getRatingbyFileId(fileId: number) {
    return this.http.get(this.baseUrl + '/ratings/file/' + fileId);
  }

  getCommentByFileId(fileId: number) {
    return this.http.get(this.baseUrl + '/comments/file/' + fileId);
  }

  calculateOverallRate(rateArray: number[]) {
    let overallRate = 0;
    for(let rate of rateArray) {
      overallRate += rate;
    }
    return +(overallRate / rateArray.length).toFixed(2);
  }

  renameTag(parentTag, childTag) {
    let newChildTag = '';
    const childTagSplit = childTag.toLowerCase().split(" ");
    newChildTag = childTagSplit[0];
    for(let i = 1; i < childTagSplit.length; i++) {
      newChildTag = newChildTag + childTagSplit[i].charAt(0).toUpperCase() + childTagSplit[i].substr(1);
    }
    console.log(newChildTag);
    return parentTag + ' ' + newChildTag;
  }
}
