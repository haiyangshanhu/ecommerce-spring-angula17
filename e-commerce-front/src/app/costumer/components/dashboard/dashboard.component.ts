import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

import { FilterProductPipe } from '../../../admin/pipes/filter-product.pipe';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FilterProductPipe,
    FormsModule,
    MatButton,
    MatCard,
    MatDivider,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected filterName = '';
  private customerService = inject(CustomerService);
  protected products = this.customerService.listProducts;
  private destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);

  addToCart(productId: number) {}
}
