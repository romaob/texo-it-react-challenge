import React, { useState } from 'react';
import { strings } from '../values/strings';
import { ROUTES } from '../values/routes';
import Button from './Button';

export interface PageWrapperProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * Page wrapper component, used to display the default components on all pages
 * @prop {string} title - The title of the page
 * @prop {React.ReactNode} children - The children to be displayed on the page
 * @returns JSX.Element
 */
export default function PageWrapper({
  title,
  children,
}: PageWrapperProps): JSX.Element {
  const [menuShow, setMenuShow] = useState(false);

  return (
    <div className="page-wrapper" data-testid="page-wrapper">
      <div className="page-wrapper-header">
        <div
          className="page-wrapper-header-button"
          data-show={menuShow}
          data-testid="page-wrapper-header-button"
        >
          <Button
            type="text"
            icon="menu"
            onClick={() => setMenuShow(!menuShow)}
            testId="toggle-menu"
          />
        </div>
        <h1 data-testid="page-wrapper-app-name">{strings.appName}</h1>
      </div>
      <div className="page-wrapper-body">
        <div
          className="page-wrapper-menu"
          data-testid="page-wrapper-menu"
          data-show={menuShow}
        >
          {Object.values(ROUTES).map((route) => (
            <Button
              key={route.path}
              text={route.name}
              type="text"
              contrast
              link={route.path}
            />
          ))}
        </div>
        <div className="page-wrapper-content">
          <h2 data-testid="page-wrapper-title">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
