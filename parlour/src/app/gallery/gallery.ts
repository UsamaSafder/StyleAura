import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

export interface Transformation {
  id: number;
  title: string;
  before: string;
  after: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-gallery',
   imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('modalAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ])
  ]
})
export class GalleryComponent implements OnInit {
  searchTerm: string = '';
  activeFilter: string = 'all';
  selectedImage: GalleryItem | null = null;

  // Gallery Items Data
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Royal Bridal Transformation',
      category: 'Bridal Makeup',
      image: 'assets/images/gallery/bridal-1.jpg'
    },
    {
      id: 2,
      title: 'Glamorous Evening Look',
      category: 'Party Makeup',
      image: 'assets/images/gallery/party-1.jpg'
    },
    {
      id: 3,
      title: 'Elegant Hair Styling',
      category: 'Hair Styling',
      image: 'assets/images/gallery/hair-1.jpg'
    },
    {
      id: 4,
      title: 'Natural Glow Treatment',
      category: 'Skin Care',
      image: 'assets/images/gallery/skincare-1.jpg'
    },
    {
      id: 5,
      title: 'Artistic Nail Design',
      category: 'Nail Art',
      image: 'assets/images/gallery/nails-1.jpg'
    },
    {
      id: 6,
      title: 'Mehndi Special Look',
      category: 'Traditional Makeup',
      image: 'assets/images/gallery/mehndi-1.jpg'
    },
    {
      id: 7,
      title: 'Vintage Waves',
      category: 'Hair Styling',
      image: 'assets/images/gallery/hair-2.jpg'
    },
    {
      id: 8,
      title: 'Anti-Aging Facial',
      category: 'Skin Care',
      image: 'assets/images/gallery/skincare-2.jpg'
    },
    {
      id: 9,
      title: 'Bold Bridal Look',
      category: 'Bridal Makeup',
      image: 'assets/images/gallery/bridal-2.jpg'
    },
    {
      id: 10,
      title: 'Creative Nail Art',
      category: 'Nail Art',
      image: 'assets/images/gallery/nails-2.jpg'
    },
    {
      id: 11,
      title: 'Natural Makeup',
      category: 'Daily Makeup',
      image: 'assets/images/gallery/natural-1.jpg'
    },
    {
      id: 12,
      title: 'Professional Styling',
      category: 'Hair Styling',
      image: 'assets/images/gallery/hair-3.jpg'
    }
  ];

  // Transformations Data
  transformations: Transformation[] = [
    {
      id: 1,
      title: 'Bridal Makeover',
      before: 'assets/images/transformations/bridal-before.jpg',
      after: 'assets/images/transformations/bridal-after.jpg'
    },
    {
      id: 2,
      title: 'Skin Rejuvenation',
      before: 'assets/images/transformations/skin-before.jpg',
      after: 'assets/images/transformations/skin-after.jpg'
    },
    {
      id: 3,
      title: 'Hair Transformation',
      before: 'assets/images/transformations/hair-before.jpg',
      after: 'assets/images/transformations/hair-after.jpg'
    }
  ];

  // Testimonials Data
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ayesha Khan',
      text: 'Absolutely amazing service! The bridal makeup was beyond my expectations. I felt like a princess on my wedding day!',
      avatar: 'assets/images/testimonials/ayesha.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      text: 'The hair styling was perfect! Professional service and beautiful results. Highly recommend ParlourWali!',
      avatar: 'assets/images/testimonials/sara.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Fatima Ali',
      text: 'Best facial treatment in town! My skin has never looked better. The staff is so skilled and caring!',
      avatar: 'assets/images/testimonials/fatima.jpg',
      rating: 5
    }
  ];

  filteredGallery: GalleryItem[] = [];

  ngOnInit(): void {
    this.filteredGallery = [...this.galleryItems];
  }

  // Filter gallery by category
  filterGallery(category: string): void {
    this.activeFilter = category;
    
    if (category === 'all') {
      this.filteredGallery = [...this.galleryItems];
    } else {
      this.filteredGallery = this.galleryItems.filter(item => {
        switch (category) {
          case 'bridal':
            return item.category.toLowerCase().includes('bridal');
          case 'hair':
            return item.category.toLowerCase().includes('hair');
          case 'skincare':
            return item.category.toLowerCase().includes('skin');
          case 'nailart':
            return item.category.toLowerCase().includes('nail');
          case 'beforeafter':
            return item.category.toLowerCase().includes('transformation');
          default:
            return true;
        }
      });
    }

    // Apply search filter if there's a search term
    if (this.searchTerm) {
      this.applySearchFilter();
    }
  }

  // Search functionality
  onSearch(): void {
    this.applySearchFilter();
  }

  private applySearchFilter(): void {
    const baseItems = this.activeFilter === 'all' 
      ? this.galleryItems 
      : this.galleryItems.filter(item => {
          switch (this.activeFilter) {
            case 'bridal':
              return item.category.toLowerCase().includes('bridal');
            case 'hair':
              return item.category.toLowerCase().includes('hair');
            case 'skincare':
              return item.category.toLowerCase().includes('skin');
            case 'nailart':
              return item.category.toLowerCase().includes('nail');
            case 'beforeafter':
              return item.category.toLowerCase().includes('transformation');
            default:
              return true;
          }
        });

    if (this.searchTerm.trim()) {
      this.filteredGallery = baseItems.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredGallery = baseItems;
    }
  }

  // Modal functionality
  openModal(item: GalleryItem): void {
    this.selectedImage = item;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  closeModal(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Handle escape key to close modal
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.selectedImage) {
      this.closeModal();
    }
  }

  // Load more functionality (if needed for infinite scroll)
  loadMoreItems(): void {
    // Implementation for loading more gallery items
    // This can be connected to a service that fetches more data
  }

  // Share functionality
  shareImage(item: GalleryItem): void {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this amazing ${item.category} work by StyleAura!`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyToClipboard(window.location.href);
    }
  }

  private copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You can show a toast notification here
      console.log('Link copied to clipboard');
    }).catch(console.error);
  }

  // Category mapping for display
  getCategoryDisplayName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'bridal': 'Bridal Makeup',
      'hair': 'Hair Styling', 
      'skincare': 'Skin Care',
      'nailart': 'Nail Art',
      'beforeafter': 'Before & After'
    };
    return categoryMap[category] || category;
  }
}