import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegisterVendor } from './pages/register-vendor/register-vendor';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-vendor', component: RegisterVendor },
  { path: 'login', component: Login },
];
