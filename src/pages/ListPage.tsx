import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { useMovies } from '../hooks/useMovies'
import DataTable from '../components/DataTable';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';
import Button from '../components/Button';
import Input from '../components/Input';
import { validateStringYear } from '../utils/validations';

export default function ListPage(): JSX.Element {
  const {
    loading, 
    response, 
    yearFilter,
    refetch: fetchData, 
    setPage, 
    setSize, 
    setWinner, 
    setYear
  } = useMovies();

  const [showYearFilter, setShowYearFilter] = useState(false);
  const [yearText, setYearText] = useState<string | null>(null);
  const [useWinners, setUseWinners] = useState(true);
  const [useLoosers, setUseLoosers] = useState(true);

  /**
   * Handle the data for the Year filter confirmation
   */
  function handleYearFilter() {
    if (!yearText) {
      setYear(undefined);
      setShowYearFilter(false);
      return;
    }

    const errorMessage = validateStringYear(yearText);
    console.log(errorMessage);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
    setYear(parseInt(yearText));
    setShowYearFilter(false);
  }

  /**
   * Handle the winners filter button toggle
   * Checks when disabling, enabling the other filter if it's disabled
   * Prevents both filters from being disabled
   */
  function handleWinnersFilter() {
    const win = !useWinners;
    const los = !useLoosers && !win ? true : useLoosers;
    setUseWinners(win);
    setUseLoosers(los);
    setWinner(win && los ? undefined : win)
  }

  /**
   * Handle the loosers filter button toggle
   * Checks when disabling, enabling the other filter if it's disabled
   * Prevents both filters from being disabled
   */
  function handleLoosersFilter() {
    const los = !useLoosers;
    const win = !useWinners && !los ? true : useWinners;
    setUseWinners(win);
    setUseLoosers(los);
    setWinner(win && los ? undefined : win)
  }

  return (
    <PageWrapper title='List Movies'>
      <div className='listpage'>
        <Skeleton flex loading={loading}>
          <DataTable 
            data={response?.content}
            columns={[
              {
                objectKey: 'id',
                title: 'ID',
                centerText: true,              
              },
              {
                objectKey: 'year',
                title: 'Year',
                customTitleRender: () => {
                  if (showYearFilter) {
                    return (
                      <div className='data-table-filter-header'>
                        <Input
                          value={yearText || ''}
                          onChange={setYearText}
                          type='number'
                          flex
                        />
                        <Button
                          icon='checkmark'
                          onClick={handleYearFilter}
                        />
                      </div>
                    )
                  } else {
                    return (
                      <div className='data-table-filter-header'>
                        <h3>Year {yearFilter ? `(${yearFilter})` : ''}</h3>
                        <Button 
                          icon='edit' 
                          onClick={() => setShowYearFilter(true)}
                        />
                      </div>
                    )
                  }
                },
                centerText: true,
                flex: true,
              },
              {
                objectKey: 'title',
                title: 'Title',
                flex: true,
              },
              {
                objectKey: 'winner',
                title: 'Winner',
                flex: true,
                centerText: true,
                customTitleRender: () => (
                  <div className='data-table-filter-header'>
                    <h3>Winner</h3>
                    <Button
                      icon='checkmark'
                      toggled={!useWinners}
                      onClick={handleWinnersFilter}
                    />
                    <Button
                      icon='cancel'
                      toggled={!useLoosers}
                      onClick={handleLoosersFilter}
                    />
                  </div>
                ),
                customCellRender: (row) => (
                  <Button 
                    icon={row.winner ? 'checkmark' : 'cancel'} 
                    readOnly
                    disabled={!row.winner}
                  />
                )
              },
            ]}
            emptyMessage='No movies found'
          />
        </Skeleton>
        <Pagination
          loading={loading}
          currentPage={response?.pageable?.pageNumber || 0 }
          pageSize={response?.pageable?.pageSize || 1}
          totalItems={response?.totalElements || 0} 
          limit={5}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </PageWrapper>
  )
}
