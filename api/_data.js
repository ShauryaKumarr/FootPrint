// This file acts as our single source of truth for product data.
// By keeping it separate, we can share it between different API endpoints.

export const productDatabase = {
  'B07VGRJDFY': { // Generic T-Shirt
    original: {
      name: 'Basic Cotton T-Shirt',
      store: 'Amazon',
      price: 18.99,
      imageUrl: 'https://i.imgur.com/sSAm1kG.jpeg',
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
        imageUrl: 'https://i.imgur.com/i9kZz2m.jpeg',
        productUrl: 'https://www.patagonia.com/worn-wear/'
      },
      {
        store: 'ThredUp',
        name: 'ThredUp T-Shirt',
        price: 14.99,
        donated: 1.50,
        charity: '1% for the Planet',
        coins: 15,
        imageUrl: 'https://i.imgur.com/r3bJ1dJ.jpeg',
        productUrl: 'https://www.thredup.com/'
      },
    ],
  },
  'B08J5F45N1': { // Plastic Water bottle
    original: {
      name: 'Plastic Water Bottles (24-pack)',
      store: 'Amazon',
      price: 15.99,
      imageUrl: 'https://i.imgur.com/8LCRW82.jpeg',
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
        imageUrl: 'https://i.imgur.com/JmwSjWE.jpeg',
        productUrl: 'https://www.livelarq.com/'
      },
      {
        store: 'Hydro Flask',
        name: 'Reusable Steel Bottle',
        price: 44.95,
        donated: 4.5,
        charity: 'Surfrider Foundation',
        coins: 40,
        imageUrl: 'https://i.imgur.com/tS2sA9W.jpeg',
        productUrl: 'https://www.hydroflask.com/'
      },
    ],
  },
  'B086KY66PH': { // Hanes T-Shirt
    original: {
      name: 'Hanes Moisture-Wicking Undershirt',
      store: 'Amazon',
      price: 24.99,
      imageUrl: 'https://i.imgur.com/vDA2A3u.jpeg',
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
        imageUrl: 'https://i.imgur.com/i9kZz2m.jpeg',
        productUrl: 'https://www.patagonia.com/worn-wear/'
      },
      {
        store: 'ThredUp',
        name: 'ThredUp T-Shirt',
        price: 14.99,
        donated: 1.50,
        charity: '1% for the Planet',
        coins: 15,
        imageUrl: 'https://i.imgur.com/r3bJ1dJ.jpeg',
        productUrl: 'https://www.thredup.com/'
      },
    ]
  }
};
