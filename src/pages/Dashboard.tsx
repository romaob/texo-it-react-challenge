import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { ROUTES } from '../values/routes'
import { useYearsMultiWinners } from '../hooks/useYearsMultiWinners'
import DataTable from '../components/DataTable';
import Skeleton from '../components/Skeleton';
import DashboardPanel from '../components/DashboardPanel';

export default function Dashboard(): JSX.Element {
  const yearsMultiWinners = useYearsMultiWinners();
  return (
    <PageWrapper title={ROUTES.DASHBOARD.name}>
        <div className='dashboard'>
          <div className='dashboard-row'>
            <Skeleton loading={yearsMultiWinners?.loading} flex>
            <DashboardPanel 
              title='List years with multiple winners' 
              onRefresh={yearsMultiWinners.refetch} 
              loading={yearsMultiWinners.loading}
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
          </div>          
        </div>
    </PageWrapper>
  )
}
