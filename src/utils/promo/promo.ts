import { CartPromoResponse, ItemPromoResponse, Cart } from './promo.types';

export const calculateTotal = (
  cart: Cart,
  useDiscountedPrice?: boolean
): number => {
  const cartTotal = cart.items.reduce((acc, item) => {
    const price = useDiscountedPrice
      ? item.discountedPrice || item.price
      : item.price;

    return acc + price * item.quantity;
  }, 0);

  return cartTotal;
};

export const validatePromo = (
  promo: string,
  cart: Cart
): Promise<ItemPromoResponse | CartPromoResponse> => {
  const cartTotal = calculateTotal(cart);

  return new Promise((resolve, reject) => {
    switch (promo) {
      case 'RRD4D32': {
        const minRequiredAmount = 1000;

        if (cartTotal > minRequiredAmount) {
          resolve({
            appliedPercentage: 0.9,
            type: 'cart',
          });
        }

        reject('Your cart is not eligible');

        break;
      }
      case '44F4T11': {
        const minRequiredAmount = 1500;

        if (cartTotal > minRequiredAmount) {
          resolve({
            appliedPercentage: 0.85,
            type: 'cart',
          });
        }

        reject('Your cart is not eligible');

        break;
      }
      case 'FF9543D1': {
        const minRequiredQuantity = 10;
        const numDocs = cart.items.reduce(
          (acc, item) => (item.id === 'docgen' ? acc + item.quantity : acc),
          0
        );

        if (numDocs >= minRequiredQuantity) {
          resolve({
            discountedPrice: 8.99,
            type: 'item',
            itemId: 'docgen',
          });
        }

        reject('Your cart is not eligible');

        break;
      }
      case 'YYGWKJD': {
        const minRequiredQuantity = 1;
        const numDocs = cart.items.reduce(
          (acc, item) => (item.id === 'wf' ? acc + item.quantity : acc),
          0
        );

        if (numDocs >= minRequiredQuantity) {
          resolve({
            discountedPrice: 89.99,
            type: 'item',
            itemId: 'form',
          });
        }

        reject('Your cart is not eligible');

        break;
      }
      default:
        reject('Invalid promo code');
        break;
    }
  });
};

export const applyPromo = (
  cart: Cart,
  promo?: ItemPromoResponse | CartPromoResponse
): Cart => {
  if (!promo) {
    return cart;
  }

  switch (promo.type) {
    case 'item':
      return {
        items: cart.items.map((item) => {
          // Set the discounted price if the item id matches the specified promo id
          if (item.id === (promo as ItemPromoResponse).itemId) {
            return {
              ...item,
              discountedPrice: (promo as ItemPromoResponse).discountedPrice,
            };
          }

          return item;
        }),
      };
    case 'cart':
      return {
        items: cart.items.map((item) => ({
          ...item,
          discountedPrice:
            item.price * (promo as CartPromoResponse).appliedPercentage,
        })),
      };
    default:
      return cart;
  }
};
