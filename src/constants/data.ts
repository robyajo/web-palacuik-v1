import { NavItem } from "../../types";



//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Product',
    url: '/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Transaction',
    url: '/transaction',
    icon: 'transaction',
    shortcut: ['t', 't'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Rekap',
    url: '/rekap',
    icon: 'rekap',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] // No child items
  },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: true,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     },
  //     {
  //       title: 'Login',
  //       shortcut: ['l', 'l'],
  //       url: '/',
  //       icon: 'login'
  //     }
  //   ]
  // },

];
export const navItemsAdmin: NavItem[] = [
  {
    title: 'Marketplace',
    url: '/market',
    icon: 'marketplace',
    isActive: false,
    shortcut: ['m', 'm'],
    items: [] // Empty array as there are no child items for Dashboard
  },


];


export type Market = {
  uuid: string;
  name: string;
  logo?: File;
};