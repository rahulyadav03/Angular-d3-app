import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export default class UserComponent implements OnInit {

  users: any = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllUsers().subscribe((data) => {
      this.users = data;
    }); 
  }

  fnGoToUserDetail(id) {
    this.router.navigate(['/details', id]);
  }

}
