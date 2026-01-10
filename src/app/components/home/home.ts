import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero'; // Zaimportuj Hero
import { FeaturedListsComponent } from '../featured-lists/featured-lists'; // Zaimportuj Listy

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturedListsComponent], // <--- Dodaj je tutaj
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {}