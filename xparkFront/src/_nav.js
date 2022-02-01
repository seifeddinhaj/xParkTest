import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilDrop, cilGraph, cilLifeRing, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'States',
  },
  {
    component: CNavItem,
    name: 'states',
    to: '/states',
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'vehicles ',
  },
  {
    component: CNavItem,
    name: 'vehicles',
    to: '/vehicles',
    icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
  },
]


export default _nav
