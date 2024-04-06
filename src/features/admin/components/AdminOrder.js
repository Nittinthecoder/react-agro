import { useEffect, useState } from "react";
import { ITEMS_PER_ORDER_PAGE, ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  // selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import PaginationOrder from "../../common/PaginationOrder";

/* eslint-disable jsx-a11y/alt-text */

function AdminOrder() {
  const [page, setPage] = useState(1);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  console.log(orders);
    const totalOrders = useSelector(selectTotalOrders);

  // const handleShow = (order) => {

  // };

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    e.preventDefault();
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-200 text-purple-600";
      case "Dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "Delivered":
        return "bg-green-200 text-green-600";
      case "Cancelled":
        return "bg-red-200 text-red-600";
      case "Processing":
        return "bg-blue-200 text-blue-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_ORDER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className=" flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Order Number</th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                      {order.items.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={item.thumbnail}
                                />
                              </div>
                              <span>
                                {item.title} - Total Items:{item.quantity}
                                <div>
                                  Rs:{item.discountPrice} + Shipping:{" "}
                                  {item.shippingCost ? item.shippingCost : 0}{" "}
                                  rs.
                                </div>
                              </span>
                            </div>
                          ))}
                      </td>
                      <td className="py-3 px-6 text-center md:table-cell">
                          <div className="flex items-center justify-center">
                            Rs:{order.totalAmount}
                          </div>
                        </td>
                      <td className="py-3 px-6 text-center md:table-cell">
                          <div className="">
                            <div>
                              <strong className="text-gray-900 text-sm">
                                {order.selectedAddress.name}
                              </strong>
                              ,
                            </div>
                            <div>{order.selectedAddress.street},</div>
                            <div>
                              {order.selectedAddress.city},
                              {order.selectedAddress.state},
                              {order.selectedAddress.pinCode},{" "}
                            </div>
                            <div>{order.selectedAddress.phone}, </div>
                          </div>
                        </td>
                      <td className="py-3 px-6 text-center md:table-cell">
                        <div className="inline-flex rounded-md bg-white text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          {order.id === editableOrderId ? (
                            <select
                              className="appearance-none outline-none border-none bg-transparent focus:ring-0"
                              onChange={(e) => handleUpdate(e, order)}
                            >
                              <option value="">Select status</option>
                              <option value="Pending">Pending</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Processing">Processing</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-7 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-6 h-6"
                              // onClick={(e) => handleShow(order)}
                            />
                          </div>
                          <div className="w-4 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-6 h-6"
                              onClick={(e) => handleEdit(order)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationOrder
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalOrders}
              ></PaginationOrder>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminOrder;
