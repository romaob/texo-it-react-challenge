import React from 'react'

export interface SkeletonProps {
    loading?: boolean;
    children?: React.ReactNode;
    rounded?: boolean;
    flex?: boolean;
}

export default function Skeleton({
    loading,
    children,
    rounded,
    flex
} : SkeletonProps): JSX.Element {
  return (
    <div 
      className='skeleton' 
      data-loading={loading} 
      data-rounded={rounded} 
      data-flex={flex} 
      data-testid='skeleton'>
        {children}
    </div>
  )
}
