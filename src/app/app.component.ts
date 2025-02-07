import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchComponent,  RouterOutlet],
  template: `
    <app-header></app-header>
    
    <app-search></app-search>
    
    
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Santander app';
  results = []; // De momento vacío, se debe llenar desde SearchComponent
}
