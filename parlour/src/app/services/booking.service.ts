// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  services: string[];
}

interface BookingResponse {
  message?: string;
  error?: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'https://hmftj.com/interns/api/booking.php'; // Replace with your actual API URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Create a new booking
  createBooking(bookingData: BookingData): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(this.apiUrl, bookingData, this.httpOptions);
  }

  // Get all bookings (optional - for admin panel)
  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get booking by ID (optional)
  getBookingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

  // Update booking (optional)
  updateBooking(id: number, bookingData: Partial<BookingData>): Observable<BookingResponse> {
    const updateData = { id, ...bookingData };
    return this.http.put<BookingResponse>(this.apiUrl, updateData, this.httpOptions);
  }

  // Delete booking (optional)
  deleteBooking(id: number): Observable<BookingResponse> {
    return this.http.delete<BookingResponse>(`${this.apiUrl}?id=${id}`);
  }

  // Check availability for a specific date and time (optional)
  checkAvailability(date: string, time: string): Observable<{available: boolean}> {
    return this.http.get<{available: boolean}>(`${this.apiUrl}?check_availability=1&date=${date}&time=${time}`);
  }
}