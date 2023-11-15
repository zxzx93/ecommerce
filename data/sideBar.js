import { BsPatchPlus } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { ImUsers } from 'react-icons/im';
import { IoListCircleSharp } from 'react-icons/io5';
import { MdOutlineCategory, MdSpaceDashboard } from 'react-icons/md';
import { RiCoupon3Fill } from 'react-icons/ri';

const sidebarItems = {
  nav: [
    {
      route: 'Dashboard',
      href: '/admin/dashboard',
      icon: <MdSpaceDashboard />,
    },
    {
      route: 'Sales',
      href: '/admin/sales',
      icon: <FcSalesPerformance />,
    },
    {
      route: 'Orders',
      href: '/admin/orders',
      icon: <IoListCircleSharp />,
    },
    {
      route: 'Users',
      href: '/admin/users',
      icon: <ImUsers />,
    },
    {
      route: 'Messages',
      href: '/admin/messages',
      icon: <MdSpaceDashboard />,
    },
  ],

  Product: [
    {
      route: 'All Products',
      href: '/admin/dashboard/product/all',
      icon: <FaThList />,
    },
    {
      route: 'Create Product',
      href: '/admin/dashboard/product/create',
      icon: <BsPatchPlus />,
    },
  ],

  Categories: [
    {
      route: 'Categories',
      href: '/admin/dashboard/categories',
      icon: <MdOutlineCategory />,
    },
    {
      route: 'Sub-Categories',
      href: '/admin/dashboard/subCategories',
      icon: <MdOutlineCategory />,
    },
  ],

  Coupons: [
    {
      route: 'Coupons',
      href: '/admin/dashboard/coupons',
      icon: <RiCoupon3Fill />,
    },
  ],
};

export default sidebarItems;
