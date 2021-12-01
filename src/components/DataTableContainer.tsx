import React, { Fragment, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';

const FilterComponentWrapper = styled.div`
  margin: 0.5rem auto;
  width: 100%;
  max-width: 300px;
  display: block;
  position: relative;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const TextField = styled.input`
  width: 100%;
  border-radius: 0;
  outline: none !important;
  border: 1px solid #e5e5e5;
  color: black;
  padding: 0.5rem 3rem 0.5rem 0.5rem;
  font-size: 0.875rem;
`;

const ClearButton = styled.button`
  height: 100%;
  width: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 0.875rem;
  right: 0;
  color: rgba(0, 0, 0, 0.75);
  top: 0;
  border: 0;
`;

const FilterComponent = ({ filterText, onFilter, onClear }: any) => {
  return (
    <FilterComponentWrapper>
      <TextField
        id="search"
        type="text"
        placeholder="Type Domain Name e.g. grape"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />

      {filterText && (
        <ClearButton type="button" onClick={onClear}>
          Clear
        </ClearButton>
      )}
    </FilterComponentWrapper>
  );
};

const DataTableContainer = ({ data }: any) => {
  // Filtering capabilities
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    (item: any) => item.domain && item.domain.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e: any) => {
          e.preventDefault();
          setFilterText(e.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // Styling block
  createTheme('dark', {
    text: {
      primary: '#dc1ff1',
      secondary: '#fff',
    },
    background: {
      default: '#1a2734',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: 'transparent',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
    striped: {
      default: '#06090b',
      text: '#dc1ff1',
    },
  });

  const customStyles = {
    subHeader: {
      style: {
        flex: 0,
        borderRadius: '0 0 0.5rem 0.5rem',
        overflow: 'hidden',
      },
    },
    table: {
      style: {
        borderRadius: '0.5rem',
        overflow: 'hidden',
      },
    },
    tableWrapper: {
      style: {
        maxWidth: '960px',
        margin: '1.5rem auto 0',
        width: '100%',
      },
    },
    pagination: {
      style: {
        borderRadius: '0 0 0.5rem 0.5rem',
        overflow: 'hidden',
        border: 'none',
        maxWidth: '960px',
        margin: '0 auto 1.5rem',
        width: '100%',
      },
    },
    headCells: {
      style: {
        fontSize: '1rem',
        fontWeight: 'bold' as 'bold',
      },
    },
    headRows: {
      style: {
        borderRadius: '0.5rem 0.5rem 0 0',
        overflow: 'hidden',
      },
    },
    rows: {
      style: {
        minHeight: '40px',
        borderBottomColor: 'transparent',
      },
    },
    cells: {
      style: {
        fontSize: '0.875rem',
        fontWeight: 'bold' as 'bold',
      },
    },
  };

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    noRowsPerPage: true,
  };

  const conditionalRowStyles = [
    {
      when: (row: any) => row.status === 'Scam',
      style: {
        color: '#efff04',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ];

  // Data Customization
  const columns = [
    {
      name: <span style={{ color: '#03e1ff' }}>Domain Name</span>,
      selector: (row: any) => row.domain,
      sortable: true,
      cell: (row: any) => {
        if (row.status === 'Scam') {
          return row.domain;
        }

        return (
          <a href={`http://${row.domain}`} target="_blank" rel="noreferrer">
            {row.domain}
          </a>
        );
      },
    },
    {
      name: (
        <span style={{ wordBreak: 'break-word', overflow: 'visible', zIndex: 999 }}>
          Real <em style={{ color: '#efff04' }}>or Scam</em>
        </span>
      ),
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => {
        if (row.status === 'Scam') {
          return <em>{row.status}</em>;
        }

        return row.status;
      },
      right: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      customStyles={customStyles}
      conditionalRowStyles={conditionalRowStyles}
      pagination
      paginationPerPage={15}
      paginationComponentOptions={paginationComponentOptions}
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      striped
      theme="dark"
    />
  );
};

export default DataTableContainer;
