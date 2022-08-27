export interface Product {
  id: string
  name: string
  href: string
  color: string
  price: string
  availableQty: number
  imageSrc: string
  imageAlt: string
  description: string
  details: string
}

export interface CartItem extends Product {
  quantity: number
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
  highlight:string
}

export type Image = {
  id: string
  src: string
  alt: string
}