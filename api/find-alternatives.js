const productDatabase = {
  'B08J5F45N1': { // An ID for a generic plastic water bottle pack
    original: { 
      name: 'Plastic Water Bottles (24-pack)', 
      store: 'Amazon', 
      price: 15.99,
      imageUrl: 'https://images.unsplash.com/photo-1617150119111-09bbb85178b0?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/dp/B08J5F45N1'
    },
    alternatives: [
      { 
        store: 'LARQ', 
        name: 'Self-Cleaning Water Bottle',
        price: 99.00, 
        donated: 10, 
        charity: '1% for the Planet', 
        coins: 50,
        imageUrl: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.livelarq.com/'
      },
      { 
        store: 'Hydro Flask', 
        name: 'Reusable Steel Bottle',
        price: 44.95, 
        donated: 4.5, 
        charity: 'Surfrider Foundation', 
        coins: 40,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&w=500&q=60',
        productUrl: 'https://www.amazon.com/dp/B0BG6NRL86'
      },
    ],
  },
  'B07VGRJDFY': { // An ID for a popular t-shirt
    original: { 
      name: 'Basic Cotton T-Shirt', 
      store: 'Amazon', 
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/dp/B07VGRJDFY'
    },
    alternatives: [
       { 
         store: 'Patagonia Worn Wear', 
         name: 'Patagonia T-Shirt',
         price: 22.0, 
         donated: 2.20, 
         charity: 'One Tree Planted', 
         coins: 20,
         imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=60',
         productUrl: 'https://www.patagonia.com/worn-wear/'
       },
       { 
         store: 'ThredUp', 
         name: 'ThredUp T-Shirt',
         price: 14.99, 
         donated: 1.50, 
         charity: '1% for the Planet', 
         coins: 15,
         imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=60',
         productUrl: 'https://www.thredup.com/'
       },
    ],
  },
  'B086KY66PH': { // Hanes Undershirt ID from your link
    original: { 
      name: 'Hanes Moisture-Wicking Undershirt', 
      store: 'Amazon', 
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/dp/B086KY66PH'
    },
    alternatives: [
       { 
         store: 'Patagonia Worn Wear', 
         name: 'Patagonia T-Shirt',
         price: 22.0, 
         donated: 2.20, 
         charity: 'One Tree Planted', 
         coins: 20,
         imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=60',
         productUrl: 'https://www.patagonia.com/worn-wear/'
       },
       { 
         store: 'ThredUp', 
         name: 'ThredUp T-Shirt',
         price: 14.99, 
         donated: 1.50, 
         charity: '1% for the Planet', 
         coins: 15,
         imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=60',
         productUrl: 'https://www.thredup.com/'
       },
    ],
  },
  'B0BG6NRL86': { // Hydro Flask ID
    original: { 
      name: 'Hydro Flask Wide Mouth', 
      store: 'Amazon', 
      price: 44.95,
      imageUrl: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=500&q=60',
      productUrl: 'https://www.amazon.com/dp/B0BG6NRL86'
    },
    alternatives: [
       { 
         store: 'LARQ', 
         name: 'Self-Cleaning Bottle',
         price: 99.00, 
         donated: 10.00, 
         charity: '1% for the Planet', 
         coins: 50,
         imageUrl: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&w=500&q=60',
         productUrl: 'https://www.livelarq.com/'
       },
       {
         store: 'Klean Kanteen',
         name: 'Insulated Classic',
         price: 39.95,
         donated: 4.00,
         charity: '5 Gyres',
         coins: 35,
         imageUrl: 'https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=500&q=60',
         productUrl: 'https://www.kleankanteen.com/'
       },
    ],
  }
};

// This is a serverless function that Vercel or Netlify can run.
// It acts as a simple, free "backend".
export default function handler(request, response) {
  // We only allow POST requests to this endpoint.
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  const { productUrl } = request.body;

  if (!productUrl) {
    return response.status(400).json({ message: 'Product URL is required.' });
  }

  // Use a regular expression to try and find an Amazon Product ID in the URL.
  const amazonIdMatch = productUrl.match(/dp\/([A-Z0-9]{10})/);
  const productId = amazonIdMatch ? amazonIdMatch[1] : null;

  if (productId && productDatabase[productId]) {
    // If we find a product ID and it exists in our "database", return the data.
    return response.status(200).json(productDatabase[productId]);
  } else {
    // For any other link, we'll return a "not found" error.
    return response.status(404).json({ message: 'Sorry, we couldn’t find a green alternative for this specific product. Our database is growing!' });
  }
}
