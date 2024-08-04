'use client'
import Image from 'next/image';

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import {  handleLogOut } from "../redux/LoginSlice"
import Link from 'next/link'

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Clients chat', href: '/contact', current: false },
    { name: 'Sign up', href: '/signup', current: false },
    { name: 'login', href: '/login', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

export default function DefaultNavBar() {
    // const [signBtnActive,setSignBtnActive]=useState(1)
    const user=useSelector(state=>state.login)
    const [items,setItems]=useState(localStorage.getItem('items'))
    const dispatch=useDispatch()
  const handleClick=()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You will sign out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Signed out!",
          text: "You have been signed out",
          icon: "success"
        });
        dispatch(handleLogOut())
      }
    });
  }

  
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-24 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-12 w-auto"
                    src="shop-solid.svg"
                    alt="Company logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      (!user.user ||item.name=='Home' ||item.name=='Clients chat') &&
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-xl font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3  flex md:gap-14 sm:gap-4 gap-2 items-center">
                {user.user&&
                <Link   className='flex gap-1 ' href={('/cart')}>
                <img
                    className=""
                    src="cart-shopping-solid.svg"
                    alt="Company logcart to"
                  />
                  <span className="inline-flex  items-center rounded-3xl px-2 py-1 text-xs font-medium  text-orange-400 ring-2 ring-orange-400  ">{user.totalItemsInCart}</span>
                  </Link>
                }
                {user.user&&
                  <Link    href={('/profile')}>
                      <img
                      className=""
                      src="address-card-regular.svg"
                      alt="Company logcart to"
                      />
                    </Link>
                }
                  {user.user&&
                    <button onClick={handleClick} className='bg-orange-400 p-2 rounded text-xl' >Sign out</button>
                  }
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                 
                  (!user.user ||item.name=='Home' ||item.name=='Clients chat')&&
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

