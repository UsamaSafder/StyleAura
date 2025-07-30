import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admindashboard.html',
  styleUrls: ['./admindashboard.css'],
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent implements OnInit {
  bookings: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        console.log('Bookings fetched:', data);
        this.bookings = data.map((booking: any) => ({
          ...booking,
          services: this.parseServices(booking.services)
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch bookings';
        this.loading = false;
      }
    });
  }

  parseServices(services: any): string[] {
    // If already an array, return as is
    if (Array.isArray(services)) return services;

    try {
      const parsed = JSON.parse(services);
      return Array.isArray(parsed)
        ? parsed
        : typeof parsed === 'string'
        ? parsed.split(',').map(s => s.trim())
        : [];
    } catch {
      return typeof services === 'string'
        ? services.split(',').map(s => s.trim())
        : [];
    }
  }
}
