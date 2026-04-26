import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginObj = {
    emailOrSiret: '',
    password: ''
  };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    
    if(!this.loginObj.emailOrSiret || !this.loginObj.password) {
      this.errorMessage = 'Veuillez renseigner votre email/téléphone et mot de passe.';
      return;
    }

    this.isLoading = true;
    this.http.post('http://localhost:3000/auth/vendor/login', this.loginObj).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if(res.success) {
          this.successMessage = 'Connexion réussie ! Redirection automatique...';
          localStorage.setItem('vendorUser', JSON.stringify(res));
          setTimeout(() => {
            this.router.navigate(['/vendor-interface']);
          }, 2000);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Identifiants incorrects.";
      }
    });
  }
}
