import React from 'react'

export type DataTableColumn = {
    objectKey: string;
    title: string;
    cellTextParser?: (item: any) => string;
    customTitleRender?: () => JSX.Element;
    customCellRender?: (item: any) => JSX.Element;
    centerText?: boolean;
    flex?: boolean; 
}

export interface DataTableProps {
    data?: any[];
    columns?: DataTableColumn[];
    emptyMessage?: string;
    testId?: string;
}

/**
 * Data table component, used to dinamically display data on the app
 * @prop {any[]} data - The object array of any type to be displayed on the table
 * @prop {DataTableColumn[]} columns - The columns to be displayed on the table and their configurations
 * @prop {string} emptyMessage - The message to be displayed when the table is empty
 * @prop {string} testId - The test id to be used on the tests
 */
export default function DataTable({
    data,
    columns,
    emptyMessage,
    testId = 'data-table',
}: DataTableProps): JSX.Element {
  return (
    <div className='data-table' data-testid={testId}>
        <div className='data-table-content'>
            {columns && columns.map((column) => (
                <div 
                    key={column.objectKey} 
                    className={`data-table-column`} 
                    data-flex={column.flex}
                >
                    <div className='data-table-column-header text-truncate'>
                        {column.customTitleRender?.() || <h3>{column.title}</h3>}
                    </div>
                    <div className='data-table-column-body'>
                        {data && data.length > 0 && data.map((item, i) => (
                            <div 
                                key={column.objectKey + i} 
                                className='data-table-column-cell text-truncate'
                                data-even={i % 2 === 0}
                                data-centertext={column.centerText}
                            >
                                {column.customCellRender?.(item) || 
                                <span>{column.cellTextParser?.(item) || item[column.objectKey]}</span>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        {(!data || data.length === 0) && (
            <div className='data-table-empty'>
                <h3>{emptyMessage || 'No data'}</h3>
            </div>
        )}
    </div>
  );
}