import React from 'react'

export interface SkeletonProps {
    loading?: boolean;
    children?: React.ReactNode;
    rounded?: boolean;
    flex?: boolean;
    testId?: string;
}

export default function Skeleton({
    loading,
    children,
    rounded,
    flex,
    testId = 'skeleton',
} : SkeletonProps): JSX.Element {
  return (
    <div 
      className='skeleton' 
      data-loading={loading} 
      data-rounded={rounded} 
      data-flex={flex} 
      data-testid={testId}>
        {children}
    </div>
  )
}
