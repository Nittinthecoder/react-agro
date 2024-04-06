/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectItems } from "../shopping-cart/CartSlice";
import { selectLoggedInUser } from "../auth/authSlice";

const navigation = [
  // { name: "Dashboard", link: "#", user: true },
  { name: "Products", link: "/", user: true },
  { name: "Products", link: "/", admin: true },
  { name: "Admin-Products", link: "/admin", admin: true },
  { name: "Admin-Orders", link: "/admin/orders", admin: true },
];

const users = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser)
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-background">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-background pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-text"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="space-y-6 border-t border-primary px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/login"
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/signup"
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </div>

                <div className="border-t border-primary px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative ">
        <nav aria-label="Top" className=" max-w-8xl px-4   sm:px-6 lg:px-8">
          <div>
            <div className="flex h-16 items-center justify-between">
              {/* menu button in mobile devices */}
              <button
                type="button"
                className="relative rounded-md bg-background p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <img
                  className="h-8 w-auto"
                  src="https://i.pinimg.com/originals/30/34/5a/30345a99c8bc23f42d6b9848227b1f0d.jpg"
                  alt=""
                />
              </div>

              <div className="flex flex-row">
                {navigation.map((item) =>
                  item[user.role] ? (
                    <Link
                      to={item.link}
                      key={item.name}
                      className={classNames(
                        item.current
                          ? "bg-secondary text-white"
                          : "text-text hover:bg-secondary hover:text-text",
                        "rounded-xl px-3 py-2 ml-3 mr-[-1rem] text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ) : null
                )}
              </div>

              <div className="ml-auto flex items-center">
                {user && <div className=" font-normal"> <span className="text-rose-600 font-semibold mr-2">Hello</span> {user.email}</div> }
                {!user && <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to="/login"
                    href="#"
                    className="text-sm font-medium text-text hover:text-gray-500"
                  >
                    Sign in
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link
                    to="signup"
                    href="#"
                    className="text-sm font-medium text-text hover:text-gray-500"
                  >
                    Create account
                  </Link>
                </div>}

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-text hover:text-gray-500"
                  >
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt="india"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">IND</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}
                

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <Link to="/Cart">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-primary "
                        aria-hidden="true"
                      />
                    </Link>
                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-3xl mb-7 -ml-3 bg-black px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}
                    {/* <span className="inline-flex items-center rounded-3xl mb-7 -ml-3 bg-black px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span> */}
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>

                {/* Profile dropdown */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Menu as="div" classNam="relative ml-3">
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={users.imageUrl}
                        alt=""
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute  z-10 mt-2 w-48 right-3 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:origin-top-right lg:right-14">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.link}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default Navbar;
