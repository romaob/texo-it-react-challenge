import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { useMovies } from '../hooks/useMovies'
import DataTable from '../components/DataTable';
import Skeleton from '../components/Skeleton';
import Pagination from '../components/Pagination';

export default function ListPage(): JSX.Element {
  const {
    loading, 
    response, 
    refetch: fetchData, 
    setPage, 
    setSize, 
    setWinner, 
    setYear
  } = useMovies();

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
                centerText: true,
              },
              {
                objectKey: 'title',
                title: 'Title',
                flex: true,
                centerText: true,
              },
              {
                objectKey: 'winner',
                title: 'Winner',
                cellTextParser: (item) => item.winner ? 'Yes' : 'No',
                flex: true,
                centerText: true,
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
