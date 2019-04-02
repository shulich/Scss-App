import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList:  User[] = [
    { id: 1, name: 'shulamit' },
    { id: 2, name: 'chagit' },
    { id: 3, name: 'chaya' },
    { id: 4, name: 'gilad' },
    { id: 5, name: 'rini' }
  ];
  constructor() {
  }

  loadUserList():  User[] {
    return this.userList;
  }
  
    addUser(newUser:User) {
    this.userList.push(newUser);
  }
}
