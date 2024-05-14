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
        readOnly: true, 
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
    // Define a computed field to calculate the total price
    preview: {
      select: {
        items: 'items', // Select the items array
      },
      prepare(selection) {
        const items = selection.items || [];
        // Calculate the total price by summing up the prices of all items
        const totalPrice = items.reduce((total, item) => {
          // For each item, check if it's a gear or an event
          // Then add its price to the total
          if (item._type === 'gear' || item._type === 'event') {
            return total + item.price;
          }
          return total;
        }, 0);
  
        // Return the preview object with the total price
        return {
          title: 'Cart',
          subtitle: `Total Price: $${totalPrice.toFixed(2)}`, // Format the total price
        };
      },
    },
  };
  