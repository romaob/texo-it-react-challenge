import React, { useState } from 'react'
import { strings } from '../values/strings';
import { ROUTES } from '../values/routes';
import Button from './Button';

export interface PageWrapperProps {
    title?: string;
    children: React.ReactNode;
}

export default function PageWrapper({
    title,
    children
}: PageWrapperProps): JSX.Element {
    const [menuShow, setMenuShow] = useState(false);

  return (
    <div className='page-wrapper' data-testid='page-wrapper'>
      <div className='page-wrapper-header'>
        <div className='page-wrapper-header-button'>
            <Button type='text' icon='menu' onClick={() => setMenuShow(!menuShow)}/>
        </div>
        <h1>{strings.appName}</h1>
      </div>
      <div className='page-wrapper-body'>
        <div className='page-wrapper-menu' data-testid='page-wrapper-menu' data-show={menuShow}>
            {Object.values(ROUTES).map((route) => (
                <Button key={route.path} text={route.name} type='text' contrast link={route.path} />
            ))}
        </div>
        <div className='page-wrapper-content'>
            <h2>{title}</h2>
            {children}
        </div>
      </div>
    </div>
  )
}
