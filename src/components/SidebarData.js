import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

var chatData = JSON.parse(localStorage.getItem("chatData"));
setInterval(() => {
  chatData = JSON.parse(localStorage.getItem("chatData"));
  // console.log(chatData)
}, 100);
// console.log(chatData)

export const SidebarData = [
  {
    title: 'Profile',
    path: '/profile',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Edit Profile',
        path: '/profile/editprofile',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'profile validation',
        path: '/profile/validateprofile',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Home Search',
    path: '/homesearch',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Recent viewed',
        path: '/homesearch/recentviewed',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Favorites',
        path: '/homesearch/favorites',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Selling',
    path: '/selling',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Sell my home',
        path: '/selling/sellhome',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Listing analysis',
        path: '/selling/listanalysis',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Mortgage',
    path: '/mortgage',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Mortgage Calculator ',
        path: '/mortgage/mortgagecal1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Mortgage Calculator',
        path: '/mortgage/mortgagecal2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: chatData?.map(item => {
      return {
        title: item.user,
        path: `/messages/${item.room}`,
        icon: <IoIcons.IoIosPaper />
      }
    })
  },
  {
    title: 'Account ',
    path: '/account',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Settings',
        path: '/account/settings',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Feedback',
        path: '/account/feedback',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Help Center',
        path: '/account/helpcenter',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Support',
        path: '/account/support',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
];
