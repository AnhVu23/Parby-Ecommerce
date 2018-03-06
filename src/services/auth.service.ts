import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable, OnInit} from "@angular/core";

@Injectable()
export class AuthService {

  authenticated = false;
  userName: string;
  baseUrl = 'http://media.mw.metropolia.fi/wbma';
  constructor(private http: HttpClient) {
  }

  signUp(userName: string, password: string, email: string, fullName?: string) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    const body = {
      'username': userName,
      'password': password,
      'email': email,
      'full_name': fullName
    };
    return this.http.post(this.baseUrl + '/users', body, settings);
  }

  signIn(userName: string, password: string) {
    this.userName = userName;
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    const body = {
      'username': userName,
      'password': password
    };
    return this.http.post(this.baseUrl + '/login', body, settings);
  }

  signOut() {
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    let token = '';
    if (localStorage.getItem('token') !== null) {
      token = localStorage.getItem('token');
    }
    console.log(token);
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.baseUrl + '/users/user', settings);
  }

  getCurrentUserName() {
    this.isAuthenticated().subscribe(
      data => {
        this.userName = data['username'];
        console.log(this.userName);
      }
    );
  }

  getUserName(userId: number) {
    const token = localStorage.getItem('token');
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token)
    };
    return this.http.get(this.baseUrl + '/users/' + userId, settings);
  }

}
