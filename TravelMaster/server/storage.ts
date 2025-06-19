import { users, destinations, testimonials, newsletter, type User, type InsertUser, type Destination, type InsertDestination, type Testimonial, type InsertTestimonial, type Newsletter, type InsertNewsletter } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getDestinations(): Promise<Destination[]>;
  getDestination(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private testimonials: Map<number, Testimonial>;
  private newsletters: Map<number, Newsletter>;
  private currentUserId: number;
  private currentDestinationId: number;
  private currentTestimonialId: number;
  private currentNewsletterId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.testimonials = new Map();
    this.newsletters = new Map();
    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentTestimonialId = 1;
    this.currentNewsletterId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize destinations
    const sampleDestinations: Omit<Destination, 'id'>[] = [
      {
        name: "Paris, France",
        description: "City of lights and romance, featuring iconic landmarks and world-class cuisine.",
        price: "1299.00",
        duration: "7 days",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        createdAt: new Date(),
      },
      {
        name: "Tokyo, Japan",
        description: "Modern metropolis blending ancient traditions with cutting-edge technology.",
        price: "1599.00",
        duration: "10 days",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        createdAt: new Date(),
      },
      {
        name: "Santorini, Greece",
        description: "Stunning island paradise with white-washed buildings and breathtaking sunsets.",
        price: "999.00",
        duration: "5 days",
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        createdAt: new Date(),
      },
      {
        name: "Bali, Indonesia",
        description: "Tropical paradise with pristine beaches, lush rice terraces, and rich culture.",
        price: "799.00",
        duration: "8 days",
        rating: "4.6",
        imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        createdAt: new Date(),
      },
      {
        name: "Machu Picchu, Peru",
        description: "Ancient Incan citadel perched high in the Andes mountains.",
        price: "1199.00",
        duration: "6 days",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        createdAt: new Date(),
      },
      {
        name: "Maldives",
        description: "Luxury overwater villas in crystal-clear turquoise waters.",
        price: "2499.00",
        duration: "7 days",
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        createdAt: new Date(),
      },
    ];

    sampleDestinations.forEach(destination => {
      const id = this.currentDestinationId++;
      this.destinations.set(id, { ...destination, id });
    });

    // Initialize testimonials
    const sampleTestimonials: Omit<Testimonial, 'id'>[] = [
      {
        name: "Sarah Johnson",
        text: "Wanderlust made our honeymoon in Paris absolutely magical. Every detail was perfect!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      },
      {
        name: "Michael Chen",
        text: "Amazing service and incredible destinations. The Tokyo trip exceeded all expectations!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      },
      {
        name: "Emma Williams",
        text: "Professional guides, comfortable accommodations, and unforgettable memories. Highly recommended!",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      },
      {
        name: "David Rodriguez",
        text: "The Bali adventure was incredible! Perfect blend of culture, nature, and relaxation.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        createdAt: new Date(),
      },
    ];

    sampleTestimonials.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { 
      ...insertDestination, 
      id,
      createdAt: new Date()
    };
    this.destinations.set(id, destination);
    return destination;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existing = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === insertNewsletter.email
    );
    
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const id = this.currentNewsletterId++;
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id,
      subscribedAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
}

export const storage = new MemStorage();
