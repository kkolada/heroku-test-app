import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  private users: User[] = [];

  constructor(private storageService: StorageService) { }

  /**
   * Load users for the first time, when app starts.
   */
  loadUsers() {
    const importedUser = this.storageService.getUsers();
    if (!_.isNull(importedUser)) {
      this.users = importedUser;
    }
  }

  /**
   * Generate new User object.
   * @returns {User}
   */
  getEmptyUserModel() {
    return new User(null, null, null, 0, null, this.generateUserId());
  }

  /**
   * Generate user ID.
   * @returns {number}
   */
  generateUserId() {
    let newUserId: number;

    // prevent from duplicate ID
    do {
      newUserId = Math.floor((Math.random() * 100) + 1);
    }
    while
      (
        this.users.some((element) => {
          if (element.userId === newUserId) {
            return true;
          }
        })
      );

    return newUserId;
  }

  /**
   * Getter - list of users.
   * @returns {User[]}
   */
  getUsers(): User[] {
    return _.cloneDeep(this.users);
  }

  /**
   * Create new entry in users array and exports array to session storage.
   * @param {User} value
   */
  addUser(value: User): void {
    this.users.push(value);
    this.storageService.setUsers(this.users);
  }

  /**
   * Remove user with given userId and export users to session storage.
   * @param {number} userId
   */
  removeUser(userId: number) {
    const idx = this.users.findIndex(function (o) {
      return o.userId === userId;
    });
    if (idx !== -1) {
      this.users.splice(idx, 1);

      this.storageService.setUsers(this.users);
    }
  }

  /**
   * Return copy of found user.
   * @param userId
   * @returns {User}
   */
  getUserById(userId) {
    return _.cloneDeep(this.users[this.findUserById(userId)]);
  }

  /**
   * Search array of users and return found index.
   * @param userId
   * @returns {number}
   */
  private findUserById(userId) {
    let foundIndex = -1;
    if (typeof userId !== 'number') {
      userId = parseInt(userId, 10);
    }

    for (let i = 0; i < this.users.length; i++) {
      if (userId === this.users[i].userId) {
        foundIndex = i;
      }
    }

    return foundIndex;
  }

  /**
   * Save changes in already existing user.
   * @param user
   */
  saveChanges(user: User) {
    const userIndex = this.findUserById(user.userId);
    if (userIndex !== -1) {
      this.users[userIndex].firstName = user.firstName;
      this.users[userIndex].lastName = user.lastName;
      this.users[userIndex].email = user.email;
      this.users[userIndex].rating = user.rating;
      this.users[userIndex].active = user.active;

      this.storageService.setUsers(this.users);
    }
  }

}

export class User {
  constructor(public firstName: string, public lastName: string, public email: string, public rating: number,
              public active: boolean, public userId: number) {
  }
}
