import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { ROUTES } from '../values/routes'
import { useYearsMultiWinners } from '../hooks/useYearsMultiWinners'
import DataTable from '../components/DataTable';
import Skeleton from '../components/Skeleton';
import DashboardPanel from '../components/DashboardPanel';
import { useStudioWithWins } from '../hooks/useStudiosWithWins';
import { useProducersMinMaxInterval } from '../hooks/useProducersMinMaxInterval';

export default function Dashboard(): JSX.Element {
  const yearsMultiWinners = useYearsMultiWinners();
  const studiosWithWinners = useStudioWithWins();
  const producersMinMaxWins = useProducersMinMaxInterval();

  /**
   * Handle the data for the studios with winners
   * Getting the first 3 studios with the most wins
   */
  function handleStudioWithWinnersData() {
    const data = studiosWithWinners?.response?.studios || [];
    data.sort((a, b) => b.winCount - a.winCount);
    return data.slice(0, 3);
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
            <Skeleton loading={yearsMultiWinners?.loading} flex>
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
          </div>         
        </div>
    </PageWrapper>
  )
}
