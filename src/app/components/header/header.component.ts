import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class HeaderComponent implements OnInit {
  userData: any;  

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('userUid');
    if (uid) {
      this.userService.getUserProfile(uid).subscribe((data) => {
        this.userData = data;
      });
    } else {
      console.error('No se encontró un UID válido');
    }
  }
}
