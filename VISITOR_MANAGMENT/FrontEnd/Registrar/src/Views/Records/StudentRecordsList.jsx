import React, {
    useCallback,
    useMemo,
    useState,
    useRef
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { BACKEND_URL } from "../../Services/Helper";
import { getRequestWithToken } from "../../../../HostelWarden/src/Services/Api";



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

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
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
            // cellRenderer: function (params) {
            //     const date = new Date(params.data.exit_time);

            //     const pad = (num) => (num < 10 ? '0' + num : num);

            //     // Format the date into dd/mm/yyyy, hh:mm:ss am/pm format
            //     const formattedDate = `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}, ${pad(date.getHours() % 12 || 12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${date.getHours() < 12 ? 'am' : 'pm'}`;
            //     return formattedDate;
            // }

        },
        {
            headerName: "Entry Date & Time",
            field: "entry_time",
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

                    // console.log("filterLocalDateAtMidnight", cellDate, filterLocalDateAtMidnight);
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
            // cellRenderer: function (params) {
            //     const date = new Date(params.data.entry_time);

            //     const pad = (num) => (num < 10 ? '0' + num : num);

            //     // Format the date into dd/mm/yyyy, hh:mm:ss am/pm format
            //     const formattedDate = `${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}, ${pad(date.getHours() % 12 || 12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${date.getHours() < 12 ? 'am' : 'pm'}`;
            //     return formattedDate;
            // }

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
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    <a href={`${params.data.photo_exit}`} target="_blank" className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto " >
                        View Photo
                    </a>
                    // {/* </button> */}
                )
            },
        },
        {
            headerName: "Entry Photo",
            field: "photo_entry",
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    <a href={`${params.data.photo_entry}`} target="_blank" className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto " >
                        View Photo
                    </a>
                    // {/* </button> */}
                )
            },
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
        getRequestWithToken(`registrar/getStudentLogs`)
            .then((resp) => {
                if (resp.status === 401) {
                    alert('Session expired. Please login again')
                    window.location.href = '/login'
                }
                return resp.data;
            })
            .then((data) => setRowData(data));
    }, []);

    function convertToCsv(rowData, columnDefs) {
        // Extract column headers
        const columnHeaders = columnDefs.map(column => column.headerName);

        // Extract keys in the order they appear in columnDefs
        const keys = columnDefs.map(column => column.field);

        // Create CSV header row
        const headerRow = "Student ID,Long Leave ?,Purpose,Exit Date,Exit Time,Entry Date,EntryTime,Exit Authorised By, Entry Authorised By,Exit Photo,Entry Photo";
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
            { headerName: "Student ID", field: "student_id" },
            { headerName: "Long Leave ?", field: "isLongLeave" },
            { headerName: "Purpose", field: "reason" },
            { headerName: "Exit Date & Time", field: "exit_time" },
            { headerName: "Entry Date & Time", field: "entry_time" },
            { headerName: "Exit Authorised By", field: "exit_authorised_by" },
            { headerName: "Entry Authorised By", field: "entry_authorised_by" },
            { headerName: "Exit Photo", field: "photo_exit" },
            { headerName: "Entry Photo", field: "photo_entry" }
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

export default StudentRecordList

