import React, {
    useCallback,
    useMemo,
    useState,
    useRef,
    useEffect
} from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BACKEND_URL } from "../../Services/Helper";
import { getRequestWithToken } from "../../../../HostelWarden/src/Services/Api";

// Register the required modules
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule
]);

// sample data from response
// [
//     {
//         "_id": "6658be4fa97ab95fa0405724",
//         "student_id": 202116456,
//         "photo_exit": "https://btsri.blob.core.windows.net/student//tmp/tmp-1-1717091726398",
//         "photo_entry": "https://btsri.blob.core.windows.net/student//tmp/tmp-2-1717091917565",
//         "isLongLeave": true,
//         "reason": "Home",
//         "entry_time": "30/5/2024, 11:28:38 pm",
//         "exit_time": "30/5/2024, 11:23:39 pm",
//         "__v": 0
//     },
// ]

const getValue = (inputSelector) => {
    var text = document.querySelector(inputSelector).value;
    switch (text) {
        case "none":
            return;
        case "tab":
            return "\t";
        default:
            return text;
    }
};

const getParams = () => {
    return {
        columnSeparator: getValue("#columnSeparator"),
    };
};

const StudentRecordList = () => {
    const gridRef = useRef(null);
    const [rowData, setRowData] = useState([]);

    const columnDefs = useMemo(() => [
        {
            field: "student_id",
            headerName: "Student ID",
            sortable: true,
            filter: true,
        },
        {
            field: "isLongLeave",
            headerName: "Long Leave ?",
            sortable: true,
            filter: true,
        },
        {
            field: "reason",
            headerName: "Purpose",
            sortable: true,
            filter: true,
        },
        {
            field: "exit_time",
            headerName: "Exit Date & Time",
            sortable: true,
            filter: true,
        },
        {
            field: "entry_time",
            headerName: "Entry Date & Time",
            sortable: true,
            filter: true,
        },
        {
            field: "exit_authorised_by",
            headerName: "Exit Authorised By",
            sortable: true,
            filter: true,
        },
        {
            field: "entry_authorised_by",
            headerName: "Entry Authorised By",
            sortable: true,
            filter: true,
        },
        {
            field: "photo_exit",
            headerName: "Exit Photo",
            sortable: false,
            filter: false,
            cellRenderer: params => (
                params.value ? 
                <a 
                    href={params.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                    View Photo
                </a> : null
            )
        },
        {
            field: "photo_entry",
            headerName: "Entry Photo",
            sortable: false,
            filter: false,
            cellRenderer: params => (
                params.value ? 
                <a 
                    href={params.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                    View Photo
                </a> : null
            )
        },
    ], []);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 100,
        resizable: true,
    }), []);

    const onGridReady = useCallback(() => {
        try {
            getRequestWithToken(`security/getStudentLogs`)
                .then((response) => {
                    if (response.status === 401) {
                        alert('Session expired. Please login again');
                        window.location.href = '/login';
                        return;
                    }
                    setRowData(response.data || []);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    alert('Error loading data. Please try again.');
                });
        } catch (error) {
            console.error('Error in onGridReady:', error);
        }
    }, []);

    return (
        <div className="w-full h-screen p-4">
            <div
                className="ag-theme-alpine"
                style={{ height: 'calc(100vh - 120px)', width: '100%' }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination={true}
                    paginationPageSize={15}
                />
            </div>
        </div>
    );
};

export default StudentRecordList

