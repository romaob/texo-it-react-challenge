import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { ROUTES } from '../values/routes'

export default function Dashboard(): JSX.Element {
  return (
    <PageWrapper title={ROUTES.DASHBOARD.name}>
        <div>Dashboard</div>
    </PageWrapper>
  )
}
