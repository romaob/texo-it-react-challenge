import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DashboardPanel from '../DashboardPanel';

describe('DashboardPanel', () => {
  const title = 'Test Panel';
  const onRefresh = jest.fn();
  const loading = false;
  const children = <div>Test Content</div>;

  it('should render without crashing', () => {
    render(
      <DashboardPanel title={title} onRefresh={onRefresh} loading={loading}>
        {children}
      </DashboardPanel>
    );
  });

  it('should render the title', () => {
    render(
      <DashboardPanel title={title} onRefresh={onRefresh} loading={loading}>
        {children}
      </DashboardPanel>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render the children', () => {
    render(
      <DashboardPanel title={title} onRefresh={onRefresh} loading={loading}>
        {children}
      </DashboardPanel>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should call onRefresh when refresh button is clicked', () => {
    render(
      <DashboardPanel title={title} onRefresh={onRefresh} loading={loading}>
        {children}
      </DashboardPanel>
    );
    fireEvent.click(screen.getByTestId('dashboard-panel-refresh'));
    expect(onRefresh).toHaveBeenCalled();
  });

  it('should set the refresh button disabled prop when loading is true', () => {
    render(
      <DashboardPanel title={title} onRefresh={onRefresh} loading={true}>
        {children}
      </DashboardPanel>
    );
    expect(screen.getByTestId('dashboard-panel-refresh')).toHaveAttribute(
      'data-disabled',
      'true'
    );
  });
});
