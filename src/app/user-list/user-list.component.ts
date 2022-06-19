import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { User, Users, UserStatus } from '../models/user.model';
import * as moment from 'moment';
import { MatPaginator } from '@angular/material';


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
    public limit = 50;
    public pageOptions = [50, 100, 200];
    public total = 0;

    constructor(
        private usersService: UsersService
    ) {
        this.getUsersByPage(1, this.limit);
        this.getStatuses();
    }

    ngOnInit(): void {
    }

    private getUsersByPage(page, limit) {
        this.usersService.getListByPage({page, limit}).subscribe((users: any) => {
            console.log('aqui3', users);
            if (!!users) {
                this.isLoading = false;
                this.users = users.data.users;
                this.total = users.data.count;
            }
        });
    }

    private getStatuses() {
        this.usersService.getStatuses().subscribe((statuses: any) => {
            console.log('aqui2', statuses);
            if (!!statuses) {
                this.statuses = statuses.data;
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
        if (event.pageSize !== this.limit) {
            // const pageIndex = event.pageIndex !== 0 ? 0 : event.pageIndex
            this.getUsersByPage(0, event.pageSize);
        } else {
            this.getUsersByPage(event.pageIndex, this.limit);
        }
    }

}