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
    if (searchVal.length === 0) {
      setSearchError('Year is required');
      return;
    }
    if (searchVal.length !== 4) {
      setSearchError('Year must be 4 digits');
      return;
    }
    if (isNaN(Number(searchVal))) {
      setSearchError('Year must be a number');
      return;
    }
    try {
      const year = Number(searchVal);
      if (year < 1900 || year > new Date().getFullYear()) {
        setSearchError('Year must be between 1900 and the present');
        return;
      }

      moviesByYear?.setYear(year);

    } catch (e) {
      setSearchError('Year must be a number');
      return;
    }
  }

  return (
    <PageWrapper title={ROUTES.DASHBOARD.name}>
        <div className='dashboard'>
          <div className='dashboard-row'>
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
                  />
              </DashboardPanel>
            </Skeleton>
          </div>   
          <div className='dashboard-row'>
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
                    />
              </DashboardPanel>
            </Skeleton>
            <Skeleton loading={moviesByYear?.loading} flex>
              <DashboardPanel 
                title='List movie winners by year' 
                onRefresh={moviesByYear?.refetch} 
                loading={moviesByYear?.loading}
              >
                <div className='search-block'>
                  <Input value={searchVal} type="number" label='Year' flex error={searchError || ''} onChange={setSearchVal}/>
                  <Button icon='search' onClick={handleSearchClick}/>
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
                />
              </DashboardPanel>
            </Skeleton>
          </div>         
        </div>
    </PageWrapper>
  )
}
