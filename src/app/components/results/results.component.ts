import { Component, Input } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { CommonModule } from '@angular/common';

interface SearchResult {
  code: string;
  name: string;
  document: string;
  clientType: string;
}

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  imports: [AlertComponent, CommonModule],
})
export class ResultsComponent {
  @Input() results: SearchResult[] = [];
}
