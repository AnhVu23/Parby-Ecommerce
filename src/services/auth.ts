import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  constructor( private http: HttpClient) {
  }

  baseUrl = 'http://media.mw.metropolia.fi/wbma';

  signUp(userName: string, password: string, email: string, fullName?: string) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    const body = {
      'username': userName,
      'password': password,
      'email': email,
      'full_name': fullName
    }
    return this.http.post(this.baseUrl + '/users', body, settings);
  }

  signIn(userName: string, password: string) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    const body = {
      'username': userName,
      'password': password
    }
    return this.http.post(this.baseUrl + '/login', body, settings);
  }
}
