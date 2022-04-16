import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-board-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  content = '';
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.getItems().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}