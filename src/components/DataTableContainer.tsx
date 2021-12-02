import React, { Fragment, useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import styles from '../styles/DataTableContainer.module.css';

const FilterComponent = ({ filterText, onFilter, onClear }: any) => {
  return (
    <div className={styles.filterComponentWrapper}>
      <input
        id="search"
        className={styles.textField}
        type="text"
        placeholder="Type Domain Name e.g. grape"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />

      {filterText && (
        <button type="button" className={styles.clearButton} onClick={onClear}>
          Clear
        </button>
      )}
    </div>
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
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
      },
    },
    table: {
      style: {
        borderRadius: '8px 8px 8px 8px',
        overflow: 'hidden',
      },
    },
    tableWrapper: {
      style: {
        maxWidth: '600px',
        margin: '1.5rem auto 0',
        width: '100%',
      },
    },
    pagination: {
      style: {
        position: 'relative' as 'relative',
        marginTop: '-8px !important',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
        border: 'none',
        maxWidth: '600px',
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
        borderRadius: '8px 8px 0 0',
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
  const [columns, setColumns] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setLoading(false);
    const timeout = setTimeout(() => {
      setColumns([
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
            <span style={{ wordBreak: 'break-word', overflow: 'visible' }}>
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
      ]);
      setPending(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Fragment>
      {!loading && (
        <DataTable
          columns={columns}
          data={filteredItems}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          pagination
          paginationPerPage={20}
          paginationComponentOptions={paginationComponentOptions}
          paginationResetDefaultPage={resetPaginationToggle}
          paginationRowsPerPageOptions={[20, 50, 100]}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          striped
          theme="dark"
          progressPending={pending}
        />
      )}
    </Fragment>
  );
};

export default DataTableContainer;
