import { Component, ChangeDetectorRef, OnInit, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService, Product } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  favorites: Product[] = [];

  constructor(
    public favoritesService: FavoritesService,
    private cdr: ChangeDetectorRef
  ) {
    effect(() => {
      this.favorites = this.favoritesService.favorites();
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.favorites = this.favoritesService.favorites();
  }

  removeFavorite(product: Product, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.toggleFavorite(product);
  }
}
