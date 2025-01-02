import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';

interface ShoppingItem {
  name: string;
  price: number;
  quantity: number;
  purchased: boolean;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
  ],
})
export class ShoppingListComponent {
  items: ShoppingItem[] = [];
  total: number = 0;

  addItem(name: string, price: number, quantity: number) {
    this.items.push({ name, price, quantity, purchased: false });
    this.calculateTotal();
  }

  togglePurchased(item: ShoppingItem) {
    item.purchased = !item.purchased;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => 
      sum + (item.purchased ? item.price * item.quantity : 0), 0);
  }
}
