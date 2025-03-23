import React, { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { getRequestWithToken } from "../../../Services/Api";
import { Navbar } from "../../../Components/Navbar";
import { StickyFooterMobile } from "../../../Components/StickyFooterMobile";

const StudentRecords = () => {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const gridRef = useRef();

    const [columnDefs] = useState([
        {
            headerName: "Student ID",
            field: "student_id",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Long Leave ?",
            field: "isLongLeave",
            filter: "agTextColumnFilter",
            sortable: true,
            valueFormatter: (params) => params.value ? 'Yes' : 'No'
        },
        {
            headerName: "Purpose",
            field: "reason",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Exit Date & Time",
            field: "exit_time",
            filter: "agDateColumnFilter",
            sortable: true,
        },
        {
            headerName: "Entry Date & Time",
            field: "entry_time",
            filter: "agDateColumnFilter",
            sortable: true,
        },
        {
            headerName: "Exit Authorised By",
            field: "exit_authorised_by",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Entry Authorised By",
            field: "entry_authorised_by",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Exit Photo",
            field: "photo_exit",
            cellRenderer: (params) => {
                return params.value ? (
                    <a 
                        href={params.value} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded"
                    >
                        View Photo
                    </a>
                ) : 'No Photo';
            }
        },
        {
            headerName: "Entry Photo",
            field: "photo_entry",
            cellRenderer: (params) => {
                return params.value ? (
                    <a 
                        href={params.value} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded"
                    >
                        View Photo
                    </a>
                ) : 'No Photo';
            }
        },
    ]);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 150,
        resizable: true,
        filter: true,
    }), []);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching student logs...');
            
            const response = await getRequestWithToken('security/getStudentLogs');
            console.log('API Response:', response);

            if (response?.status === 200 && response?.data) {
                console.log('Received data:', response.data);
                setRowData(response.data);
            } else {
                throw new Error(response?.data?.message || 'Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onBtnExport = useCallback(() => {
        if (!rowData.length) {
            alert('No data to export');
            return;
        }

        const params = {
            columnKeys: columnDefs.map(col => col.field),
            fileName: 'student_records.csv',
        };
        
        gridRef.current.api.exportDataAsCsv(params);
    }, [columnDefs, rowData]);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Student Records</h1>
                    <button 
                        onClick={onBtnExport}
                        className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded"
                        disabled={loading || !rowData.length}
                    >
                        Download CSV export file
                    </button>
                </div>

                {loading && (
                    <div className="text-center py-4">
                        <p>Loading records...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-4 text-red-500">
                        <p>Error: {error}</p>
                        <button 
                            onClick={fetchData}
                            className="mt-2 bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div 
                        className="ag-theme-quartz w-full" 
                        style={{ height: 'calc(100vh - 200px)' }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            pagination={true}
                            paginationPageSize={10}
                            domLayout='autoHeight'
                            onGridReady={(params) => {
                                params.api.sizeColumnsToFit();
                            }}
                        />
                    </div>
                )}
            </div>
            <StickyFooterMobile />
        </>
    );
};

export default StudentRecords; 