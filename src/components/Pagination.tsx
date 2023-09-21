import React, { useEffect, useState } from 'react'
import Button from './Button';
import Skeleton from './Skeleton';

export interface PaginationProps {
    loading?: boolean;
    currentPage: number;
    limit?: number;
    onPageChange?: (page: number) => void;
    pageSize: number;
    totalItems: number;
}

export default function Pagination({
    loading,
    currentPage,
    limit,
    onPageChange,
    pageSize,
    totalItems,
}: PaginationProps): JSX.Element {
    const [pages, setPages] = useState<number[]>([]);

    /**
     * Handle the "go to first page" button click
     */
    function handleFirstPageClick() {
        onPageChange && onPageChange(0);
    }

    /**
     * Handle the "go to previous page" button click
     */
    function handlePreviousPageClick() {
        onPageChange && onPageChange(currentPage - 1);
    }

    /**
     * Handle the "go to next page" button click
     */
    function handleNextPageClick() {
        onPageChange && onPageChange(currentPage + 1);
    }

    /**
     * Handle the "go to last page" button click
     */
    function handleLastPageClick() {
        onPageChange && onPageChange(Math.ceil(totalItems / pageSize) - 1);
    }

    /**
     * Handle page button click
     * @param page
     */
    function handlePageClick(page: number) {
        onPageChange && onPageChange(page);
    }

    /**
     * Filter the available pages to display
     * Always showing one more if the current page is not the last (of the available pages)
     * And always showing one less if the current page is not the first (of the available pages)
     */
    useEffect(() => {
        const pagesArray = Array.from(Array(Math.ceil(totalItems / pageSize)).keys());
        //If there is no limit, show all pages
        if (!limit) {
            setPages(pagesArray);
            return;
        }        
        //If the current page is the first, show the first "limit" pages
        if (currentPage === 0) {
            setPages(pagesArray.slice(0, limit));
            return;
        }
        //If the current page is the last, show the last "limit" pages
        if (currentPage === pagesArray.length - 1) {
            setPages(pagesArray.slice(pagesArray.length - limit, pagesArray.length));
        } 
        
        //Show the range of one page before and N pages after (to match the limit)
        //If the range is out of bounds, show more pages before (to match the limit and if possible)
        let start = currentPage - 1;
        let end = currentPage + limit - 1;
        if (end > pagesArray.length - 1) {
            start = pagesArray.length - limit >= 0 ? pagesArray.length - limit : 0;
            end = pagesArray.length;
        }
        setPages(pagesArray.slice(start, end));
    }, [currentPage, limit, pageSize, totalItems])

    return (
        <div className='pagination' data-testid='pagination'>
            <Skeleton loading={loading}>
                {pages.length > 1 &&
                    <div className='pagination-content' data-testid='pagination-content'>
                        <Button 
                            icon='arrow_double_left' 
                            onClick={handleFirstPageClick} 
                            disabled={currentPage === 0}
                            testId='pagination-first-page-button'
                        />
                        <Button 
                            icon='arrow_left' 
                            onClick={handlePreviousPageClick} 
                            disabled={currentPage === 0}
                            testId='pagination-previous-page-button'
                        />
                        <div className='pagination-content-pages' data-testid='pagination-content-pages'>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    type={page === currentPage ? 'default' : 'text'}
                                    readOnly={page === currentPage}
                                    testId={`pagination-page-button-${page}`}
                                >
                                    {page + 1}
                                </Button>
                            ))}
                        </div>
                        <Button 
                            icon='arrow_right' 
                            onClick={handleNextPageClick} 
                            disabled={currentPage === Math.ceil(totalItems / pageSize) - 1}
                            testId='pagination-next-page-button'
                        />
                        <Button 
                            icon='arrow_double_right' 
                            onClick={handleLastPageClick} 
                            disabled={currentPage === Math.ceil(totalItems / pageSize) - 1}
                            testId='pagination-last-page-button'
                        />
                    </div>
                }
            </Skeleton>
        </div>
    )
}
