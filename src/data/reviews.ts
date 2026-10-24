export interface Review {
  quote: string;
  name: string;
  detail?: string;
}

/**
 * Add genuine customer reviews supplied by the owner here.
 * Never add invented names, quotes or ratings.
 */
export const reviews: Review[] = [];

export interface CustomerPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Add real customer photos (with permission) to /public/images and list them here.
 * The homepage section appears automatically once this list has entries.
 */
export const customerPhotos: CustomerPhoto[] = [];
