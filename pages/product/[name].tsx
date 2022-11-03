import { StarIcon } from '@heroicons/react/24/solid'
import Layout from 'components/layout'
import { classNames } from 'lib'
import { useEffect, useState } from 'react'
import { reviews } from '../../lib/data'
import { Color, DetailedProduct, Highlights, Image, Product, Quantity, Size } from 'types'
import { addToCart } from 'components/Redux/Slices/cartSlice'
import { useDispatch } from 'react-redux'
import { RadioGroup } from '@headlessui/react'
import { updateQty } from 'components/Redux/Slices/qtySlice'
import { extractSheets } from "spreadsheet-to-json"
import fs from 'fs'

type ProductData = {
  products: DetailedProduct[]
  highlights: Highlights[]
  images: Image[]
  colors: Color[]
  sizes: Size[]
  colorSizesQty: Quantity[]
}

type Props = {
  product: DetailedProduct,
}

export default function ProductPage({ product }: Props) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const [selectedQuantity, setSelectedQuantity] = useState<string>('0')

  let currentTheme = product.quantities.find(theme => theme.color === selectedColor.name
    && theme.size === selectedSize.name)

  useEffect(() => {
    if (product.colors.length === 0) {
      setSelectedColor({
        id: '',
        name: '',
        class: '',
        selectedClass: ''
      })
    }

    if (product.sizes.length === 0) {
      setSelectedSize({
        id: '',
        name: '',
        inStock: ''
      })
    }
    if (currentTheme) {
      setSelectedQuantity(currentTheme.qty)
      dispatch(updateQty(currentTheme.qty))
    }
    else {
      setSelectedQuantity(product.availableQty)
      dispatch(updateQty(product.availableQty))
    }
  }, [selectedSize, selectedColor])

  return (
    <Layout>
      <main className="pt-10 sm:pt-8 md:pt-0">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={product.images[1].src}
                alt={product.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:py-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? 'text-gray-900'
                          : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              {product.colors.length !== 0 &&
                <div>
                  <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
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
                            {color.name}
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
              }
              {/* Sizes */}
              {product.sizes.length !== 0 &&
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              size.inStock
                                ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                : 'bg-gray-50 text-gray-300 cursor-not-allowed',
                              active ? 'ring-2 ring-indigo-500 bg-indigo-500 text-white hover:text-gray-900' : '',
                              'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'absolute -inset-px rounded-md pointer-events-none'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                >
                                  <svg
                                    className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              }

              <button
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => { dispatch(addToCart({ product, color: (product.color.length === 0 ? '' : selectedColor.name), size: (product.sizes.length === 0 ? '' : selectedSize.name), availableQty: selectedQuantity })) }}
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((item, idx) => (
                    <li key={idx} className="text-gray-400">
                      <span className="text-gray-600">{item.highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-sm font-medium text-gray-900"
              >
                Details
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Reviews */}
            <section
              aria-labelledby="reviews-heading"
              className="border-t border-gray-200 pt-10 lg:pt-16"
            >
              <h2 id="reviews-heading" className="sr-only">
                Reviews
              </h2>

              <div className="space-y-10">
                {reviews.featured.map((review) => (
                  <div key={review.id} className="flex flex-col sm:flex-row">
                    <div className="order-2 mt-6 sm:mt-0 sm:ml-16">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.title}
                      </h3>
                      <p className="sr-only">{review.rating} out of 5 stars</p>

                      <div
                        className="mt-3 space-y-6 text-sm text-gray-600"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                    </div>

                    <div className="order-1 flex items-center sm:flex-col sm:items-start">
                      <img
                        src={review.avatarSrc}
                        alt={`${review.author}.`}
                        className="h-12 w-12 rounded-full"
                      />

                      <div className="ml-4 sm:ml-0 sm:mt-4">
                        <p className="text-sm font-medium text-gray-900">
                          {review.author}
                        </p>
                        <div className="mt-2 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating
                                  ? 'text-gray-900'
                                  : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  try {
    let products: Product[];
    const credentials = JSON.parse(
      Buffer.from(process.env.secret!, 'base64').toString()
    )
    await extractSheets(
      {
        spreadsheetKey: process.env.sheet_key,
        credentials,
        sheetsToExtract: ["items", "highlights", "images", "colors", "sizes", "colorSizesQty"],
      },
      function (err: Error, data: any) {
        products = data.items
        let newData = {
          products: data.items,
          highlights: data.highlights,
          images: data.images,
          colors: data.colors,
          sizes: data.sizes,
          colorSizesQty: data.colorSizesQty
        }

        fs.writeFile('data.txt', JSON.stringify(newData), (err) => {
          if (err) throw err;
        })
      }
    );
    return {
      paths: products!.map((item: Product) => ({
        params: { name: item.id },
      }))
      , fallback: false
    }
  } catch (error) {
    console.log(error)
  }

}

export async function getStaticProps({ params }: { params: { name: string } }) {
  let currentProduct;
  // try {


  let productData: ProductData
  const fileData = await fs.promises.readFile('data.txt', "utf8")
  console.log(fileData);

  productData = JSON.parse(fileData)

  let highlights = productData?.highlights.filter((item: Highlights) => item.id === params.name)
  let images = productData?.images.filter((item: Image) => item.id === params.name)
  let colors = productData?.colors.filter((item: Color) => item.id === params.name)
  let newSizes = productData?.sizes.filter((item: Size) => item.id === params.name)
  let sizes = newSizes.map((size: Size) => {
    return { ...size, inStock: JSON.parse(size.inStock) }
  })

  let quantities = productData.colorSizesQty.filter((item: Quantity) => item.id === params.name)
  currentProduct = productData.products.find((item: DetailedProduct) => item.id === params.name)

  currentProduct = { ...currentProduct, highlights, images, colors, sizes, quantities }

  // const credentials = JSON.parse(
  //   Buffer.from(process.env.secret!, 'base64').toString()
  // )
  // await extractSheets(
  //   {
  //     spreadsheetKey: process.env.sheet_key,
  //     credentials,
  //     sheetsToExtract: ["items", "highlights", "images", "colors", "sizes", "colorSizesQty"],
  //   },
  //   function (err: Error, data: any) {
  //     let highlights = data.highlights.filter((item: Highlights) => item.id === params.name)
  //     let images = data.images.filter((item: Image) => item.id === params.name)
  //     let colors = data.colors.filter((item: Color) => item.id === params.name)
  //     let newSizes = data.sizes.filter((item: Size) => item.id === params.name)
  //     let sizes = newSizes.map((size: Size) => {
  //       return { ...size, inStock: JSON.parse(size.inStock) }
  //     })

  //     let quantities = data.colorSizesQty.filter((item: Quantity) => item.id === params.name)
  //     currentProduct = data.items.find((item: DetailedProduct) => item.id === params.name)
  //     currentProduct = { ...currentProduct, highlights, images, colors, sizes, quantities }
  //   }
  // );

  // } catch (error) {
  //   console.log(error)
  // }
  return {
    props: {
      product: currentProduct,
    }
  }


}

