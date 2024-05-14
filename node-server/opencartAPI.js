const axios = require('axios');

// Function to add product to OpenCart cart
exports.addProductToCart = async (productId, quantity) => {
    try {
        const response = await axios.post('http://your-opencart-api-url/add-to-cart', { productId, quantity });
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw new Error('Failed to add product to cart');
    }
};