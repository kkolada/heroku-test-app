import { Injectable } from '@angular/core';
import { User } from './user.service';

const itemKey = 'EARP_Employee_Manager_workers';

@Injectable()
export class StorageService {

  constructor() { }

  setUsers(users: User[]) {
    localStorage.setItem(itemKey, JSON.stringify(users));
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(itemKey));
  }

}
