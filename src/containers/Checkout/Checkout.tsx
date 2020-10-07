import React, { useCallback, useState } from 'react';
import {
  StyledCheckout,
  StyledSidebar,
  StyledProducts,
  StyledProductsGrid,
  StyledContainer,
  StyledSummary,
  StyledCheckoutContent,
} from './Checkout.styles';
import Typography from 'components/Typography';
import Button from 'components/Button';
import PromoForm from 'components/PromoForm';
import Product from 'components/Product';
import { validatePromo, calculateTotal, applyPromo } from 'utils/promo';
import numeral from 'numeral';
import {
  Cart,
  CartPromoResponse,
  ItemPromoResponse,
} from 'utils/promo/promo.types';

const products = [
  {
    id: 'wf',
    name: 'Workflow',
    price: 199.99,
  },
  {
    id: 'docgen',
    name: 'Document Generation',
    price: 9.99,
  },
  {
    id: 'form',
    name: 'Form',
    price: 99.99,
  },
];

export const Checkout: React.FC = () => {
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [promo, setPromo] = useState<CartPromoResponse | ItemPromoResponse>();

  const handleSubmit = useCallback(
    (values) => {
      setError('');

      validatePromo(values.code, cart)
        .then((p) => {
          setCode(values.code);
          setPromo(p);
        })
        .catch((e) => {
          setError(e);
        });
    },
    [cart]
  );

  const handleOnAddToCart = useCallback(
    (id: string) => {
      const itemExists = cart.items.some((item) => item.id === id);

      if (itemExists) {
        // Increment quantity if it exists
        setCart({
          items: cart.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      } else {
        // Add to the cart if it doesnt exist
        const product = products.find((p) => p.id === id);

        if (product) {
          setCart({
            items: [
              ...cart.items,
              {
                ...product,
                quantity: 1,
              },
            ],
          });
        }
      }
    },
    [cart]
  );

  return (
    <StyledCheckout>
      <StyledContainer>
        <StyledCheckoutContent>
          <StyledProducts>
            <Typography variant="h2">Products</Typography>
            <StyledProductsGrid>
              {products.map((product) => (
                <Product
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  onAddToCart={() => handleOnAddToCart(product.id)}
                />
              ))}
            </StyledProductsGrid>
            <div>
              <Typography variant="h4">Promo codes</Typography>
              <Typography>
                RRD4D32 - 10% discount for orders above $1000 (pre-discount)
              </Typography>
              <Typography>
                44F4T11 - 15% discount for orders above $1500 (pre-discount)
              </Typography>
              <Typography>
                FF9543D1 - Reduces the docgen price to $8.99 a unit when at
                least 10 documents are purchased
              </Typography>
              <Typography>
                YYGWKJD - Reduces the form price to $89.99 a unit when at least
                1 wf is purchased
              </Typography>
            </div>
          </StyledProducts>
          <StyledSidebar>
            <Typography variant="h2">Cart</Typography>
            <PromoForm onSubmit={handleSubmit} />
            <StyledSummary>
              <Typography variant="h4">Summary</Typography>
              <Typography>
                Products:{' '}
                {cart.items
                  .map((item) => `${item.quantity}x ${item.id}`)
                  .join(', ')}
              </Typography>
              <Typography>Promotion: {error || code}</Typography>
              <Typography>
                Total:{' '}
                {numeral(calculateTotal(applyPromo(cart, promo), true)).format(
                  '$0,0[.]00'
                )}
              </Typography>
            </StyledSummary>
            <Button>Continue to Payment</Button>
          </StyledSidebar>
        </StyledCheckoutContent>
      </StyledContainer>
    </StyledCheckout>
  );
};

export default Checkout;
