import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = 'all';
  isLoading = true;

  constructor(
    private http: HttpClient, 
    private cdr: ChangeDetectorRef,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/products/categories/all').subscribe({
      next: (cats) => {
        this.categories = cats;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Erreur de récupération des categories:', err);
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.products = data; 
        this.filteredProducts = data;
        this.isLoading = false; 
        if((this as any).cdr) (this as any).cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur de récupération des produits:', err);
        this.isLoading = false; 
        if((this as any).cdr) (this as any).cdr.detectChanges();
      }
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    if (categoryId === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.categorie_id === categoryId);
    }
    if((this as any).cdr) (this as any).cdr.detectChanges();
  }

  toggleFav(product: any, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.toggleFavorite(product);
    if((this as any).cdr) (this as any).cdr.detectChanges();
  }
}
