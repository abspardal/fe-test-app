import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewEmailValidator } from '../validators/email.validator';
import { UsernameValidator } from '../validators/username.validator';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'exads-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

    public form: FormGroup;
    public isLoading = false;

    constructor(
        private usersService: UsersService,
        private formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {
        this.form = this.formBuilder.group({
            username: ["", Validators.required], //UsernameValidator
            firstName: ["", Validators.required],
            lastName: [""],
            email: ["", [Validators.required, NewEmailValidator]]
        })
    }

    ngOnInit(): void {
    }

    public submit() {
        if (!!this.form.valid) {
            this.isLoading = true;
            const user = {
                first_name: this.form.get('firstName').value,
                last_name: this.form.get('lastName').value,
                username: this.username.value,
                email: this.email.value,
                id_status: 1
            }
            this.usersService.create({user: user}).subscribe((response: any) => {
                if (!!response){
                    this.isLoading = false;
                    this.router.navigate(['/users']);
                    this.showToastr();
                }
            })
        }
    }

    public validateUsername() {
        if (!!this.username.valid) {
            this.isLoading = true;
        
            this.usersService.validateUsername(this.username.value).subscribe((response: any) => {
                if (!!response){
                    this.isLoading = false;
                    !!response.data.users.length 
                        ? this.form.get('username').setErrors({'invalid': true})
                        : this.form.get('username').setErrors(null)
                }
            });
        }
    }

    private showToastr() {
        this._snackBar.open('User created with success', 'Ok', {duration: 5000})
    }

    get username() {
        return this.form.get('username');
    }

    get email() {
        return this.form.get('email');
    }
}