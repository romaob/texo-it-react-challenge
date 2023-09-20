import React from 'react'
import { strings } from '../values/strings';

export interface PageWrapperProps {
    title?: string;
    children: React.ReactNode;
}

export default function PageWrapper({
    title,
    children
}: PageWrapperProps): JSX.Element {
  return (
    <div className='page-wrapper' data-testid='page-wrapper'>
      <div className='page-wrapper-header'>
        <h1>{strings.appName}</h1>
      </div>
      <div className='page-wrapper-body'>
        <div className='page-wrapper-menu' data-testid='page-wrapper-menu'>
            Menu
        </div>
        <div className='page-wrapper-content'>
            <h2>{title}</h2>
            {children}
        </div>
      </div>
    </div>
  )
}
