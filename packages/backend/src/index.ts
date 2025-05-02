import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import urlRoutes from './routes/url.routes.js';
import { redirectToOriginalUrl } from './controllers/url.controller.js';

const app = express();
const port = 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

// Serve static frontend files for the 404 page
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS for the 404 page
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use(urlRoutes);

// Redirect route for shortened URLs
app.get('/:slug', redirectToOriginalUrl);

// 404 Page - Should be after all other routes
app.use((req: Request, res: Response) => {
  res.status(404).render('404', { message: 'Page not found' });
});

app.listen(port, () => {
  console.log(`URL Shortener server is running on port ${port}`);
});
