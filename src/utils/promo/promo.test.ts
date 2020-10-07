import { validatePromo, applyPromo } from './promo';

describe('validatePromo', () => {
  describe('RRD4D32', () => {
    it('will respond with the correct promo details when the cart is over 1000', async () => {
      const actual = await validatePromo('RRD4D32', {
        items: [
          {
            id: 'wf',
            price: 500,
            quantity: 3,
          },
        ],
      });

      const expected = {
        type: 'cart',
        appliedPercentage: 0.9,
      };

      expect(actual).toEqual(expected);
    });

    it('will respond with an error when it is 1000', async () => {
      try {
        await validatePromo('RRD4D32', {
          items: [
            {
              id: 'wf',
              price: 500,
              quantity: 2,
            },
          ],
        });

        fail();
      } catch (error) {
        expect(error).toEqual('Your cart is not eligible');
      }
    });

    it('will respond with an error under 1000', async () => {
      try {
        await validatePromo('RRD4D32', {
          items: [
            {
              id: 'wf',
              price: 500,
              quantity: 1,
            },
          ],
        });

        fail();
      } catch (error) {
        expect(error).toEqual('Your cart is not eligible');
      }
    });
  });

  describe('44F4T11', () => {
    it('will respond with the correct promo details when the cart is over 1500', async () => {
      const actual = await validatePromo('44F4T11', {
        items: [
          {
            id: 'wf',
            price: 500,
            quantity: 4,
          },
        ],
      });

      const expected = {
        type: 'cart',
        appliedPercentage: 0.85,
      };

      expect(actual).toEqual(expected);
    });

    it('will respond with an error when it is 1500', async () => {
      try {
        await validatePromo('44F4T11', {
          items: [
            {
              id: 'wf',
              price: 500,
              quantity: 3,
            },
          ],
        });

        fail();
      } catch (error) {
        expect(error).toEqual('Your cart is not eligible');
      }
    });

    it('will respond with an error under 1500', async () => {
      try {
        await validatePromo('44F4T11', {
          items: [
            {
              id: 'wf',
              price: 500,
              quantity: 1,
            },
          ],
        });

        fail();
      } catch (error) {
        expect(error).toEqual('Your cart is not eligible');
      }
    });
  });

  describe('FF9543D1', () => {
    it('will respond with the correct promo details when there is 10 or more documents', async () => {
      const actual = await validatePromo('FF9543D1', {
        items: [
          {
            id: 'docgen',
            price: 500,
            quantity: 10,
          },
        ],
      });

      const expected = {
        type: 'item',
        itemId: 'docgen',
        discountedPrice: 8.99,
      };

      expect(actual).toEqual(expected);
    });

    it('will respond with an error when under 10 documents', async () => {
      try {
        await validatePromo('FF9543D1', {
          items: [
            {
              id: 'docgen',
              price: 500,
              quantity: 9,
            },
          ],
        });

        fail();
      } catch (error) {
        expect(error).toEqual('Your cart is not eligible');
      }
    });
  });

  describe('YYGWKJD', () => {
    it('will respond with the correct promo details when there is 1 or more wf', async () => {
      const actual = await validatePromo('YYGWKJD', {
        items: [
          {
            id: 'wf',
            price: 500,
            quantity: 1,
          },
        ],
      });

      const expected = {
        type: 'item',
        itemId: 'form',
        discountedPrice: 89.99,
      };

      expect(actual).toEqual(expected);
    });

    it('will respond with an error when there are 0 wf', async () => {
      try {
        await validatePromo('YYGWKJD', {
          items: [
            {
              id: 'docgen',
              price: 500,
              quantity: 2,
            },
          ],
        });

        fail();
      } catch (error) {
        expect(error).toEqual('Your cart is not eligible');
      }
    });
  });
});

describe('applyPromo', () => {
  it('can apply an item promo', () => {
    const promo: any = {
      type: 'item',
      itemId: 'wf',
      discountedPrice: 5,
    };

    const initialCart = {
      items: [
        {
          id: 'wf',
          price: 100,
          quantity: 4,
        },
        {
          id: 'docgen',
          price: 100,
          quantity: 3,
        },
      ],
    };

    const actual = applyPromo(initialCart, promo);

    const expected = {
      items: [
        {
          id: 'wf',
          price: 100,
          quantity: 4,
          discountedPrice: 5,
        },
        {
          id: 'docgen',
          price: 100,
          quantity: 3,
        },
      ],
    };

    expect(actual).toEqual(expected);
  });

  it('can apply a cart promo', () => {
    const promo: any = {
      type: 'cart',
      appliedPercentage: 0.9,
    };
    const initialCart = {
      items: [
        {
          id: 'wf',
          price: 100,
          quantity: 4,
        },
        {
          id: 'docgen',
          price: 100,
          quantity: 3,
        },
      ],
    };

    const actual = applyPromo(initialCart, promo);

    const expected = {
      items: [
        {
          id: 'wf',
          price: 100,
          quantity: 4,
          discountedPrice: 90,
        },
        {
          id: 'docgen',
          price: 100,
          quantity: 3,
          discountedPrice: 90,
        },
      ],
    };

    expect(actual).toEqual(expected);
  });
});
