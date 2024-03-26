/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";

export default function UsrProfile() {
  const user = useSelector(selectLoggedInUser);
  return (
    <div className="bg-background h-screen">
      <div className="mx-auto  bg-background max-w-7xl px-4 sm:px-6 lg:px-8 mb-5 ">
        <div className="border-t border-primary px-4 py-6 sm:px-6">
          <h1 className="text-4xl  font-bold tracking-tight text-gray-900">
            Name : {user.addresses.name ? user.addresses.name : "NEW USER"}
          </h1>
          <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
            Email : {user.email ? user.email : "NEW USER"}
          </h3>
          <div className="flow-root"></div>
        </div>

        <div className="border-t border-primary px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-sm text-gray-500"> Address :</p>
          {user.addresses.map((address) => (
            <div className="flex justify-between gap-x-6 px-5 py-5 mt-4 border-solid border-2 border-accent">
              <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {address.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {address.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Phone: {address.phone}
                </p>
                <p className="text-sm leading-6 text-gray-500">
                  {address.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
