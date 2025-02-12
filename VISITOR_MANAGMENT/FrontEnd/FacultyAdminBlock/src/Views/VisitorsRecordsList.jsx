import React, {
    useCallback,
    useMemo,
    useState,
    useRef
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { BACKEND_URL } from "../Services/Helpers";
import Cookies from 'js-cookie';
import { getRequestWithLogin } from "../../../IT-ADMIN/src/Services/Api";





// [
//     {
//         "_id": "6660a1bab4d9b6089f9454e1",
//         "uuid": "f906268e-c5ab-4b0f-82c1-f74a62269f9bvisitor",
//         "name": "shubham ",
//         "mobile": "9898989898",
//         "purpose": "To meet dean",
//         "entry_time": "5/6/2024, 11:04:20 pm",
//         "exit_time": "5/6/2024, 11:04:50 pm",
//         "photo_entry": "https://btsri.blob.core.windows.net/visitor//tmp/tmp-1-1717608860009",
//         "photo_exit": "https://btsri.blob.core.windows.net/visitor//tmp/tmp-2-1717608889345",
//         "__v": 0
//     }
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


const VisitorRecordList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Name",
            field: "name",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Mobile",
            field: "mobile",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Purpose",
            field: "purpose",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Email",
            field: "email",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Arrival date",
            field: "arrival_date",
            filter: "agDateColumnFilter",
            sortable: true,
            filterParams: {
                // provide comparator function, which is used to compare dates (not times)
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                    // In the example application, dates are stored as dd/mm/yyyy, hh:mm:ss am/pm format
                    // We create a Date object for comparison against the filter date
                    const dateAsString = cellValue.split(",")[0]  // remove time part;
                    const dateParts = dateAsString.split("/");
                    const cellDate = new Date(
                        Number(dateParts[2]),
                        Number(dateParts[1]) - 1,
                        Number(dateParts[0]),
                    );

                    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                        return 0;
                    }
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    }
                    if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    }
                    return 0;
                },
            },
            cellRenderer: function (params) {
                const date = params.data.arrival_date
                return new Date(date).toLocaleDateString()
            }
        },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 150,
            resizable: true,
            // filter: true,
            // floatingFilter: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {

        const loadData = async () => {
            const resp = await getRequestWithLogin(`faculty_adminBlock/getVisitors`)

            // const data = await resp
            if (resp.status === 401) {
                alert('Session expired. Please login again')
                window.location.href = '/login'
            }
            // console.log(resp.data.visitors)
            setRowData(resp?.data?.visitors)
        }

        loadData()
    }, []);

    function convertToCsv(rowData, columnDefs) {
        // Extract column headers
        const columnHeaders = columnDefs.map(column => column.headerName);

        // Extract keys in the order they appear in columnDefs
        const keys = columnDefs.map(column => column.field);

        // Create CSV header row
        const headerRow = "Name,Mobile,Email,Purpose,Arrival Date,Scheduled By";
        // console.log(headerRow)

        // Create CSV data rows
        const dataRows = rowData.map(row => keys.map(key => row[key]).join(','));

        // Combine header row and data rows
        const csv = [headerRow, ...dataRows].join('\n');

        return csv;
    }



    const onBtnExport = useCallback(() => {
        const rowData = gridRef.current.api.getModel().rowsToDisplay.map(row => row.data);

        const orderedColumnDefs = [
            { headerName: "Name", field: "name" },
            { headerName: "Mobile", field: "mobile" },
            { headerName: 'Email', field: 'email' },
            { headerName: 'Purpose', field: 'purpose' },
            { headerName: 'Arrival Date', field: 'arrival_date' },
            { headerName: 'Scheduled By', field: 'scheduled_by' }
        ];

        const csv = convertToCsv(rowData, orderedColumnDefs);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, []);


    return (
        <>
            <div className="w-screen h-screen p-8" >
                <button onClick={onBtnExport} className='bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded mb-6' >Download CSV export file</button>

                <div
                    style={gridStyle}
                    className="ag-theme-quartz "
                >
                    <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        suppressExcelExport={true}
                    />
                </div>
            </div>
        </>
    );
};

export default VisitorRecordList

// Path: FrontEnd/Security/src/Views/Visitors/index.jsx
