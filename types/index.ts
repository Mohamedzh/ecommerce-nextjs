export interface Product {
  id: string
  name: string
  href: string
  color: string
  price: string
  availableQty: string
  imageSrc: string
  imageAlt: string
  description: string
  details: string
}

export interface DetailedProduct extends Product {
  colors: Color[]
  sizes: Size[]
  images: Image[]
  highlights: Highlights[]
  quantities:Quantity[]
}

export interface CartItem extends Product {
  quantity: number
  size: string
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: CartItem[]
}

export type Page = {
  name: string;
  href: string;
}
export type Navigation = {
  categories: Category[]
}

export type Highlights = {
  id: string
  highlight: string
}

export type Image = {
  id: string
  src: string
  alt: string
}

export type Color = {
  id: string,
  name: string,
  class: string,
  selectedClass: string
}

export type Size = {
  id: string,
  name: string,
  inStock: boolean
}

export type reqBody = {
  emailAddress: string
  firstName: string
  lastName: string
  company: string
  address: string
  apartment: string
  city: string
  country: string
  region: string
  postalCode: string
  phone: string
  selectedDeliveryMethod: string
  selectedPaymentMethod: string
  orderId: string
}

export interface Quantity{
  id: string
  color: string
  size: string
  qty:string
}