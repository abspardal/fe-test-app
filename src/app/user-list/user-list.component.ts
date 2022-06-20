import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User, Users, UserStatus } from '../models/user.model';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'exads-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    public users: User[] = [];
    public statuses: UserStatus[] = [];
    public isLoading = true;
    public displayedColumns: string[] = ['username', 'name', 'email', 'status', 'date'];
    public limit = 20;
    public pageOptions = [20, 50, 100];
    public total = 0;

    constructor(
        private usersService: UsersService
    ) {
        combineLatest([
            this.usersService.getListByPage({page: 0, limit: this.limit}),
            this.usersService.getStatuses()
        ]).subscribe(([users, statuses]: any) => {
            if (!!users && !!statuses) {
                this.isLoading = false;
                this.statuses = statuses.data;
                this.users = users.data.users;
                this.total = users.data.count;
            }
        });
    }

    ngOnInit(): void {
    }

    private getUsersByPage(page, limit) {
        this.usersService.getListByPage({page, limit}).subscribe((users: any) => {
            if (!!users) {
                this.isLoading = false;
                this.users = users.data.users;
                this.total = users.data.count;
            }
        });
    }

    public getStatus(statusId) {
        return this.statuses.find(el => el.id === statusId);
    }

    public getDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    public getNextUsers(event) {
        this.isLoading = true;
        this.limit = event.pageSize
        this.getUsersByPage(event.pageIndex, event.pageSize);
    }

}