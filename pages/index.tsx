import type { NextPage } from 'next'
import Layout from 'components/layout'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'components/Redux/hooks'
import { getProducts } from 'lib/functions'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import PopUp from 'components/productPopUp'
import { setCurrentItemId } from 'components/Redux/Slices/currentItemSlice'
import { extractSheets } from "spreadsheet-to-json"
import { Color, DetailedProduct, Highlights, Image, Quantity, Size } from 'types'
import { getItems } from 'components/Redux/Slices/itemSlice'



const collections = [
  {
    name: "Women's",
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-01.jpg',
    imageAlt: 'Woman wearing a comfortable cotton t-shirt.',
  },
  {
    name: "Men's",
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-02.jpg',
    imageAlt: 'Man wearing a comfortable and casual cotton t-shirt.',
  },
  {
    name: 'Desk Accessories',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-04-collection-03.jpg',
    imageAlt:
      'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
  },
]

const perks = [
  {
    name: 'Free returns',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.',
  },
  {
    name: 'Same day delivery',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.',
  },
  {
    name: 'All year discount',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: 'For the planet',
    imageUrl:
      'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.',
  },
]

type Props = {
  products?: DetailedProduct[],
}

const Home: NextPage = ({ products }: Props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (products) {
      dispatch(getItems(products))
      console.log(products)
    }
  }, [])
  const trendingProducts = useAppSelector(state => state.item)

  useEffect(() => { console.log(trendingProducts) }, [trendingProducts])

  const thisProduct = useAppSelector(state => state.currentItem)

  const [open, setOpen] = useState(false)


  return (
    <div className="">
      <Layout>
        <main>
          {/* Hero section */}
          <div className="relative">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 hidden sm:flex sm:flex-col"
            >
              <div className="relative w-full flex-1 bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div className="h-32 w-full bg-white md:h-40 lg:h-48" />
            </div>

            <div className="relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8">
              {/* Background image and overlap */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex flex-col sm:hidden"
              >
                <div className="relative w-full flex-1 bg-gray-800">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/home-page-04-hero-full-width.jpg"
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gray-900 opacity-50" />
                </div>
                <div className="h-48 w-full bg-white" />
              </div>
              <div className="relative py-32">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Mid-Season Sale
                </h1>
                <div className="mt-4 sm:mt-6">
                  <Link href="/product">
                    <a
                      className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700"
                    >
                      Shop Collection
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <section
              aria-labelledby="collection-heading"
              className="relative -mt-96 sm:mt-0"
            >
              <h2 id="collection-heading" className="sr-only">
                Collections
              </h2>
              <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 sm:px-6 lg:gap-x-8 lg:px-8">
                {collections.map((collection) => (
                  <div
                    key={collection.name}
                    className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-w-4 sm:aspect-h-5 sm:h-auto"
                  >
                    <div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 overflow-hidden rounded-lg"
                      >
                        <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                          <img
                            src={collection.imageSrc}
                            alt={collection.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                      </div>
                      <div className="absolute inset-0 flex items-end rounded-lg p-6">
                        <div>
                          <p aria-hidden="true" className="text-sm text-white">
                            Shop the collection
                          </p>
                          <h3 className="mt-1 font-semibold text-white">
                            <a href={collection.href}>
                              <span className="absolute inset-0" />
                              {collection.name}
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section aria-labelledby="trending-heading">
            <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
              <div className="md:flex md:items-center md:justify-between">
                <h2
                  id="favorites-heading"
                  className="text-2xl font-extrabold tracking-tight text-gray-900"
                >
                  Trending Products
                </h2>
                <Link href="/product">
                  <a
                    className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block"
                  >
                    Shop the collection<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
                {trendingProducts?.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80 aspect-w-4 aspect-h-3 bg-gray-100">

                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                      <div className="flex items-center p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                        <div className="w-full rounded-md bg-gray-300 bg-opacity-75 py-2 px-4  text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                          View Product
                        </div>
                      </div>
                    </div>

                    <h3
                      onClick={() => { setOpen(true); dispatch(setCurrentItemId(product.id)) }}

                      className="mt-4 text-sm text-gray-700 cursor-pointer">
                      {/* <Link href={product.href}> */}
                      {/* <a> */}
                      <PopUp open={open} setOpen={setOpen} />

                      <span className="absolute inset-0" />
                      {product.name}
                      {/* </a>
                      </Link> */}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      ${product.price}.00
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-sm md:hidden">
                <Link href="/product">
                  <a
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Shop the collection<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="perks-heading"
            className="border-t border-gray-200 bg-gray-50"
          >
            <h2 id="perks-heading" className="sr-only">
              Our perks
            </h2>

            <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
                {perks.map((perk) => (
                  <div
                    key={perk.name}
                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                  >
                    <div className="md:flex-shrink-0">
                      <div className="flow-root">
                        <img
                          className="-my-1 mx-auto h-24 w-auto"
                          src={perk.imageUrl}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
                        {perk.name}
                      </h3>
                      <p className="mt-3 text-sm text-gray-500">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  try {
    let trendingProducts;
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
        let detailedProducts = data.items.map((item: DetailedProduct) => {
          const images = data.images.filter((image: Image) => image.id === item.id)
          const highlights = data.highlights.filter((highlight: Highlights) => highlight.id === item.id)
          const colors = data.colors.filter((color: Color) => color.id === item.id)
          const sizes = data.sizes.filter((size: Size) => size.id === item.id)
          let quantities = data.colorSizesQty.filter((variant: Quantity) => variant.id === item.id)
          return item = { ...item, images, highlights, colors, sizes, quantities }
        }
        )
        trendingProducts = detailedProducts
      }
    );
    return {
      props: {
        products: trendingProducts,
      }
    }
  } catch (error) {
    console.log(error)
  }
}