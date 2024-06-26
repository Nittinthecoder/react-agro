/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useState } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Navbar from "../../navbar/Navbar";

import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductByIdAsync, selectProductById } from "../ProductSlice";

import { selectLoggedInUser } from "../../auth/authSlice";

import { addToCartAsync, selectItems } from "../../shopping-cart/CartSlice";

const size = [
  { name: "WHOLESALE", inStock: true },
  { name: "RETAIL", inStock: true },
];

const sizes = [
  { name: "1KG", inStock: true },
  { name: "2KG", inStock: true },
  { name: "3KG", inStock: true },
  { name: "4KG", inStock: true },
  { name: "5KG", inStock: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  // const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const user = useSelector(selectLoggedInUser);
  const product = useSelector(selectProductById);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const params = useParams();

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.productId === product.id) < 0) {
      const newItem = { ...product, productId:product.id, quantity: 1, user: user.id };
      delete newItem["id"];
      dispatch(addToCartAsync(newItem));
    } else {
      alert("Product has already been added")
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      <Navbar>
        <div className="bg-background">
          {product ? (
            <div className="pt-6">
              <nav aria-label="Breadcrumb">
                <ol
                  role="list"
                  className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
                >
                  {product.breadcrumbs &&
                    product.breadcrumbs.map((breadcrumb) => (
                      <li key={breadcrumb.id}>
                        <div className="flex items-center">
                          <a className="mr-2 text-sm font-medium text-gray-900">
                            {breadcrumb.title}
                          </a>
                          <svg
                            width={16}
                            height={20}
                            viewBox="0 0 16 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="h-5 w-4 text-gray-300"
                          >
                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                          </svg>
                        </div>
                      </li>
                    ))}
                  <li className="text-sm">
                    <a
                      aria-current="page"
                      className="font-medium text-gray-500 hover:text-gray-600"
                    >
                      {product.title}
                    </a>
                  </li>
                </ol>
              </nav>

              {/* Image gallery */}
              <div className="mx-6 mt-6 max-w-2xl sm:px-6 sm:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 ">
                <div className="aspect-h-3 aspect-w-3 hidden overflow-hidden border solid p-2 border-primary rounded-xl lg:block ">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center border solid bg-primary rounded-lg"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden border solid border-primary rounded-xl">
                    <img
                      src={product.images[1]}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden border solid  border-primary rounded-xl">
                    <img
                      src={product.images[2]}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg border solid border-primary rounded-xl ">
                  <img
                    src={product.images[3]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.title}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    Rs {product.price}
                  </p>

                  {/* Reviews */}
                  <form className="mt-10">
                    {/* Colors */}
                    {/* <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {col.map((color) => (
                          <RadioGroup.Option
                            key={col.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                col.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
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
                                "h-8 w-8 rounded-full border border-black border-opacity-10"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div> */}

                    {/* Measurement */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Purchase type
                        </h3>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only"></RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {size.map((size) => (
                            <RadioGroup.Option
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={({ active }) =>
                                classNames(
                                  size.inStock
                                    ? "cursor-pointer bg-black text-white shadow-sm w-[89px]"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-primary" : "",
                                  "group relative flex items-center justify-center rounded-md border px-5 text-xs font-bold uppercase hover:bg-secondary focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {size.inStock ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-primary bg-secondary "
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
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

                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-primary hover:text-secondary"
                        >
                          Size guide
                        </a>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a size
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {sizes.map((size) => (
                            <RadioGroup.Option
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={({ active }) =>
                                classNames(
                                  size.inStock
                                    ? "cursor-pointer bg-black text-white shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-primary" : "",
                                  "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-bold uppercase hover:bg-secondary focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {size.inStock ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-primary"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
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
                    <Link to="/cart">
                      <button
                        onClick={handleCart}
                        type="submit"
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:text-text focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Add to Cart
                      </button>
                    </Link>
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {/* {highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))} */}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-text">Details</h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{product.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Navbar>
    </div>
  );
}
