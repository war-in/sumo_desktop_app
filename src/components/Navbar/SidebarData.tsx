import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as TbIcons from 'react-icons/tb';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FiIcons.FiHome/>,
    cName: 'nav-text'
  },
  {
    title: 'Weighting',
    path: '/',
    icon: <FaIcons.FaWeight/>,
    cName: 'nav-text'
  },
  {
    title: 'Draw',
    path: '/',
    icon: <GiIcons.GiCubes/>,
    cName: 'nav-text'
  },
  {
    title: 'Tournament',
    path: '/',
    icon: <TbIcons.TbTournament/>,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/',
    icon: <TbIcons.TbReportAnalytics/>,
    cName: 'nav-text'
  }
]