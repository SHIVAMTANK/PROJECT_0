import React, {
    useCallback,
    useMemo,
    useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { BACKEND_URL } from "../../Services/Helpers";
import { useNavigate } from "react-router-dom";
import { getRequestWithToken } from "../../Services/Api";

// sample data from response
// [
//     {
//         "_id": "665e111ac9d9d2eb47cc5a04",
//         "uuid": "0b7fe48e-7e7c-49fc-beb3-0acb8d4cab2bvisitor",
//         "name": "dfsdfds",
//         "mobile": "undefined",
//         "purpose": "sdfdsfdsfs",
//         "entry_time": "4/6/2024, 12:23:09 am",
//         "photo": "https://btsri.blob.core.windows.net/undefined//tmp/tmp-1-1717440789226",
//         "__v": 0
//     },
//     {
//         "_id": "665e11e7c9d9d2eb47cc5a06",
//         "uuid": "5d0f3278-26c2-482c-9abf-59011505879evisitor",
//         "name": "ugkghhj",
//         "mobile": "6565656566",
//         "purpose": "gfgffjygkjm",
//         "entry_time": "4/6/2024, 12:26:35 am",
//         "photo": "https://btsri.blob.core.windows.net/undefined//tmp/tmp-2-1717440995032",
//         "__v": 0
//     }
// ]

const CurrentList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();

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
            headerName: "Entry Authorised By",
            field: "entry_authorised_by",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Photo",
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
            resizable: false,
            // filter: true,
            // floatingFilter: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        getRequestWithToken(`security/getCurrentVisitors`)
            .then((resp) => {
                if (resp.status === 401) {
                    alert('Session expired. Please login again');
                    navigate('/login');
                }
                return resp.data
            })
            .then((data) => setRowData(data));
    }, []);

    return (
        <>
            <div
                style={gridStyle}
                className="ag-theme-quartz "
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                />
            </div>

        </>
    );
};

export default CurrentList

// Path: FrontEnd/Security/src/Views/Visitors/index.jsx
