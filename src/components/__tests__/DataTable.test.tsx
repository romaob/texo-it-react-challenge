import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from '../DataTable';

describe('DataTable', () => {
  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
    { id: 3, name: 'Bob Smith', age: 40 },
  ];

  const columns = [
    { objectKey: 'id', title: 'ID' },
    { objectKey: 'name', title: 'Name' },
    { objectKey: 'age', title: 'Age' },
  ];

  it('should render without crashing', () => {
    render(<DataTable data={data} columns={columns} />);
  });

  it('should render the column labels', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('should render the data rows', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });
});
