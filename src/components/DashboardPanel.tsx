import React from 'react';
import Button from './Button';

export interface DashboardPanelProps {
  title: string;
  onRefresh: () => void;
  loading: boolean;
  children: React.ReactNode;
}
/**
 * Panel component used on the dashboard page
 * @prop {string} title - The title of the panel
 * @prop {function} onRefresh - The function to be called when the refresh button is clicked
 * @prop {boolean} loading - If the panel is loading
 * @prop {React.ReactNode} children - The children to be displayed on the panel
 * @returns JSX.Element
 */
export default function DashboardPanel({
  title,
  onRefresh,
  loading,
  children,
}: DashboardPanelProps): JSX.Element {
  function handleRefresh() {
    if (loading) return;
    onRefresh();
  }

  return (
    <div className="dashboard-panel" data-testid="dashboard-panel">
      <div
        className="dashboard-panel-header"
        data-testid="dashboard-panel-header"
      >
        <h3 className="dashboard-panel-title">{title}</h3>
        <Button
          onClick={handleRefresh}
          icon="refresh"
          disabled={loading}
          testId="dashboard-panel-refresh"
        />
      </div>
      <div className="dashboard-panel-body" data-testid="dashboard-panel-body">
        {children}
      </div>
    </div>
  );
}
