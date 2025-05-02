import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { prisma } from '../lib/prisma.js';
import { CreateUrlResponse, Url } from '@url-shortener/common/types/url';
// Generate a unique short slug
const generateUniqueSlug = async (): Promise<string> => {
  // Generate a 6-character slug
  const slug = nanoid(6);

  // Check if the slug already exists
  const existingUrl = await prisma.url.findUnique({
    where: { slug }
  });

  // If the slug exists, try again recursively
  if (existingUrl) {
    return generateUniqueSlug();
  }

  return slug;
};

// Create a shortened URL
export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Ensure URL is valid
    try {
      new URL(originalUrl);
    } catch (err) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Generate a unique slug
    const slug = await generateUniqueSlug();

    // Save to database
    const url = await prisma.url.create({
      data: {
        slug,
        originalUrl,
      }
    });

    // Construct the full shortened URL
    const shortUrl = `${req.protocol}://${req.get('host')}/${slug}`;

    const createUrlResponse: CreateUrlResponse = {
      id: url.id,
      slug: url.slug,
      originalUrl: url.originalUrl,
      shortUrl,
      createdAt: url.createdAt,
    };
    return res.status(201).json(createUrlResponse);
  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Redirect from a short URL to the original URL
export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // Find the URL record in the database
    const url = await prisma.url.findUnique({
      where: { slug }
    });

    // If not found, return 404
    if (!url) {
      return res.status(404).render('404', { message: 'Short URL not found' });
    }

    // Update visit count
    await prisma.url.update({
      where: { id: url.id },
      data: { visits: { increment: 1 } }
    });

    // Redirect to the original URL
    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get all URLs
export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const urls: any[] = await prisma.url.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Add shortUrl to each URL
    const urlsWithShortUrl: Url[] = urls.map(url => ({
      ...url,
      shortUrl: `${req.protocol}://${req.get('host')}/${url.slug}`
    }));

    return res.json(urlsWithShortUrl);
  } catch (error) {
    console.error('Error getting URLs:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};