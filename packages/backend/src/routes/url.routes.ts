import { Router } from 'express';
import { createShortUrl, getAllUrls } from '../controllers/url.controller.js';

const router = Router();

// Create a short URL
router.post('/api/urls', createShortUrl);

// Get all URLs
router.get('/api/urls', getAllUrls);

export default router;