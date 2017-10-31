import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-best-employees-widget',
  templateUrl: './best-employees-widget.html',
  styleUrls: ['./best-employees-widget.css']
})
export class BestEmployeesWidgetComponent implements OnInit {

  _users: User[];

  constructor(private userService: UserService) {  }

  ngOnInit() {
    this._users = this.getBestEmployees();
  }

  getBestEmployees(): User[] {
    const users: User[] = this.userService.getUsers(),
      bestEmplyoees: User[] = [];

    users.forEach((worker) => {
      if (worker.rating > 7) {
        bestEmplyoees.push(worker);
      }
    });

    bestEmplyoees.sort((a, b) => {
      return b.rating - a.rating;
    });

    return bestEmplyoees;
  }

}


