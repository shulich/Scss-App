import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userList: Subject<User[]> = new Subject<User[]>();

  _userList:  User[] = [
    { id: 1, name: 'shulamit' },
    { id: 2, name: 'chagit' },
    { id: 3, name: 'chaya' },
    { id: 4, name: 'gilad' },
    { id: 5, name: 'rini' }
  ];

  constructor() {
   
  }

  loadUserList():  User[] {
    return this._userList.sort((a, b) => a.name.localeCompare(b.name));;
  }
  
    addUser(newUser:User) {
      this._userList.push(newUser);
      this.userList.next(this.loadUserList())
  }
}
