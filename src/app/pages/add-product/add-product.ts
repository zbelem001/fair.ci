import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct implements OnInit {
  productObj: {
    title: string;
    description: string;
    price: number | null;
    price_reduit: number | null;
    stock: number;
    category_name: string;
    est_phare: boolean;
    images: string[];
  } = {
    title: '',
    description: '',
    price: null,
    price_reduit: null,
    stock: 0,
    category_name: '',
    est_phare: false,
    images: [] 
  };
  
  userId = '';
  isLoading = false;
  isUploading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const userStr = localStorage.getItem('vendorUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userId = user.user_id || user.utilisateur_id || user.id;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.isUploading = true;
      const formData = new FormData();
      
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      
      this.http.post<{urls: string[]}>('http://localhost:3000/products/upload', formData).pipe(
        finalize(() => {
          this.isUploading = false;
          this.cdr.detectChanges();
        })
      ).subscribe({
        next: (res) => {
          this.productObj.images.push(...res.urls);
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors du téléchargement des images');
        }
      });
      event.target.value = ''; // Reset l'input file
    }
  }

  removeImage(index: number) {
    this.productObj.images.splice(index, 1);
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.productObj.title || !this.productObj.price || !this.productObj.description || !this.productObj.category_name) {
      this.errorMessage = 'Veuillez remplir les champs obligatoires (Nom, Prix, Description, Catégorie).';
      return;
    }

    this.isLoading = true;
    const payload = {
      ...this.productObj,
      userId: this.userId
    };

    this.http.post('http://localhost:3000/products', payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.successMessage = 'Produit ajouté avec succès !';
        setTimeout(() => {
          this.router.navigate(['/vendor-interface']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de l\'ajout du produit.';
        console.error(err);
      }
    });
  }
}
