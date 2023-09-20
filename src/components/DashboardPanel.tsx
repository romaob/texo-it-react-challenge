import React from 'react'
import Button from './Button';
import Skeleton from './Skeleton';

export interface DashboardPanelProps {
    title: string;
    onRefresh: () => void;
    loading: boolean;
    children: React.ReactNode;
}

export default function DashboardPanel({ 
    title, 
    onRefresh, 
    loading, 
    children 
}: DashboardPanelProps): JSX.Element {

    function handleRefresh() {
        if (loading) return;
        onRefresh();
    }

    return (
        <div className='dashboard-panel'>
            <div className='dashboard-panel-header'>
                <h3 className='dashboard-panel-title'>{title}</h3>
                <Button onClick={handleRefresh} icon='refresh' disabled={loading}/>
            </div>
            <div className='dashboard-panel-body'>
                {children}
            </div>
        </div>
    )
}