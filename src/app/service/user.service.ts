
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../model/user';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  login(username, password) {
    return this.http.post('/user-backend/login', { username: username, password: password })
  }

}
