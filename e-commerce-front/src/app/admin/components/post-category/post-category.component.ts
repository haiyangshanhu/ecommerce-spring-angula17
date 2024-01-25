import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatButton,
  ],
  templateUrl: './post-category.component.html',
  styleUrl: './post-category.component.scss',
})
export class PostCategoryComponent {
  protected readonly adminService = inject(AdminService);
  protected readonly formBuilder = inject(FormBuilder);

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
  });

  protected readonly router = inject(Router);
  protected readonly snackBar = inject(MatSnackBar);

  addCategory(): void {
    if (this.categoryForm.valid) {
      this.adminService
        .createCategory$(this.categoryForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/dashboard']).then(() => {
              this.snackBar.open('Category saved successfully', 'close', {
                duration: 3000,
                panelClass: 'success-snackbar',
              });
            });
          },
          error: err => {
            this.snackBar.open(err.message, 'close', {
              duration: 3000,
              panelClass: 'error-snackbar',
            });
            console.log(err);
          },
        });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}
