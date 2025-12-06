
// src/app/features/home/home.component.ts

import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { SearchBarComponent } from "../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    SearchBarComponent  // ← AJOUTÉ
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
