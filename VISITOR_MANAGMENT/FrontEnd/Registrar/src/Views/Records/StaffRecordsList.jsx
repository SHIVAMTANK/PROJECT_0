import React, {
    useCallback,
    useMemo,
    useState,
    useRef
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BACKEND_URL } from "../../Services/Helper";
import { getRequestWithToken } from "../../../../HostelWarden/src/Services/Api";

// [
    // {
    //     "_id": "6663036eff94869cd7915b52",
    //     "uuid": "a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdefstaff",
    //     "mobile": 9876543210,
    //     "name": "Amit Sharma",
    //     "photo_exit": "https://btsri.blob.core.windows.net/staff//tmp/tmp-2-1717764973186",
    //     "photo_entry": "https://btsri.blob.core.windows.net/staff//tmp/tmp-1-1717764965087",
    //     "entry_time": "7/6/2024, 6:26:05 pm",
    //     "exit_time": "7/6/2024, 6:26:13 pm",
    //     "__v": 0
    // }
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


const StaffRecordList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const [columnDefs] = useState([
        {
            headerName: "Staff ID",
            field: "staff_id",
            filter: "agTextColumnFilter",
            sortable: true,
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
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Entry Date & Time",
            field: "entry_time",
            filter: "agTextColumnFilter",
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
            cellRenderer: params => (
                params.value ? 
                <a 
                    href={params.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl"
                >
                    View Photo
                </a> : null
            )
        },
        {
            headerName: "Entry Photo",
            field: "photo_entry",
            cellRenderer: params => (
                params.value ? 
                <a 
                    href={params.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl"
                >
                    View Photo
                </a> : null
            )
        },
    ]);

    const defaultColDef = useMemo(() => ({
        flex: 1,
        minWidth: 150,
        resizable: true,
    }), []);

    const onGridReady = useCallback(() => {
        getRequestWithToken(`registrar/getStaffLogs`)
            .then((resp) => {
                if (resp.status === 401) {
                    alert('Session expired. Please login again');
                    window.location.href = '/login';
                }
                return resp.data;
            })
            .then((data) => setRowData(data))
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error loading data. Please try again.');
            });
    }, []);

    const onBtnExport = useCallback(() => {
        if (gridRef.current?.api) {
            gridRef.current.api.exportDataAsCsv({
                fileName: 'staff_records.csv'
            });
        }
    }, []);

    return (
        <div className="w-screen h-screen p-8">
            <button 
                onClick={onBtnExport} 
                className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded mb-6"
            >
                Download CSV export file
            </button>

            <div
                style={gridStyle}
                className="ag-theme-alpine"
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

export default StaffRecordList
