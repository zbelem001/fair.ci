import { finalize } from 'rxjs/operators';
import { RouterLink, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './vendor-dashboard.html',
  styleUrl: './vendor-dashboard.scss',
})
export class VendorDashboard implements OnInit {
  products: any[] = [];
  isLoading = true;
  
  userId = '';
  vendorName = '';
  vendorDesc = '';
  vendorWhatsapp = '';
  vendorCity = '';
  vendorLogo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuABurk6cupZWAxO3oDNMwRMFhfiDU4uoUkj4pJAzriTC_t_61jfqTU6Ghaqy2ZjT6WQdpARbP7Ec8qf21UUbTSqVFQnegXqbQOjSIYFH7xE9MNEOBY85dEATFA7DXC6HaJXRdD_ij4lSp-SHdb3MLGy6VG6fqI6eBj5xx1eM8sAyrYuS9zQEL7h0AlmAFy6S7XWJt7oEazEyayW6pQkmmLpymz3f2hRvboFOi-kYyOrEewHMoJRHU4d_JvnsjhT3tcdqO7laKVO73o';
  vendorBanner = '';
  
  isUploadingLogo = false;
  isUploadingBanner = false;
  isSaving = false;
  
  totalViews = 0;
  activeLeads = 0;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const userStr = localStorage.getItem('vendorUser');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userStr);
    this.userId = user.utilisateur_id || user.id || user.user_id;

    // Load full profile from server to get accurate data
    this.http.get<any>(`http://localhost:3000/vendor/profile/${this.userId}`).subscribe({
      next: (profile) => {
        this.vendorName = profile.nom_boutique || '';
        this.vendorDesc = profile.description || '';
        this.vendorWhatsapp = profile.telephone_pro || '';
        this.vendorCity = profile.ville || '';
        if (profile.logo_url) this.vendorLogo = profile.logo_url;
        if (profile.banniere_url) this.vendorBanner = profile.banniere_url;
        this.cdr.detectChanges();
      },
      error: (err) => console.log('Profil non trouvé au chargement', err)
    });

    this.http.get<any[]>(`http://localhost:3000/products/vendor/${this.userId}`).subscribe({
      next: (data) => {
        this.products = data;
        this.totalViews = data.length * 15;
        this.activeLeads = data.length * 2;
        this.isLoading = false; 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur', err);
        this.isLoading = false; 
        this.cdr.detectChanges();
      }
    });
  }

  onLogoSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploadingLogo = true;
      const formData = new FormData();
      formData.append('file', file);

      this.http.post<any>('http://localhost:3000/products/upload-single', formData).pipe(
        finalize(() => {
          this.isUploadingLogo = false;
          this.cdr.detectChanges();
          event.target.value = '';
        })
      ).subscribe({
        next: (res) => {
           if(res.url) this.vendorLogo = res.url;
        },
        error: (err) => {
           console.error("Erreur upload logo", err); 
           alert("Erreur: "+ err.message);
        }
      });
    }
  }

  onBannerSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploadingBanner = true;
      const formData = new FormData();
      formData.append('file', file);

      this.http.post<any>('http://localhost:3000/products/upload-single', formData).pipe(
        finalize(() => {
          this.isUploadingBanner = false;
          this.cdr.detectChanges();
          event.target.value = '';
        })
      ).subscribe({
        next: (res) => {
           if(res.url) this.vendorBanner = res.url;
        },
        error: (err) => {
           console.error("Erreur upload banner", err); 
           alert("Erreur: "+ err.message);
        }
      });
    }
  }

  triggerLogoInput() {
    document.getElementById('logoInput')?.click();
  }

  triggerBannerInput() {
    document.getElementById('bannerInput')?.click();
  }

  saveProfile() {
    this.isSaving = true;
    const body = {
      nom_boutique: this.vendorName,
      description: this.vendorDesc,
      telephone_pro: this.vendorWhatsapp,
      ville: this.vendorCity,
      logo_url: this.vendorLogo !== 'https://lh3.googleusercontent.com/aida-public/AB6AXuABurk6cupZWAxO3oDNMwRMFhfiDU4uoUkj4pJAzriTC_t_61jfqTU6Ghaqy2ZjT6WQdpARbP7Ec8qf21UUbTSqVFQnegXqbQOjSIYFH7xE9MNEOBY85dEATFA7DXC6HaJXRdD_ij4lSp-SHdb3MLGy6VG6fqI6eBj5xx1eM8sAyrYuS9zQEL7h0AlmAFy6S7XWJt7oEazEyayW6pQkmmLpymz3f2hRvboFOi-kYyOrEewHMoJRHU4d_JvnsjhT3tcdqO7laKVO73o' ? this.vendorLogo : null,
      banniere_url: this.vendorBanner
    };

    this.http.put(`http://localhost:3000/vendor/profile/${this.userId}`, body).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
         alert("Profil mis à jour avec succès !");
      },
      error: (err) => {
         console.error(err);
         alert("Erreur lors de la mise à jour du profil.");
      }
    });
  }

  deleteProduct(productId: string) {
    if(confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
       this.http.delete(`http://localhost:3000/products/${productId}`).subscribe({
         next: () => {
           this.products = this.products.filter(p => p.id !== productId);
         },
         error: (err) => console.error("Erreur suppression", err)
       })
    }
  }
}
