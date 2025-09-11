import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})

export class Header {
 menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}