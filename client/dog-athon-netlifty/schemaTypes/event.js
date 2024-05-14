export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'day',
      title: 'Day',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(31),
    },
    {
      name: 'month',
      title: 'Month',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(new Date().getFullYear()), // Assuming events can't be in the past
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    },
    {
      name: 'distance', // New field for distance
      title: 'Distance', // Title for the distance field
      type: 'string', // Change type to string
      options: {
        list: [
          { title: '5K', value: '5K' },
          { title: '10K', value: '10K' },
          { title: 'Half Marathon', value: 'Half Marathon' },
          { title: '10 Miles', value: '10 Miles' },
        ],
        layout: 'dropdown', // Display as a dropdown
      },
      validation: Rule => Rule.required(), // Validation rules for distance
    },
    {
      name: 'eventImage',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
