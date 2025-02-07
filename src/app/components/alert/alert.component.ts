import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 Importar CommonModule

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule], // 👈 Agregar CommonModule aquí
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
}
