export interface Url {
  id: string;
  slug: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  visits: number;
}

export interface CreateUrlRequest {
  originalUrl: string;
}

export interface CreateUrlResponse {
  id: string;
  slug: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}