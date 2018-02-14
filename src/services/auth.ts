import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  data: any;

  constructor(private http: HttpClient) {
  }

  baseUrl = 'http://media.mw.metropolia.fi/wbma';

  signUp(userName: string, password: string, email: string, fullName?: string) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    const body = {
      'userName': userName,
      'password': password,
      'email:': email,
      'full_name': fullName
    }
    return this.http.post(this.baseUrl + '/users', body, settings)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  checkUserNameIfExist(userName: string) {
    const params = new HttpParams().set('username', userName);
    this.http.get(this.baseUrl + '/users/username', {params: params})
      .pipe(map(response => {
        this.data = response;
        console.log(this.data);
        const available: boolean = (this.data.available === 'true');
        return available;
      }))
  }
}
