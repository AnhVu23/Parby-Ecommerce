import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ReviewService {

  baseUrl = 'http://media.mw.metropolia.fi/wbma';
  constructor(private http: HttpClient) {

  }

  onUploadPhoto(file: File, title: string) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    return this.http.post(this.baseUrl + '/media', formData, settings);
  }

  onPostComment(fileId: number, comment: string) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    const body = {
      'file_id': fileId,
      'comment': comment
    }
    return this.http.post(this.baseUrl + '/comments', body, settings);
  }

  onPostRate(fileId: number, rating: number) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    const body = {
      'file_id': fileId,
      'rating': rating
    }
    return this.http.post(this.baseUrl + '/ratings', body, settings);
  }

  onPostTag(fileId: number, tag: string) {
    const token = localStorage.getItem('token');
    const settings = {
      headers : new HttpHeaders().set('x-access-token', token)
    };
    const body = {
      'file_id': fileId,
      'tag': tag
    }
    return this.http.post(this.baseUrl + '/tags', body, settings);
  }

}
