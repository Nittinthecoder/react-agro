import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearSelectedProduct, createProductAsync,  fetchProductByIdAsync, selectAllProducts, selectCategories, selectProductById, updateProductAsync } from "../../product/ProductSlice";
import { useEffect } from "react";

function ProductForm() {
  const params = useParams();;
  const category = useSelector(selectCategories);
  const selectedProduct = useSelector(selectProductById);
  const products = useSelector(selectAllProducts);
  const disptach = useDispatch();
//   console.log(category);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // formState: { errors },
  } = useForm();




  useEffect(() => {
    if (params.id) {
      disptach(fetchProductByIdAsync(params.id));
    } else {
      disptach(clearSelectedProduct())
    }
  },[params.id, disptach])

  useEffect(()=>{
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title)
      setValue('description', selectedProduct.description)
      setValue('details', selectedProduct.details)
      setValue('price', selectedProduct.price)
      setValue('stock', selectedProduct.stock)
      setValue('category', selectedProduct.category)
      setValue('thumbnail', selectedProduct.thumbnail)
      setValue('image1', selectedProduct.images[0])
      setValue('image2', selectedProduct.images[1])
      setValue('image3', selectedProduct.images[2])
      setValue('image4', selectedProduct.images[3])
    }
  },[selectedProduct, params.id, setValue])

  const handleDelete = () =>{
    const product = {...selectedProduct};
    product.deleted = true;
    disptach(updateProductAsync(product));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 mb-5 flex ">
      <form noValidate onSubmit={handleSubmit((data) => {
        // console.log(data)
        const product = {...data}
        product.images = [product.image1,product.image2,product.image3,product.image4]
        product.rating = 0;
        delete product['images1']
        delete product['images2']
        delete product['images3']
        delete product['images4']
        product.price = +product.price;
        product.stock = +product.stock;
        console.log(product)

        if(params.id) {
          product.id = params.id;
          product.rating = selectedProduct.rating || 0;
          disptach(updateProductAsync(product))
          reset();
        } else {
          disptach(createProductAsync(product))
          reset();
        }
      })}>
        <div>
          <div className="border-b border-gray-900/10 relative mx-auto w-auto sm:top-[3rem] pb-12">
          {selectedProduct.deleted  && <h2 className="text-base font-bold animate-pulse leading-7 text-rose-600 mb-2">
              This product has been deleted
            </h2>}
            <h2 className="text-base font-semibold  leading-7 text-gray-900">
              Product Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="title"
                    {...register("title", {
                      required: "title is required",
                    })}
                    id="title"
                    autoComplete="given-name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Description
                </label>
                <div className="mt-2">
                  <textarea
                    type="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    id="description"
                    rows={5}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Details
                </label>
                <div className="mt-2">
                  <textarea
                    type="details"
                    {...register("details", {
                      required: "details is required",
                    })}
                    id="details"
                    rows={5}
                    className="block w-full px-2  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Price
                </label>
                <div className="mt-2">
                  <input
                    type="price"
                    {...register("price", {
                      required: "price is required",
                      min: 0,
                      max: 50000,
                    })}
                    id="price"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Stock
                </label>
                <div className="mt-2">
                  <input
                    type="stock"
                    {...register("stock", {
                      required: "stock is required",
                      min: 0,
                      max: 50000,
                    })}
                    id="stock"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    {category.map((item) => (
                      <option className="px-2" value={item.value}>{item.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-full">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Thumbnail
                </label>
                <div className="mt-2">
                  <input
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product <span className="text-purple-400">Image1</span>
                </label>
                <div className="mt-2">
                  <input
                    {...register("image1", {
                      required: "image1 is required",
                    })}
                    id="image1"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="Image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product <span className="text-purple-400">Image2</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image2", {
                      required: "image2 is required",
                    })}
                    id="image2"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="Image3-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product <span className="text-purple-400">Image3</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image3", {
                      required: "image3 is required",
                    })}
                    id="image3"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="image4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product <span className="text-purple-400">Image4</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("image4", {
                      required: "image4 is required",
                    })}
                    id="image4"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center relative sm:top-[5rem] justify-end gap-x-6">
          <Link
            to="/admin"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          {selectedProduct && <button
          onClick={handleDelete}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Delete
        </button>}
          <Link
            onSubmit={handleSubmit}
            to="/admin"
            className="rounded-md bg-primary text-text px-3 py-2 text-sm font-semibold  shadow-sm hover:text-background hover:bg-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
