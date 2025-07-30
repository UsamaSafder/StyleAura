// booking.component.ts
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface BookingData {
  date: string;
  time: string;
  name: string;
  phone: string;
  services: string[];
}

@Component({
  selector: 'app-booking',
  standalone: true, // ✅ Required for standalone components
  imports: [CommonModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  // selectedDate: string = '';
  // selectedTime: string = '';
  // customerName: string = '';
  // customerPhone: string = '';
  // selectedServices: string[] = [];
  
  // currentMonth: number = 6; // July (0-indexed)
  // currentYear: number = 2025;
  
  // monthNames: string[] = [
  //   'January', 'February', 'March', 'April', 'May', 'June',
  //   'July', 'August', 'September', 'October', 'November', 'December'
  // ];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  calendarDays: any[] = [];
  selectedDate: string = '';
  selectedTime: string = '';
  customerName: string = '';
  customerPhone: string = '';
  selectedServices: string[] = [];

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // services: string[] = [
  //   'Party Makeup',
  //   'Bridal Makeup',
  //   'Manicure Pedicure',
  //   'Haircut',
  //   'Mehendi Art',
  //   'Hydra Facial',
  //   'Hair Coloring',
  //   'Threading',
  //   'Waxing',
  //   'Nail Art',
  //   'Hair Styling',
  //   'Body Massage',
  //   'Skin Polish',
  //   'Makeover',
  //   'Facial Bleach'
  // ];

  servicesListLeft = [
    { id: 'service1', name: 'Party Makeup', selected: false },
    { id: 'service2', name: 'Bridal Makeup', selected: false },
    { id: 'service3', name: 'Manicure Pedicure', selected: false },
    { id: 'service4', name: 'Haircut', selected: false },
    { id: 'service5', name: 'Mehendi Art', selected: false },
    { id: 'service6', name: 'Hydra Facial', selected: false },
    { id: 'service7', name: 'Hair Coloring', selected: false },
    { id: 'service8', name: 'Threading', selected: false }
  ];

  servicesListRight = [
    { id: 'service9', name: 'Waxing', selected: false },
    { id: 'service10', name: 'Nail Art', selected: false },
    { id: 'service11', name: 'Hair Styling', selected: false },
    { id: 'service12', name: 'Body Massage', selected: false },
    { id: 'service13', name: 'Skin Polish', selected: false },
    { id: 'service14', name: 'Makeover', selected: false },
    { id: 'service15', name: 'Facial Bleach', selected: false }
  ];


  

  timeSlots: string[] = [
    '10:00 am', '11:00 am', '12:00 pm', '1:00 pm',
    '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm',
    '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm'
  ];

  isLoading: boolean = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

   generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];

    // Headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      this.calendarDays.push({ day: day, isHeader: true });
    });

    // 6 weeks (6x7 = 42 cells)
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // normalize

      const isoDate = currentDate.toISOString().split('T')[0];

      this.calendarDays.push({
        day: currentDate.getDate(),
        date: isoDate,
        isHeader: false,
        isCurrentMonth: currentDate.getMonth() === this.currentMonth,
        isPastDate: currentDate < today,
        isSelected: isoDate === this.selectedDate
      });
    }
  }

  selectDate(day: any): void {
    if (day.isHeader || day.isPastDate || !day.isCurrentMonth) return;
    this.selectedDate = day.date;
    this.generateCalendar(); // re-render
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  getCurrentMonthName(): string {
    return `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  }

  validateForm(): boolean {
  const nameValid = !!(this.customerName && this.customerName.trim() !== '');
  const phoneValid = !!(this.customerPhone && this.customerPhone.trim() !== '');

  const servicesSelected =
    this.servicesListLeft.some(s => s.selected) ||
    this.servicesListRight.some(s => s.selected);

  return nameValid && phoneValid && servicesSelected;
}



  get timeSlotsLeft(): string[] {
    return this.timeSlots.filter((_, i) => i % 2 === 0);
  }

  get timeSlotsRight(): string[] {
    return this.timeSlots.filter((_, i) => i % 2 !== 0);
  }

  selectTime(time: string): void {
    this.selectedTime = time;
  }

  getSelectedServices(): string[] {
    return [
      ...this.servicesListLeft.filter(s => s.selected).map(s => s.name),
      ...this.servicesListRight.filter(s => s.selected).map(s => s.name)
    ];
  }

  confirmBooking(): void {
  if (!this.validateForm()) {
    alert('Please fill all required fields and select at least one service.');
    return;
  }

  this.isLoading = true;

  const bookingData: BookingData = {
    date: this.selectedDate,
    time: this.selectedTime,
    name: this.customerName.trim(),
    phone: this.customerPhone.trim(),
    services: this.getSelectedServices()
  };

  this.bookingService.createBooking(bookingData).subscribe({
    next: (response) => {
      alert('Booking confirmed successfully!');
      this.resetForm();
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Booking error:', error);
      alert('Failed to confirm booking. Please try again.');
      this.isLoading = false;
    }
  });
}

 resetForm(): void {
    this.selectedDate = '';
    this.selectedTime = '';
    this.customerName = '';
    this.customerPhone = '';
    this.servicesListLeft.forEach(s => s.selected = false);
    this.servicesListRight.forEach(s => s.selected = false);
    this.generateCalendar();
  }

}