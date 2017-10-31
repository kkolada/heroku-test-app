import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  model: User = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.loadUser(params['userId']));
  }

  loadUser(userId) {
    this.model = this.userService.getUserById(userId);
  }

  saveChanges() {
    this.userService.saveChanges(this.model);
    this.router.navigate(['/user-list']);
  }

  validateModel() {
    return _.isEmpty(this.model.firstName) || _.isEmpty(this.model.lastName) || _.isEmpty(this.model.email)
      || this.model.rating === 0;
  }

}
