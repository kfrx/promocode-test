import React from 'react';
import { StyledProduct } from './Product.styles';
import { ProductProps } from './Product.types';
import numeral from 'numeral';
import Button from 'components/Button';
import Typography from 'components/Typography';

export const Product: React.FC<ProductProps> = ({
  name,
  price,
  onAddToCart,
}) => {
  return (
    <StyledProduct>
      <Typography variant="h3" data-testid="name">
        {name}
      </Typography>
      <Typography variant="h4" data-testid="price">
        {numeral(price).format('$0,0[.]00')}
      </Typography>
      <Button onClick={onAddToCart}>Add to cart</Button>
    </StyledProduct>
  );
};

export default Product;
