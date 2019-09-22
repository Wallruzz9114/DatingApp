import { AlertifyService } from './../../services/alertify/alertify.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelregister: EventEmitter<{}> = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertifyService: AlertifyService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      alias: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      gender: ['male'],
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authenticationService.register(this.user).subscribe(() => {
        this.alertifyService.success('Registration successful');
      }, error => {
        this.alertifyService.error('Problem registering user!');
      }, () => {
        this.authenticationService.login(this.user).subscribe(() => {
          this.router.navigate(['/people']);
        });
      });
    }
  }

  cancel() {
    this.cancelregister.emit(false);
  }

}
