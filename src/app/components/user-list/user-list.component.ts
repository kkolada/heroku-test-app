import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  _users: any[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.refreshListOfUsers();
  }

  refreshListOfUsers() {
    this._users = this.userService.getUsers();
  }

  removeUser(user) {
    this.userService.removeUser(user.userId);
    this.refreshListOfUsers();
  }

  editUser(userId: string) {
    this.router.navigate(['/app-edit-user', userId]);
  }

}
