import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, StarIcon } from '@heroicons/react/20/solid'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from 'components/layout'
import { classNames } from 'components/Data/functions'
import { footerNavigation } from 'components/Data/data'
import axios from 'axios'
import { DetailedProduct } from 'types'
import { categoryFilter, clearFilter, colorFilter, priceFilter, sizeFilter } from 'components/Redux/Slices/filterSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'components/Redux/hooks'
import { addCurrentProducts, changeCurrent } from 'components/Redux/Slices/sortSlice'

const navigation = {
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

const Collection: NextPage = ({ products }: { products?: DetailedProduct[] }) => {
    const dispatch = useDispatch()
    const filters = useAppSelector(state => state.filter)
    const sortOptions = useAppSelector(state => state.sort.sortOptions)
    const currentSort = useAppSelector(state => state.sort.currentProducts)

    const [sumFilters, setSumFilters] = useState<number>(0)
    // const [showProducts, setShowProducts] = useState<DetailedProduct[]>(products!)

    useEffect(() => {
        setSumFilters(filters.color.filter(color => color.checked === true).length +
            filters.size.filter(size => size.checked === true).length +
            filters.category.filter(category => category.checked === true).length +
            filters.price.filter(price => price.checked === true).length
        );
        // setShowProducts(filter(products!))
        dispatch(addCurrentProducts(filter(products!)))
    }, [filters])

    const filter = (products: DetailedProduct[]) => {
        let filteredColors = filters.color.filter(color => color.checked === true).map(color => color.value)
        let filteredSizes = filters.size.filter(size => size.checked === true).map(size => size.value)
        let filteredCategories = filters.category.filter(category => category.checked === true).map(category => category.value)
        let filteredPrices = filters.price.filter(price => price.checked === true).map(price => Number(price.value))

        let filteredProducts: DetailedProduct[] = products
        let result: DetailedProduct[] = []

        for (let i = 0; i < filteredColors.length; i++) {
            if (filteredColors.length === 0) {
                break
            }
            let filteredProductColors = filteredProducts.filter(product => product.colors.map(color => color.name.toLowerCase()).includes(filteredColors[i]))
            result.push(...filteredProductColors)
            if (i === filteredColors.length - 1) {
                filteredProducts = result
                result = []
            }
        }
        for (let i = 0; i < filteredSizes.length; i++) {
            if (filteredSizes.length === 0) {
                break
            }
            let filteredProductSizes = filteredProducts.filter(product => product.sizes.map(color => color.name.toLowerCase()).includes(filteredSizes[i]))
            result.push(...filteredProductSizes)
            if (i === filteredSizes.length - 1) {
                filteredProducts = result
                result = []
            }
        }
        for (let i = 0; i < filteredCategories.length; i++) {
            if (filteredCategories.length === 0) {
                break
            }
            let filteredProductCategories = filteredProducts.filter(product => product.category.toLowerCase() === filteredCategories[i] || product.new.toLowerCase() === filteredCategories[i])
            result.push(...filteredProductCategories)
            if (i === filteredCategories.length - 1) {
                filteredProducts = result
                result = []
            }
        }

        for (let i = 0; i < filteredPrices.length; i++) {
            if (filteredPrices.length === 0) {
                break
            }
            let filteredProductPrices = filteredProducts.filter(product => Number(product.price) >= filteredPrices[i] && Number(product.price) <= filteredPrices[i] + 25)
            result.push(...filteredProductPrices)
            if (filteredPrices[i] === 75) {
                result.push(...filteredProducts.filter(product => Number(product.price) > 100))
            }
            if (i === filteredPrices.length - 1) {
                filteredProducts = result
                result = []
            }
        }
        let filteredProductsSet = Array.from(new Set(filteredProducts))
        return filteredProductsSet
    }

    const [open, setOpen] = useState(false)

    return (
        <Layout>
            <div className="bg-white">
                <main className="pb-24">
                    {/* <div className="py-16 px-4 text-center sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Workspace</h1>
                        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
                            The secret to a tidy desk? Don't get rid of anything, just put it in really really nice looking containers.
                        </p>
                    </div> */}

                    {/* Filters */}
                    <Disclosure
                        as="section"
                        aria-labelledby="filter-heading"
                        className="grid items-center border-t border-b border-gray-200"
                    >
                        <h2 id="filter-heading" className="sr-only">
                            Filters
                        </h2>
                        <div className="relative col-start-1 row-start-1 py-4">
                            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                                <div>
                                    <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                                        <FunnelIcon
                                            className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        {sumFilters} Filters
                                    </Disclosure.Button>
                                </div>
                                <div className="pl-6">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(clearFilter())
                                        }
                                        className="text-gray-500">
                                        Clear all
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="border-t border-gray-200 py-10">
                            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                                <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                                    <fieldset>
                                        <legend className="block font-medium">Price</legend>
                                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                            {filters.price.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center text-base sm:text-sm">
                                                    <input
                                                        id={`price-${optionIdx}`}
                                                        name="price[]"
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={option.checked}
                                                        onChange={() => dispatch(priceFilter(option))}
                                                    />
                                                    <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend className="block font-medium">Color</legend>
                                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                            {filters.color.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center text-base sm:text-sm">
                                                    <input
                                                        id={`color-${optionIdx}`}
                                                        name="color[]"
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={option.checked}
                                                        onChange={() => dispatch(colorFilter(option))}
                                                    />
                                                    <label htmlFor={`color-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                                    <fieldset>
                                        <legend className="block font-medium">Size</legend>
                                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                            {filters.size.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center text-base sm:text-sm">
                                                    <input
                                                        id={`size-${optionIdx}`}
                                                        name="size[]"
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={option.checked}
                                                        onChange={() => dispatch(sizeFilter(option))}
                                                    />
                                                    <label htmlFor={`size-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend className="block font-medium">Category</legend>
                                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                            {filters.category.map((option, optionIdx) => (
                                                <div key={option.value} className="flex items-center text-base sm:text-sm">
                                                    <input
                                                        id={`category-${optionIdx}`}
                                                        name="category[]"
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        checked={option.checked}
                                                        onChange={() => dispatch(categoryFilter(option))}
                                                    />
                                                    <label htmlFor={`category-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </Disclosure.Panel>
                        <div className="col-start-1 row-start-1 py-4">
                            <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
                                <Menu as="div" className="relative inline-block">
                                    <div className="flex">
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href='#'
                                                                onClick={() => { dispatch(changeCurrent(option)) }}
                                                                className={classNames(
                                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {option.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </Disclosure>

                    {/* Product grid */}
                    <section aria-labelledby="products-heading" className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                            {currentSort.map((product) => (
                                <div key={product.id} className="group relative border-r border-b border-gray-200 p-4 sm:p-6">
                                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="pt-10 pb-4 text-center">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            <Link href={product.href}>
                                                <a>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </Link>
                                        </h3>
                                        <div className="mt-3 flex flex-col items-center">
                                            <p className="sr-only">{product.rating} out of 5 stars</p>
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            Number(product.rating) > rating ? 'text-yellow-400' : 'text-gray-200',
                                                            'flex-shrink-0 h-5 w-5'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            {/* <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p> */}
                                        </div>
                                        <p className="mt-4 text-base font-medium text-gray-900">${product.price}.00</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Pagination */}
                    {/* <nav
                        aria-label="Pagination"
                        className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
                    >
                        <div className="min-w-0 flex-1">
                            <a
                                href="#page1"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                Previous
                            </a>
                        </div>
                        <div className="hidden space-x-2 sm:flex">
                            <a id="page1"
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                1
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                2
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-indigo-600 bg-white px-4 ring-1 ring-indigo-600 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                3
                            </a>
                            <span className="inline-flex h-10 items-center px-1.5 text-gray-500">...</span>
                            <a
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                8
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                9
                            </a>
                            <a
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                10
                            </a>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-end">
                            <a
                                href="#"
                                className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
                            >
                                Next
                            </a>
                        </div>
                    </nav> */}
                </main>
            </div>
        </Layout>
    )
}

export default Collection

export async function getStaticProps() {
    try {
        const res = await axios.get(`http://localhost:3000/api/items`)
        const data = res.data
        return {
            props: {
                products: data
            }
        }
    } catch (error) {
        console.log(error)
    }
}