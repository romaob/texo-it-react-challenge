import React from 'react';

export interface SkeletonProps {
  loading?: boolean;
  children?: React.ReactNode;
  rounded?: boolean;
  flex?: boolean;
  testId?: string;
}

/**
 * Easy to use skeleton component, used to display loading states
 * @prop {boolean} loading - If the skeleton should be displayed as loading
 * @prop {React.ReactNode} children - The children to be displayed inside the skeleton
 * @prop {boolean} rounded - If the skeleton should be displayed as rounded
 * @prop {boolean} flex - If the skeleton should be displayed as flex
 * @prop {string} testId - The test id to be used on the tests
 * @returns JSX.Element
 */
export default function Skeleton({
  loading,
  children,
  rounded,
  flex,
  testId = 'skeleton',
}: SkeletonProps): JSX.Element {
  return (
    <div
      className="skeleton"
      data-loading={loading}
      data-rounded={rounded}
      data-flex={flex}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
