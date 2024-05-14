// In schemas/gear.js
export default {
    name: 'gear',
    title: 'Gear',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: Rule => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: Rule => Rule.required().min(0),
      },
      {
        name: 'sizes', // New field for sizes
        title: 'Sizes',
        type: 'object',
        fields: [
          {
            name: 'small',
            title: 'Small',
            type: 'number',
            initialValue: 0, // Default value
          },
          {
            name: 'medium',
            title: 'Medium',
            type: 'number',
            initialValue: 0, // Default value
          },
          {
            name: 'large',
            title: 'Large',
            type: 'number',
            initialValue: 0, // Default value
          },
        ],
      },
      {
        name: 'Image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // Enable hotspot for image cropping
        },
      },
      // Add other fields as needed
    ],
  };
  