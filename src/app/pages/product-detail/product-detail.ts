import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product: any = null;
  isLoading = true;
  activeImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchProduct(id);
      }
    });
  }

  fetchProduct(id: string) {
    this.isLoading = true;
    this.http.get<any>('http://localhost:3000/products/' + id).subscribe({
      next: (data) => {
        this.product = data;
        console.log("PRODUCT LOADED:", data);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement produit', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  toggleFav(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.product) {
      this.favoritesService.toggleFavorite(this.product);
      this.cdr.detectChanges();
    }
  }
}
