// In schemas/cart.js
export default {
  name: 'cart',
  title: 'Cart',
  type: 'document',
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'gear' }, { type: 'event' }] }],
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'guestToken',
      title: 'Guest Token',
      type: 'string',
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare(selection) {
      const items = selection.items || [];
      return {
        title: 'Cart',
        subtitle: `${items.length} items`,
      };
    },
  },
};
