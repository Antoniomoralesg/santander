import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ResultsComponent {
  @Input() results: Person[] = [];
}