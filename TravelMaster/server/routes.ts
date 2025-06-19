import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDestinationSchema, insertTestimonialSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all destinations
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Get destination by ID
  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid destination ID" });
      }
      
      const destination = await storage.getDestination(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Create new destination
  app.post("/api/destinations", async (req, res) => {
    try {
      const validatedData = insertDestinationSchema.parse(req.body);
      const destination = await storage.createDestination(validatedData);
      res.status(201).json(destination);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid destination data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create destination" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Create new testimonial
  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid testimonial data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.subscribeNewsletter(validatedData);
      res.status(201).json({ message: "Successfully subscribed to newsletter", subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email address", errors: error.errors });
      }
      if (error instanceof Error && error.message === "Email already subscribed") {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Get newsletter subscriptions
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch newsletter subscriptions" });
    }
  });

  // Search functionality
  app.get("/api/search", async (req, res) => {
    try {
      const { destination, date, type } = req.query;
      
      // For now, return all destinations
      // In a real app, you would filter based on search criteria
      const destinations = await storage.getDestinations();
      
      res.json({
        results: destinations,
        query: { destination, date, type }
      });
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  });

  // Statistics endpoint
  app.get("/api/statistics", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      const testimonials = await storage.getTestimonials();
      const newsletters = await storage.getNewsletterSubscriptions();
      
      const stats = {
        happyCustomers: 50000,
        destinations: destinations.length,
        yearsExperience: 15,
        awards: 25,
        totalBookings: 125000,
        customerSatisfaction: 98.5
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
