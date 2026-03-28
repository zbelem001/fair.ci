import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegisterVendor } from './pages/register-vendor/register-vendor';
import { Login } from './pages/login/login';
import { ProductDetail } from './pages/product-detail/product-detail';
import { ShopView } from './pages/shop-view/shop-view';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard';
import { VendorInterface } from './pages/vendor-interface/vendor-interface';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-vendor', component: RegisterVendor },
  { path: 'login', component: Login },
  { path: 'list-vendeur', component: SellerDashboardComponent },
  { path: 'vendor-interface', component: VendorInterface },
  { path: 'product/:id', component: ProductDetail },
  { path: 'shop/:id', component: ShopView },
];
