import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {

  }
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  validateForm() {
    if (true) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo debe tener un valor de nombre');
      return false;
    }
    else if (true) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo debe tener un valor de...');
      return false;
    }
    else if (true) {
      // Si no se cumple la condicion...
      alert('[ERROR] El campo debe tener un valor de...');
      return false;
    }
    return true;
  }
  signUp() {
    console.log(this.user)
    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      )
  }

}
