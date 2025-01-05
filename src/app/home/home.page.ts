import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../service/localStorage.service';
//ui
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogElementsExample, DialogElementsExampleDialog } from 'src/components/modal/modal.component';

interface ShoppingItem {
  name: string;
  price: number;
  quantity: number;
  purchased: boolean;
  discount: number;
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
    DialogElementsExample,
  ],
})

export class ShoppingListComponent  {
  items: ShoppingItem[] = [];
  total: number = 0;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.loadItems();
  }

  saveItems() {
    this.localStorageService.setItem('shoppingList', this.items);
  }
  clearList() {
    this.items = [];
    console.log(this.items);
    this.localStorageService.removeItem('shoppingList');
    this.calculateTotal();
  }
  clearElement(index: number) {
    this.items.splice(index, 1);
    this.saveItems();
    this.calculateTotal();
  }
  loadItems() {
    const storedItems = this.localStorageService.getItem<any[]>('shoppingList');
    if (storedItems) {
      this.items = storedItems;
      this.calculateTotal();
    }
  }

  addItem(name: string, price: number, quantity: number, discount: number) {
    const parsedDiscount = +discount || 0; // Asegúrate de que el descuento sea un número válido
    this.items.push({ name, price, quantity, purchased: false,  discount: parsedDiscount });
    this.saveItems();
    this.calculateTotal();
  }

  togglePurchased(item: ShoppingItem) {
    item.purchased = !item.purchased;
    this.saveItems();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
      if (item.purchased) {
        const discountMultiplier = (100 - item.discount) / 100;
        return sum + item.price * item.quantity * discountMultiplier;
      }
      return sum;
    }, 0);
  }

}
