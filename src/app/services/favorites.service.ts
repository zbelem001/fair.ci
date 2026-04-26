import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  produit_id: string;
  nom_produit: string;
  description: string;
  prix?: number | string;
  prix_base?: number | string;
  prix_promo?: number | string;
  prix_promor?: number | string;   
  en_promotion: boolean;
  stock: number;
  categorie_id: string;
  image_url: string;
  est_nouveau?: boolean;
  tag_promo?: string;
  id?: string;
  images?: string[];
  nom?: string;
  prix_unitaire?: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _favorites = signal<Product[]>([]);
  public favorites = this._favorites.asReadonly();
  public count = computed(() => this._favorites().length);

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const saved = localStorage.getItem('fair_ci_favorites');
    if (saved) {
      try {
        this._favorites.set(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e);
      }
    }
  }

  private saveFavorites() {
    localStorage.setItem('fair_ci_favorites', JSON.stringify(this._favorites()));
  }

  private getProductId(product: any): string {
    return product.produit_id || product.id || product.nom_produit;
  }

  toggleFavorite(product: Product) {
    const current = this._favorites();
    const pId = this.getProductId(product);
    const index = current.findIndex(p => this.getProductId(p) === pId);

    if (index > -1) {
      // Remove
      this._favorites.update(favs => {
        const newFavs = [...favs];
        newFavs.splice(index, 1);
        return newFavs;
      });
    } else {
      // Add
      this._favorites.update(favs => [...favs, product]);
    }
    
    this.saveFavorites();
  }

  isFavorite(product: Product): boolean {
    const pId = this.getProductId(product);
    return this._favorites().some(p => this.getProductId(p) === pId);
  }

  clearFavorites() {
    this._favorites.set([]);
    this.saveFavorites();
  }
}
