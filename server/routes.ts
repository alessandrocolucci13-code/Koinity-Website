import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProposalSchema, contactFormSchema, demoRequestSchema, ambassadorFormSchema, newsletterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/proposals", async (_req, res) => {
    try {
      const proposals = await storage.getAllProposals();
      res.json(proposals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch proposals" });
    }
  });

  app.post("/api/proposals", async (req, res) => {
    try {
      const validatedData = insertProposalSchema.parse(req.body);
      const proposal = await storage.createProposal(validatedData);
      res.status(201).json(proposal);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid proposal data" });
      }
    }
  });

  app.patch("/api/proposals/:id/vote", async (req, res) => {
    try {
      const { id } = req.params;
      const proposal = await storage.incrementVotes(id);
      
      if (!proposal) {
        return res.status(404).json({ error: "Proposal not found" });
      }
      
      res.json(proposal);
    } catch (error) {
      res.status(500).json({ error: "Failed to vote" });
    }
  });

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      await storage.submitContactForm(validatedData);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact form data" });
    }
  });

  app.get("/api/demo-request", async (_req, res) => {
    try {
      const requests = await storage.getAllDemoRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch demo requests" });
    }
  });

  app.post("/api/demo-request", async (req, res) => {
    try {
      const validatedData = demoRequestSchema.parse(req.body);
      const saved = await storage.submitDemoRequest(validatedData);
      res.status(201).json(saved);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Invalid demo request data" });
      }
    }
  });

  app.post("/api/ambassador", async (req, res) => {
    try {
      const validatedData = ambassadorFormSchema.parse(req.body);
      await storage.submitAmbassadorForm(validatedData);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Invalid ambassador form data" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);
      await storage.subscribeNewsletter(validatedData);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Invalid newsletter data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
