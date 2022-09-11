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
  rating: string
  trending: string
  category: string
  new: string
}

export interface DetailedProduct extends Product {
  quantity: number
  size: string
  colors: Color[]
  sizes: Size[]
  images: Image[]
  highlights: Highlights[]
  quantities: Quantity[]
}

export type Category = {
  name: string
  featured: Product[]
}
export type AppStateType = {
  products: Product[]
  categories: Category[]
  cart: DetailedProduct[]
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
  inStock: string
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

export interface Quantity {
  id: string
  color: string
  size: string
  qty: string
}

export interface Filter {
  value: string
  label: string
  checked: boolean
}

export interface SortOption {
  name: string
  href: string
  current: boolean
}