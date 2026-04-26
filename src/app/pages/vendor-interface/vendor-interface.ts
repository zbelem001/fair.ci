import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vendor-interface',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  templateUrl: './vendor-interface.html',
  styleUrl: './vendor-interface.scss',
})
export class VendorInterface implements OnInit {
  vendorName = 'Mon Compte';
  vendorId = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const userStr = localStorage.getItem('vendorUser');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    const user = JSON.parse(userStr);
    
    // Fallback if the user object format is different than expected
    if (user.user) {
       this.vendorId = user.user.id || user.user.user_id || user.user.utilisateur_id || 'N/A';
       this.vendorName = user.user.nom_complet || user.user.nom_boutique || user.user.nom || 'Mon Compte';
    } else {
       this.vendorId = user.id || user.user_id || user.utilisateur_id || 'N/A';
       this.vendorName = user.nom_complet || user.nom_boutique || user.nom || 'Mon Compte';
    }
  }

  logout() {
    localStorage.removeItem('vendorUser');
    this.router.navigate(['/login']);
  }
}
