import {Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  model = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.model = this.userService.getEmptyUserModel();
  }

  addUser() {
    this.userService.addUser(this.model);
    this.model = this.userService.getEmptyUserModel();
  }

  validateModel() {
    return _.isEmpty(this.model.firstName) || _.isEmpty(this.model.lastName) || _.isEmpty(this.model.email)
      || this.model.rating === 0;
  }

}
