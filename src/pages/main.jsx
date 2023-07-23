import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';

const Main = (props) => {
    const gridRef = useRef();
	const [rowData, setRowData] = useState();
    
    const [columnDefs] = useState([
        { headerName: 'Athlete', field: 'athlete',},
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ]);

    // never changes, so we can use useMemo
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true
    }), []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
          .then((resp) => resp.json())
          .then((data) => {
            setRowData(data);
          });
    }, []);

    const onPageSizeChanged = useCallback(() => {
        var value = document.getElementById('page-size').value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    return (
        <div className="ag-theme-alpine" style={{height: '500px', width: '100%'}}>
            <div>
                <h2>일일 생산 일지</h2>
            </div>
            <div className="report-page">
                Page Size:
                <select onChange={onPageSizeChanged} id="page-size">
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select>
            </div>
            <AgGridReact
                suppressColumnMoveAnimation="false"
                defaultColDef={defaultColDef}
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}>
            </AgGridReact>
        </div>
    );
};

export default Main;