import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './seller-dashboard.html',
  styleUrl: './seller-dashboard.scss',
})
export class SellerDashboardComponent implements OnInit {
  vendors: any[] = [];
  filteredVendors: any[] = [];
  categories: any[] = [];
  selectedCategory: string = 'all';
  isLoading = true;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products/categories/all').subscribe({
      next: (cats) => {
        this.categories = cats;
        this.loadVendors();
      },
      error: (err) => {
        console.error('Erreur récupération categories:', err);
        // Fallback categories visually if endpoint fails
        this.categories = [];
        this.loadVendors();
      }
    });
  }

  loadVendors() {
    this.isLoading = true;
    this.http.get<any[]>('http://localhost:3000/vendor/all').subscribe({
      next: (data) => {
        this.vendors = data;
        this.filteredVendors = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement vendeurs:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    if (categoryId === 'all') {
      this.filteredVendors = this.vendors;
    } else {
      // Pour l'instant on filtre tout court sans complexité 
      // ou on peut mock le filtrage (car boutique n'a pas forcement de categorie unique)
      this.filteredVendors = this.vendors;
    }
  }
}
