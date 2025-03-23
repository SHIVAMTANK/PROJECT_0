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


const ParentRecordsList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState([]);
    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Student ID",
            field: "student_id",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Name 1",
            field: "name1",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Name 2",
            field: "name2",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName:"Mobile",
            field:"mobile",
            filter:"agTextColumnFilter",
            sortable:true,
        },
        {
            headerName: "Purpose",
            field: "purpose",
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
            headerName: "Exit Photo1",
            field: "exit_photo1",
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    <a href={`${params.data.exit_photo1}`} target="_blank" className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto " >
                        Exit Photo1
                    </a>
                    // {/* </button> */}
                )
            },
        },
        {
            headerName: "Exit Photo2",
            field: "exit_photo2",
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    params.data.exit_photo2 &&
                    <a href={`${params.data.exit_photo2}`} target="_blank" className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto " >
                        Exit Photo2
                    </a>
                    // {/* </button> */}
                )
            },
        },
        {
            headerName: "Entry Photo1",
            field: "entry_photo1",
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    <a href={`${params.data.entry_photo1}`} target="_blank" className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto " >
                        Entry Photo2
                    </a>
                    // {/* </button> */}
                )
            },
        },
        {
            headerName: "Entry Photo2",
            field: "entry_photo2",
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    params.data.entry_photo2 &&
                    <a href={`${params.data.entry_photo2}`} target="_blank" className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto " >
                        Entry Photo2
                    </a>
                    // {/* </button> */}
                )
            },
        },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 200,
            resizable: false,
            // filter: true,
            // floatingFilter: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        getRequestWithToken(`registrar/getParentLogs`)
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
        const headerRow = 'student_id,name1,name2,mobile,purpose,exit_time,entry_time,Exit Authorised By, Entry Authorised By,photo_exit1,photo_exit2,entry_photo1,entry_photo2'
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
            { headerName: "Name 1", field: "name1" },
            { headerName: "Name 2", field: "name2" },
            { headerName: "Mobile", field: "mobile" },
            { headerName: "Purpose", field: "purpose" },
            { headerName: "Exit Date & Time", field: "exit_time" },
            { headerName: "Entry Date & Time", field: "entry_time" },
            { headerName: "Exit Authorised By", field: "exit_authorised_by" },
            { headerName: "Entry Authorised By", field: "entry_authorised_by" },
            { headerName: "Exit Photo1", field: "exit_photo1" },
            { headerName: "Exit Photo2", field: "exit_photo2" },
            { headerName: "Entry Photo1", field: "entry_photo1" },
            { headerName: "Entry Photo2", field: "entry_photo2" },
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
                    className="ag-theme-alpine"
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

export default ParentRecordsList
