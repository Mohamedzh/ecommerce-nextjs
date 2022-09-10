
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
// import {GrClose} from 'react/icons.gr/lib'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { updateItemQty, classNames } from './Data/functions'
import { useAppSelector } from './Redux/hooks'
import { addToCart } from './Redux/Slices/cartSlice'
import { updateQty } from './Redux/Slices/qtySlice'
import { Color, DetailedProduct, Quantity, Size } from 'types'
import axios from 'axios'
import { useRouter } from 'next/router'

type Props = {
    setOpen: Dispatch<SetStateAction<boolean>>
    open: boolean
    // product: DetailedProduct
}

export default function PopUp({ open, setOpen }: Props) {
    const router = useRouter()
    const products = useAppSelector(state => state.item)
    const id = useAppSelector(state => state.currentItem.id)
    console.log(id)
    const product = products.find(product => product.id === id)
    console.log(product)

    const dispatch = useDispatch()
    const [selectedColor, setSelectedColor] = useState<Color>(product!.colors[0])
    const [selectedSize, setSelectedSize] = useState<Size>(product!.sizes[0])
    const [selectedQuantity, setSelectedQuantity] = useState<string>('0')
    const [currentTheme, setCurrentTheme] = useState(product!.quantities[0])

    // let currentTheme = product!.quantities.find(theme => theme.color === selectedColor.name
    //     && theme.size === selectedSize.name)

    useEffect(() => {
        let current = product!.quantities.find(theme => theme.color === selectedColor.name
            && theme.size === selectedSize.name)
        setCurrentTheme(current!)
        if (currentTheme) {
            setSelectedQuantity(currentTheme.qty)
            dispatch(updateQty(currentTheme.qty))
        }
    }, [selectedSize, selectedColor])
    // if (!product) {
    //     alert('loading...')
    // }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-25 transition-opacity md:block" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                            <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                    <button
                                        type="button"
                                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                                    </button>

                                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                                        <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                            <img src={product?.imageSrc} alt={product?.imageAlt} className="object-cover object-center" />
                                        </div>
                                        <div className="sm:col-span-8 lg:col-span-7">
                                            <h2 className="text-xl font-medium text-gray-900 sm:pr-12">{product?.name}</h2>

                                            <section aria-labelledby="information-heading" className="mt-1">
                                                <h3 id="information-heading" className="sr-only">
                                                    Product information
                                                </h3>

                                                <p className="font-medium text-gray-900">${product?.price}.00</p>

                                                {/* Reviews */}
                                                <div className="mt-4">
                                                    <h4 className="sr-only">Reviews</h4>
                                                    <div className="flex items-center">
                                                        <p className="text-sm text-gray-700">
                                                            {product!.rating}
                                                            <span className="sr-only"> out of 5 stars</span>
                                                        </p>
                                                        <div className="ml-1 flex items-center">
                                                            {[0, 1, 2, 3, 4].map((rating) => (
                                                                <StarIcon
                                                                    key={rating}
                                                                    className={classNames(
                                                                        Number(product?.rating) > rating ? 'text-yellow-400' : 'text-gray-200',
                                                                        'h-5 w-5 flex-shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className="ml-4 hidden lg:flex lg:items-center">
                                                            <span className="text-gray-300" aria-hidden="true">
                                                                &middot;
                                                            </span>
                                                            {/* <a href="#" className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                See all product.reviewCount reviews
                                                            </a> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section aria-labelledby="options-heading" className="mt-8">
                                                <h3 id="options-heading" className="sr-only">
                                                    Product options
                                                </h3>

                                                <form>
                                                    {/* Color picker */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-900">Color</h4>

                                                        <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                                            <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                                                            <div className="flex items-center space-x-3">
                                                                {product?.colors.map((color) => (
                                                                    <RadioGroup.Option
                                                                        key={color.name}
                                                                        value={color}
                                                                        className={({ active, checked }) =>
                                                                            classNames(
                                                                                color.selectedClass,
                                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                                !active && checked ? 'ring-2' : '',
                                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                                            )
                                                                        }
                                                                    >
                                                                        <RadioGroup.Label as="span" className="sr-only">
                                                                            {' '}
                                                                            {color.name}{' '}
                                                                        </RadioGroup.Label>
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                color.class,
                                                                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                                            )}
                                                                        />
                                                                    </RadioGroup.Option>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    {/* Size picker */}
                                                    <div className="mt-8">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-medium text-gray-900">Size</h4>
                                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                Size guide
                                                            </a>
                                                        </div>

                                                        <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                                            <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                                            <div className="grid grid-cols-7 gap-2">
                                                                {product?.sizes.map((size) => (
                                                                    <RadioGroup.Option
                                                                        key={size.name}
                                                                        value={size}
                                                                        className={({ active, checked }) =>
                                                                            classNames(
                                                                                size.inStock
                                                                                    ? 'cursor-pointer focus:outline-none'
                                                                                    : 'opacity-25 cursor-not-allowed',
                                                                                active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                                                                checked
                                                                                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                                                                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                                                'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                                                            )
                                                                        }
                                                                        disabled={!size.inStock}
                                                                    >
                                                                        <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                    </RadioGroup.Option>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={() => { dispatch(addToCart({ product: product!, color: selectedColor!.name, size: selectedSize!.name, availableQty: selectedQuantity })) }}
                                                    >
                                                        Add to bag
                                                    </button>

                                                    <p onClick={() => router.push(product!.href)}
                                                        className="absolute top-4 left-4 text-center sm:static sm:mt-8 font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                                        {/* <Link href={product!.href}> */}
                                                        View full details

                                                        {/* <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                                            View full details
                                                        </a> */}
                                                        {/* </Link> */}

                                                    </p>
                                                </form>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}