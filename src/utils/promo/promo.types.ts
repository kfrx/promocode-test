export type PromoType = 'cart' | 'item';

export interface PromoResponse {
  type: PromoType;
}

export interface ItemPromoResponse extends PromoResponse {
  discountedPrice: number;
  itemId: string;
}

export interface CartPromoResponse extends PromoResponse {
  appliedPercentage: number;
}

export interface CartItem {
  id: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
}

export interface Cart {
  items: CartItem[];
}
