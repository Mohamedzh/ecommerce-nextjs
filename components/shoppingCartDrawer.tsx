import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect } from 'react'
import { DetailedProduct, Product } from 'types'
import Dropdown from './dropdown'
import Link from 'next/link'
import { useAppSelector } from './Redux/hooks'
import { appendQty, removeFromCart } from './Redux/Slices/cartSlice'
import { useDispatch } from 'react-redux'
import { subtotal, updateItemQty } from '../lib/functions'
import { classNames } from 'lib'

type props = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function ShoppingCartDrawer({ open, setOpen }: props) {
  const cart = useAppSelector(state => state.cart)
  const currentQty = useAppSelector(state => state.qty)
  const dispatch = useDispatch()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {' '}
                          Shopping cart{' '}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cart.map((product: DetailedProduct, idx) => (
                              <li key={idx} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link href={product.href}>
                                          <a>
                                            {' '}
                                            {product.name}{' '}
                                          </a>
                                        </Link>
                                      </h3>
                                      <p className="ml-4">${product.price}.00</p>
                                    </div>
                                    <div className="mt-1 flex text-sm">
                                      <div>
                                        <button
                                          className={"inline-flex items-center rounded-full mx-2 pointer-events-none border p-2 " + `bg-${product.color.toLowerCase()}-500`}
                                        >
                                        </button>
                                      </div>
                                      <p className="text-sm text-gray-500">
                                        {product.color}
                                      </p>
                                      {product.size ? (
                                        <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{product.size}</p>
                                      ) : null}
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      <Dropdown
                                        onChange={(value) => {
                                          updateItemQty(product.id, +value, dispatch)
                                          // dispatch(appendQty({id:product.id, qty:+value}))
                                        }}
                                        values={Array.from(
                                          Array(Number(currentQty)),
                                          (_, i) => i + 1
                                        )}
                                        Qty={product.quantity}
                                      />
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => { dispatch(removeFromCart(product)) }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${subtotal(cart)}.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link href='/checkout'>
                          <a
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </a>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
