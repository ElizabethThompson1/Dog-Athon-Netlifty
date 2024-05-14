export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'fullName', // Changed from 'username' to 'fullName'
            title: 'Full Name', // Changed from 'Username' to 'Full Name'
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: Rule => Rule.required().email(),
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string',
            validation: Rule => Rule.required(),
        },
        {
            name: 'isAdmin',
            title: 'Is Admin',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true, // Enable hotspot for image cropping
            },
        },
        // Add other fields as needed
    ],
};
