import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-vendor',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register-vendor.html',
  styleUrl: './register-vendor.scss',
})
export class RegisterVendor {
  vendorObj = {
    name: '',
    businessPhone: '',
    email: '',
    storeName: '',
    city: '',
    description: '',
    password: '',
    confirmPassword: ''
  };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.vendorObj.password !== this.vendorObj.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    if(!this.vendorObj.name || !this.vendorObj.businessPhone || !this.vendorObj.storeName || !this.vendorObj.password) {
      this.errorMessage = 'Veuillez remplir les champs obligatoires (Nom, WhatsApp, Boutique, Mot de passe).';
      return;
    }

    this.isLoading = true;
    this.http.post('http://localhost:3000/auth/vendor/register', this.vendorObj).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        if(res.success) {
          this.successMessage = 'Compte créé avec succès ! Redirection automatique...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Une erreur s'est produite lors de l'inscription.";
      }
    });
  }
}
