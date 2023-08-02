import React from "react";
import * as FaIcons from 'react-icons/fa'
import * as BsIcons from 'react-icons/bs'
// import * as BiIcons from 'react-icons/bi'
import * as GiIcons from 'react-icons/gi'
// import * as RiIcons from 'react-icons/ri'


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    // Dashboard
    icon: <FaIcons.FaTable/>
  },
  {
    title: 'Driver',
    path: '/driver',
    icon: <BsIcons.BsFillPersonPlusFill/>
  },
  {
    title: 'Cab',
    path: '/cab',
    icon: <BsIcons.BsTaxiFrontFill/>
  },  
  {
    title: 'Assign Driver',
    path: '/assign-driver',
    icon: <FaIcons.FaAddressCard/>,
  },
  {
    title: 'Assign Cab',
    path: '/assign-cab',
    icon: <GiIcons.GiCarKey/>,
  }
  


  // {
  //   title: 'Driver',
  //   path: '/driver',
  //   icon: <BsIcons.BsPersonBoundingBox/>,
  //   iconClosed: <RiIcons.RiArrowDownSFill/>,
  //   iconOpened: <RiIcons.RiArrowUpSFill/>,
  //   subNav: [
  //     {
  //       title: 'Add Driver',
  //       path: '/driver',
  //       icon: <BsIcons.BsFillPersonPlusFill/>,
  //     },
  //     {
  //       title: 'Assign Cab',
  //       path: '/assign-cab',
  //       icon: <GiIcons.GiCarKey/>,
  //     },
  //   ]
  // },
  // {
  //   title: 'Cab',
  //   path: '/cab',
  //   icon: <BsIcons.BsTaxiFrontFill/>,
  //   iconClosed: <RiIcons.RiArrowDownSFill/>,
  //   iconOpened: <RiIcons.RiArrowUpSFill/>,
  //   subNav: [
  //     {
  //       title: 'Add Cab',
  //       path: '/cab',
  //       icon: <BiIcons.BiSolidCarWash/>,
  //     },
  //     {
  //       title: 'Assign Driver',
  //       path: '/assign-driver',
  //       icon: <FaIcons.FaAddressCard/>,
  //     },
  //   ]
  // }
]