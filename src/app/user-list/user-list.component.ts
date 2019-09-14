import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export default class UserListComponent implements OnInit {
  id: number;
  userDetail: any = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
   this.dataService.getSelectedUsers(this.id).subscribe((data) => {
      this.userDetail = data;
    });
  }

}
