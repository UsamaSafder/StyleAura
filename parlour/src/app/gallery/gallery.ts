import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';
interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

interface Transformation {
  id: number;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule, Footer, RouterOutlet],
  templateUrl: './gallery.html',
  styleUrls: ['./gallery.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  // Theme
  isDarkMode = false;
  
  // Search and Filter
  searchTerm = '';
  activeCategory = 'all';
  
  // Gallery Data
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Royal Bridal Transformation',
      category: 'Bridal Makeup',
      image: 'galleryBridal.jpg',
      description: 'A stunning bridal makeover featuring traditional elements with a modern twist.'
    },
    {
      id: 2,
      title: 'Glamorous Evening Look',
      category: 'Party Makeup',
      image: 'galleryParty.jpg',
      description: 'Perfect evening glamour for special occasions and parties.'
    },
    {
      id: 3,
      title: 'Elegant Hair Styling',
      category: 'Hair Styling',
      image: 'hairstyle.jpg',
      description: 'Sophisticated updo perfect for formal events and weddings.'
    },
    {
      id: 4,
      title: 'Natural Glow Treatment',
      category: 'Skin Care',
      image: 'skin.jpg',
      description: 'Rejuvenating facial treatment for a natural, healthy glow.'
    },
    {
      id: 5,
      title: 'Artistic Nail Design',
      category: 'Nail Art',
      image: 'nail.jpg',
      description: 'Creative nail art featuring intricate designs and patterns.'
    },
    {
      id: 6,
      title: 'Mehndi Special Look',
      category: 'Traditional Makeup',
      image: 'mehndi.jpg',
      description: 'Traditional Pakistani bridal look for mehndi ceremonies.'
    },
    {
      id: 7,
      title: 'Party Ready Look',
      category: 'Party Makeup',
      image: 'party.jpg',
      description: 'Perfect party makeup for special occasions.'
    },
    {
      id: 8,
      title: 'Ready to Shine',
      category: 'Bridal Makeup',
      image: 'readytoshine.jpg',
      description: 'Complete makeover for your special day.'
    }
  ];

  categories: Category[] = [
    { id: 'all', name: 'All Works' },
    { id: 'bridal', name: 'Bridal Makeup' },
    { id: 'hair', name: 'Hair Styling' },
    { id: 'skincare', name: 'Skin Care' },
    { id: 'nails', name: 'Nail Art' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'party', name: 'Party Makeup' }
  ];

  transformations: Transformation[] = [
    {
      id: 1,
      title: 'Bridal Makeover',
      beforeImage: 'normal.jpg',
      afterImage: 'ready2.jpg',
      description: 'Complete bridal transformation featuring traditional Pakistani bridal makeup with modern techniques.'
    },
    {
      id: 2,
      title: 'Party Ready Transformation',
      beforeImage: 'normal.jpg',
      afterImage: 'ready2.jpg',
      description: 'Amazing party makeup transformation for special occasions.'
    },
    {
      id: 3,
      title: 'Complete Makeover',
      beforeImage: 'normal.jpg',
      afterImage: 'party.jpg',
      description: 'Complete makeover including makeup and styling for a fresh new look.'
    }
  ];

  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ayesha Khan',
      text: 'Absolutely amazing service! The bridal makeover was beyond my expectations. I felt like a princess on my wedding day!',
      avatar: 'bridal.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'Sara Ahmed',
      text: 'The hair styling was perfect! Professional service and beautiful results. Highly recommend StyleAura!',
      avatar: 'hairstyle.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Fatima Ali',
      text: 'Best facial treatment in town! My skin has never looked better. The staff is so skilled and caring.',
      avatar: 'skin.jpg',
      rating: 5
    }
  ];

  // Filtered and display data
  filteredGalleryItems: GalleryItem[] = [];
  currentTestimonial = 0;
  testimonialInterval: any;

  // Modal states
  showModal = false;
  showTransformationModal = false;
  selectedItem: GalleryItem | null = null;
  selectedTransformation: Transformation | null = null;

  constructor() { }

  ngOnInit(): void {
    this.filteredGalleryItems = [...this.galleryItems];
    this.startTestimonialRotation();
    this.loadThemePreference();
  }

  ngOnDestroy(): void {
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
  }

  // Theme Management
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.saveThemePreference();
  }

  private loadThemePreference(): void {
    const savedTheme = localStorage.getItem('styleaura-theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  private saveThemePreference(): void {
    localStorage.setItem('styleaura-theme', this.isDarkMode ? 'dark' : 'light');
  }

  // Search and Filter Functions
  onSearchChange(event?: Event): void {
    this.filterGallery();
  }

  performSearch(): void {
    this.filterGallery();
  }

  filterByCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    this.filterGallery();
  }

  private filterGallery(): void {
    let filtered = [...this.galleryItems];

    // Filter by category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(item => {
        const category = item.category.toLowerCase().replace(/\s+/g, '');
        return category.includes(this.activeCategory) || 
               this.activeCategory === 'bridal' && category.includes('bridal') ||
               this.activeCategory === 'hair' && category.includes('hair') ||
               this.activeCategory === 'skincare' && category.includes('skin') ||
               this.activeCategory === 'nails' && category.includes('nail') ||
               this.activeCategory === 'traditional' && category.includes('traditional') ||
               this.activeCategory === 'party' && category.includes('party');
      });
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredGalleryItems = filtered;
  }

  // Modal Functions
  openModal(item: GalleryItem): void {
    this.selectedItem = item;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedItem = null;
    document.body.style.overflow = 'auto';
  }

  openTransformationModal(transformation: Transformation): void {
    this.selectedTransformation = transformation;
    this.showTransformationModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeTransformationModal(): void {
    this.showTransformationModal = false;
    this.selectedTransformation = null;
    document.body.style.overflow = 'auto';
  }

  // Testimonial Functions
  private startTestimonialRotation(): void {
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  setCurrentTestimonial(index: number): void {
    this.currentTestimonial = index;
    // Reset the interval
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
      this.startTestimonialRotation();
    }
  }

  // Utility Functions
  trackByFn(index: number, item: GalleryItem): number {
    return item.id;
  }

  // Sample data for development - replace with actual image paths
  private initializeSampleImages(): void {
    // This method can be used to set placeholder images during development
    const placeholderBase = 'https://picsum.photos';
    
    this.galleryItems.forEach((item, index) => {
      if (!item.image.startsWith('http')) {
        item.image = `${placeholderBase}/400/350?random=${index + 1}`;
      }
    });

    this.transformations.forEach((item, index) => {
      if (!item.beforeImage.startsWith('http')) {
        item.beforeImage = `${placeholderBase}/300/200?random=${index + 10}`;
        item.afterImage = `${placeholderBase}/300/200?random=${index + 20}`;
      }
    });

    this.testimonials.forEach((item, index) => {
      if (!item.avatar.startsWith('http')) {
        item.avatar = `${placeholderBase}/100/100?random=${index + 30}`;
      }
    });
  }

  // Animation and UI Enhancement Functions
  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.opacity = '1';
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Set a placeholder image if the original fails to load
    img.src = 'assets/images/placeholder.jpg';
  }

  // Smooth scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Analytics tracking (optional)
  trackGalleryItemView(item: GalleryItem): void {
    // Add analytics tracking here if needed
    console.log(`Gallery item viewed: ${item.title}`);
  }

  trackFilterUsage(category: string): void {
    // Add analytics tracking here if needed
    console.log(`Filter used: ${category}`);
  }
}