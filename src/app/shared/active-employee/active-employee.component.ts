import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';

const activeWorkerTitle = 'Active employee',
  inactiveWorkerTitle = 'Inactive employee';

@Component({
  selector: 'app-active-employee',
  templateUrl: './active-employee.component.html',
  styleUrls: ['./active-employee.component.css']
})
export class ActiveEmployeeComponent implements OnInit, OnChanges {

  @Input() pullRight: boolean;
  @Input() disabled: boolean;
  @Input() active: boolean;
  @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  activeTitle: string;

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.disabled)) {
      this.disabled = false;
    }
    if (_.isUndefined(this.active)) {
      this.active = false;
      this.changeTitle();
    }
    if (_.isUndefined(this.pullRight)) {
      this.pullRight = false;
    }
  }

  ngOnChanges(changes: any) {
    if (!_.isUndefined(changes.active)) {
      this.changeTitle();
    }
  }

  mouseClick() {
    if (!this.disabled) {
      this.active = !this.active;
      this.activeChange.emit(this.active);
      this.changeTitle();
    }
  }

  changeTitle() {
    if (this.active) {
      this.activeTitle = activeWorkerTitle;
    } else {
      this.activeTitle = inactiveWorkerTitle;
    }
  }

}
