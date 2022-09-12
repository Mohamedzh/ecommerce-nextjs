
export const navigation = {
    categories: [
      {
        name: 'Women',
        featured: [
          {
            name: 'New Arrivals',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
            imageAlt:
              'Models sitting back to back, wearing Basic Tee in indigo and bone.',
          },
          {
            name: 'Basic Tees',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt:
              'Close up of Basic Tee fall bundle with off-white, ochre, olive, and indigo tees.',
          },
          {
            name: 'Accessories',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
            imageAlt:
              'Model wearing minimalist watch with indigo wristband and white watch face.',
          },
          {
            name: 'Carry',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-category-04.jpg',
            imageAlt:
              'Model opening tan leather long wallet with cindigoit card pockets and cash pouch.',
          },
        ],
      },
      {
        name: 'Men',
        featured: [
          {
            name: 'New Arrivals',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-01.jpg',
            imageAlt:
              'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
          },
          {
            name: 'Basic Tees',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-02.jpg',
            imageAlt: 'Model wearing light heather indigo t-shirt.',
          },
          {
            name: 'Accessories',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-03.jpg',
            imageAlt:
              'Grey 6-panel baseball hat with indigo brim, indigo mountain graphic on front, and light heather indigo body.',
          },
          {
            name: 'Carry',
            href: '#',
            imageSrc:
              'https://tailwindui.com/img/ecommerce-images/mega-menu-01-men-category-04.jpg',
            imageAlt:
              'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
          },
        ],
      },
    ],
  }

  export const reviews = {
    href: '#',
    average: 4,
    featured: [
      {
        id: 1,
        title: 'This is the best white t-shirt out there',
        rating: 5,
        content: `
          <p>I've searched my entire life for a t-shirt that reflects every color in the visible spectrum. Scientists said it couldn't be done, but when I look at this shirt, I see white light bouncing right back into my eyes. Incredible!</p>
        `,
        author: 'Mark Edwards',
        avatarSrc:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        id: 2,
        title: 'Adds the perfect variety to my wardrobe',
        rating: 4,
        content: `
          <p>I used to be one of those unbearable minimalists who only wore the same black v-necks every day. Now, I have expanded my wardrobe with three new crewneck options! Leaving off one star only because I wish the heather gray was more gray.</p>
        `,
        author: 'Blake Reid',
        avatarSrc:
          'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
      },
      {
        id: 3,
        title: 'All good things come in 6-Packs',
        rating: 5,
        content: `
          <p>Tasty beverages, strong abs that will never be seen due to aforementioned tasty beverages, and these Basic Tees!</p>
        `,
        author: 'Ben Russel',
        avatarSrc:
          'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
  }

  export const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    images: [
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
        alt: 'Model wearing plain black basic tee.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
        alt: 'Model wearing plain gray basic tee.',
      },
      {
        src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
        alt: 'Model wearing plain white basic tee.',
      },
    ],
    colors: [
      { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      'Hand cut and sewn locally',
      'Dyed with our proprietary colors',
      'Pre-washed & pre-shrunk',
      'Ultra-soft 100% cotton',
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  }

  export const deliveryMethods = [
    {
      id: 1,
      title: 'Standard',
      turnaround: '4–10 business days',
      price: '5',
    },
    { id: 2, title: 'Express', turnaround: '2–5 business days', price: '16' },
  ]
  export const paymentMethods = [
    { id: 'credit-card', title: 'Credit card' },
    { id: 'paypal', title: 'PayPal' },
    { id: 'etransfer', title: 'eTransfer' },
  ]

  export const footerNavigation2 = {
    account: [
        { name: 'Manage Account', href: '#' },
        { name: 'Saved Items', href: '#' },
        { name: 'Orders', href: '#' },
        { name: 'Redeem Gift card', href: '#' },
    ],
    service: [
        { name: 'Shipping & Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
        { name: 'Get in touch', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    connect: [
        { name: 'Instagram', href: '#' },
        { name: 'Pinterest', href: '#' },
        { name: 'Twitter', href: '#' },
    ],
}

export const filters = {
  price: [
      { value: '0', label: '$0 - $25', checked: false },
      { value: '25', label: '$25 - $50', checked: false },
      { value: '50', label: '$50 - $75', checked: false },
      { value: '75', label: '$75+', checked: false },
  ],
  color: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
  ],
  size: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
      { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
      { value: 'women', label: 'Women', checked: false },
      { value: 'men', label: 'Men', checked: false },
      { value: 'desk', label: 'Desk Accessories', checked: false },
      { value: 'true', label: 'All New Arrivals', checked: false },
  ],
}

export const sortOptions = [
  { name: 'Most Popular', href: '#', current: false },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

export const footerNavigation = {
  products: [{ name: 'Accessories', href: '#' }],
  company: [{ name: 'Who we are', href: '#' }],
  customerService: [
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
  social: [{ name: 'Facebook', href: '#' }],
}

export const navigation2 = {
  categories: [
      {
          id: 'women',
          name: 'Women',
          featured: [
              {
                  name: 'New Arrivals',
                  href: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                  imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
              },
              {
                  name: 'Basic Tees',
                  href: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                  imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
              },
              {
                  name: 'Accessories',
                  href: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg',
                  imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
              },
          ],
          sections: [
              [
                  {
                      id: 'shoes',
                      name: 'Shoes & Accessories',
                      items: [
                          { name: 'Sneakers', href: '#' },
                          { name: 'Boots', href: '#' },
                          { name: 'Flats', href: '#' },
                          { name: 'Sandals', href: '#' },
                          { name: 'Heels', href: '#' },
                          { name: 'Socks', href: '#' },
                      ],
                  },
                  {
                      id: 'collection',
                      name: 'Shop Collection',
                      items: [
                          { name: 'Everything', href: '#' },
                          { name: 'Core', href: '#' },
                          { name: 'New Arrivals', href: '#' },
                          { name: 'Sale', href: '#' },
                          { name: 'Accessories', href: '#' },
                      ],
                  },
              ],
              [
                  {
                      id: 'clothing',
                      name: 'All Clothing',
                      items: [
                          { name: 'Basic Tees', href: '#' },
                          { name: 'Artwork Tees', href: '#' },
                          { name: 'Tops', href: '#' },
                          { name: 'Bottoms', href: '#' },
                          { name: 'Swimwear', href: '#' },
                          { name: 'Underwear', href: '#' },
                      ],
                  },
                  {
                      id: 'accessories',
                      name: 'All Accessories',
                      items: [
                          { name: 'Watches', href: '#' },
                          { name: 'Wallets', href: '#' },
                          { name: 'Bags', href: '#' },
                          { name: 'Sunglasses', href: '#' },
                          { name: 'Hats', href: '#' },
                          { name: 'Belts', href: '#' },
                      ],
                  },
              ],
              [
                  {
                      id: 'brands',
                      name: 'Brands',
                      items: [
                          { name: 'Full Nelson', href: '#' },
                          { name: 'My Way', href: '#' },
                          { name: 'Re-Arranged', href: '#' },
                          { name: 'Counterfeit', href: '#' },
                          { name: 'Significant Other', href: '#' },
                      ],
                  },
              ],
          ],
      },
      {
          id: 'men',
          name: 'Men',
          featured: [
              {
                  name: 'Accessories',
                  href: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg',
                  imageAlt:
                      'Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters.',
              },
              {
                  name: 'New Arrivals',
                  href: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                  imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
              },
              {
                  name: 'Artwork Tees',
                  href: '#',
                  imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                  imageAlt:
                      'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
              },
          ],
          sections: [
              [
                  {
                      id: 'shoes',
                      name: 'Shoes & Accessories',
                      items: [
                          { name: 'Sneakers', href: '#' },
                          { name: 'Boots', href: '#' },
                          { name: 'Sandals', href: '#' },
                          { name: 'Socks', href: '#' },
                      ],
                  },
                  {
                      id: 'collection',
                      name: 'Shop Collection',
                      items: [
                          { name: 'Everything', href: '#' },
                          { name: 'Core', href: '#' },
                          { name: 'New Arrivals', href: '#' },
                          { name: 'Sale', href: '#' },
                      ],
                  },
              ],
              [
                  {
                      id: 'clothing',
                      name: 'All Clothing',
                      items: [
                          { name: 'Basic Tees', href: '#' },
                          { name: 'Artwork Tees', href: '#' },
                          { name: 'Pants', href: '#' },
                          { name: 'Hoodies', href: '#' },
                          { name: 'Swimsuits', href: '#' },
                      ],
                  },
                  {
                      id: 'accessories',
                      name: 'All Accessories',
                      items: [
                          { name: 'Watches', href: '#' },
                          { name: 'Wallets', href: '#' },
                          { name: 'Bags', href: '#' },
                          { name: 'Sunglasses', href: '#' },
                          { name: 'Hats', href: '#' },
                          { name: 'Belts', href: '#' },
                      ],
                  },
              ],
              [
                  {
                      id: 'brands',
                      name: 'Brands',
                      items: [
                          { name: 'Re-Arranged', href: '#' },
                          { name: 'Counterfeit', href: '#' },
                          { name: 'Full Nelson', href: '#' },
                          { name: 'My Way', href: '#' },
                      ],
                  },
              ],
          ],
      },
  ],
  pages: [
      { name: 'Company', href: '#' },
      { name: 'Stores', href: '#' },
  ],
}