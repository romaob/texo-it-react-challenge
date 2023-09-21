import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import { ROUTES } from '../values/routes'
import { useYearsMultiWinners } from '../hooks/useYearsMultiWinners'
import DataTable from '../components/DataTable';
import Skeleton from '../components/Skeleton';
import DashboardPanel from '../components/DashboardPanel';
import { useStudioWithWins } from '../hooks/useStudiosWithWins';
import { useProducersMinMaxInterval } from '../hooks/useProducersMinMaxInterval';
import { useMoviesByYear } from '../hooks/useMoviesByYear';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateStringYear } from '../utils/validations';

export default function Dashboard(): JSX.Element {
  const yearsMultiWinners = useYearsMultiWinners();
  const studiosWithWinners = useStudioWithWins();
  const producersMinMaxWins = useProducersMinMaxInterval();
  const moviesByYear = useMoviesByYear();
  const [searchError, setSearchError] = useState<string | null>(null)
  const [searchVal, setSearchVal] = useState("");

  /**
   * Handle the data for the studios with winners
   * Getting the first 3 studios with the most wins
   */
  function handleStudioWithWinnersData() {
    const data = studiosWithWinners?.response?.studios || [];
    data.sort((a, b) => b.winCount - a.winCount);
    return data.slice(0, 3);
  }

  /**
   * Handle the search button click
   * checking if the year is valid
   */
  function handleSearchClick() {
    setSearchError(null);
    const errorMessage = validateStringYear(searchVal);
    if (errorMessage) {
      setSearchError(errorMessage);
      return;
    }
    moviesByYear?.setYear(Number(searchVal));
  }

  return (
    <PageWrapper title={ROUTES.DASHBOARD.name}>
        <div className='dashboard' data-testid='dashboard'>
          <div className='dashboard-row' data-testid='dashboard-row'>
            <Skeleton loading={yearsMultiWinners?.loading} flex>
              <DashboardPanel 
                title='List years with multiple winners' 
                onRefresh={yearsMultiWinners?.refetch} 
                loading={yearsMultiWinners?.loading}
              >
                <DataTable 
                  data={yearsMultiWinners?.response?.years || []}
                  columns={[
                    {
                      objectKey: 'year',
                      title: 'Year',
                      flex: true,
                      centerText: true,
                    },
                    {
                      objectKey: 'winnerCount',
                      title: 'Win Count',
                      flex: true,
                      centerText: true,
                    },
                  ]}
                  testId='table-years-multi-winners'
                  />
              </DashboardPanel>
            </Skeleton>
            <Skeleton loading={studiosWithWinners?.loading} flex>
              <DashboardPanel 
                title='Top 3 studios with winners' 
                onRefresh={studiosWithWinners?.refetch} 
                loading={studiosWithWinners?.loading}
              >
                <DataTable 
                      data={handleStudioWithWinnersData()}
                      columns={[
                        {
                          objectKey: 'name',
                          title: 'Name',
                          flex: true,
                          centerText: true,
                        },
                        {
                          objectKey: 'winCount',
                          title: 'Win Count',
                          flex: true,
                          centerText: true,
                        },
                      ]}
                      testId='table-studios-with-winners'
                  />
              </DashboardPanel>
            </Skeleton>
          </div>   
          <div className='dashboard-row' data-testid='dashboard-row'>
            <Skeleton loading={producersMinMaxWins?.loading} flex>
              <DashboardPanel 
                title='Producers with longest and shortest interval between wins' 
                onRefresh={producersMinMaxWins?.refetch} 
                loading={producersMinMaxWins?.loading}
              >
                <h3>Maximum</h3>
                <DataTable 
                      data={producersMinMaxWins?.response?.max || []}
                      columns={[
                        {
                          objectKey: 'producer',
                          title: 'Producer',
                          flex: true,
                          centerText: true,
                        },
                        {
                          objectKey: 'interval',
                          title: 'Interval',
                          flex: true,
                          centerText: true,
                        },
                        {
                          objectKey: 'previousWin',
                          title: 'Previous Win',
                          flex: true,
                          centerText: true,
                        },
                        {
                          objectKey: 'followingWin',
                          title: 'Following Win',
                          flex: true,
                          centerText: true,
                        },
                      ]}
                      testId='table-producers-max'
                  />
                  <h3>Minimum</h3>
                  <DataTable 
                        data={producersMinMaxWins?.response?.min || []}
                        columns={[
                          {
                            objectKey: 'producer',
                            title: 'Producer',
                            flex: true,
                            centerText: true,
                          },
                          {
                            objectKey: 'interval',
                            title: 'Interval',
                            flex: true,
                            centerText: true,
                          },
                          {
                            objectKey: 'previousWin',
                            title: 'Previous Win',
                            flex: true,
                            centerText: true,
                          },
                          {
                            objectKey: 'followingWin',
                            title: 'Following Win',
                            flex: true,
                            centerText: true,
                          },
                        ]}
                        testId='table-producers-min'
                    />
              </DashboardPanel>
            </Skeleton>
            <Skeleton loading={moviesByYear?.loading} flex testId='skeleton-movies-by-year'>
              <DashboardPanel 
                title='List movie winners by year' 
                onRefresh={moviesByYear?.refetch} 
                loading={moviesByYear?.loading}
              >
                <div className='search-block'>
                  <Input 
                    value={searchVal} 
                    type="number" 
                    label='Year' 
                    flex 
                    error={searchError || ''} 
                    onChange={setSearchVal}
                    testId='input-search-year'
                  />
                  <Button 
                    icon='search' 
                    onClick={handleSearchClick}
                    testId='button-search-year'
                  />
                </div>
                <DataTable
                  data={moviesByYear?.response || []}
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
                  ]} 
                  emptyMessage='No movies found for this year'
                  testId='table-movies-by-year'
                />
              </DashboardPanel>
            </Skeleton>
          </div>         
        </div>
    </PageWrapper>
  )
}
