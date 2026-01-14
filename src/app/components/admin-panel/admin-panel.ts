import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router'; // 👈 Dodano ActivatedRoute

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  trips: any[] = [];
  
  activeTab: string = 'users'; // Domyślna zakładka
  isLoading: boolean = false;
  successMessage: string = '';

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute, // 👈 Wstrzyknięcie
    private cdr: ChangeDetectorRef
  ) {
    // Sprawdzanie wiadomości z sessionStorage (np. "Dodano pielgrzymkę")
    const msg = sessionStorage.getItem('adminSuccess');
    if (msg) {
      this.successMessage = msg;
      sessionStorage.removeItem('adminSuccess');
      setTimeout(() => { 
        this.successMessage = ''; 
        this.cdr.detectChanges(); 
      }, 5000);
    }
  }

  ngOnInit() {
    // 👇 OBSŁUGA ZAKŁADEK PRZEZ URL
    // Sprawdzamy czy w adresie jest ?tab=trips
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'trips') {
        this.activeTab = 'trips';
        this.loadTrips();
      } else {
        // Domyślnie users
        this.activeTab = 'users';
        this.loadUsers();
      }
    });
  }

  switchTab(tabName: string) {
    if (this.activeTab === tabName) return;
    
    this.activeTab = tabName;
    
    // Czyścimy parametry URL przy ręcznym kliknięciu (dla estetyki)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: tabName === 'users' ? {} : { tab: 'trips' },
      queryParamsHandling: 'merge'
    });

    if (tabName === 'users') this.loadUsers();
    if (tabName === 'trips') this.loadTrips();
  }

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${user.token}` })
    };
  }

  loadUsers() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/users`, this.getHeaders()).subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        if (err.status === 401 || err.status === 403) this.router.navigate(['/']);
      }
    });
  }

  loadTrips() {
    this.isLoading = true;
    this.http.get<any[]>(`${this.apiUrl}/trips`, this.getHeaders()).subscribe({
      next: (data) => {
        this.trips = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}