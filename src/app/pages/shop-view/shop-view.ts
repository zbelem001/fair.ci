import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-view',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule],
  templateUrl: './shop-view.html',
  styleUrl: './shop-view.scss',
})
export class ShopView implements OnInit {
  products: any[] = [];
  shop: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchShopDetails(id);
      }
    });
  }

  fetchShopDetails(boutiqueId: string) {
    this.isLoading = true;
    this.http.get<any>(`http://localhost:3000/products/shop/${boutiqueId}`).subscribe({
      next: (data) => {
        this.shop = data.shop;
        this.products = data.products || [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la boutique', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
