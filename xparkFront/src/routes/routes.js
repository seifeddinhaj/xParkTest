import React from 'react'

const States = React.lazy(() => import('../views/modules/States/States'))
const Vehicles = React.lazy(() => import('../views/modules/Vehicles/Vehicles/Vehicles'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/states', name: 'states', component: States },
  { path: '/vehicles', name: 'vehicles', component: Vehicles },
]

export default routes
