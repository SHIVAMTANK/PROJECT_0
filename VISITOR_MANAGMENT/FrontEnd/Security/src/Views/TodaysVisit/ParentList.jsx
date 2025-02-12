import React, {
    useCallback,
    useMemo,
    useState,
    useRef
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { BACKEND_URL } from "../../Services/Helpers";
import { useNavigate } from "react-router-dom";
import { getRequestWithToken } from "../../Services/Api";

// [
//     {
//         "_id": "666aca82ad4fd664fbb0c9bc",
//         "uuid": "2ed79cb6-b480-4b71-8e0a-6c5b82eade9cparent",
//         "student_id": 20210464,
//         "name1": "Pushpaben",
//         "name2": "",
//         "mobile": 9898767657,
//         "arrival_date": "2024-06-13T10:31:30.000Z",
//         "purpose": "visit",
//         "__v": 0
//     }
// ]


const ParentListGrid = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const navigate = useNavigate();

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
            headerName: "Add visit",
            field: "uuid",
            cellRenderer: function (params) {
                return (
                    // <button className="bg-blue3 hover:bg-blue4 text-white font-bold h-[32px] px-4 rounded-3xl my-auto " >
                    <span className="bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded-3xl my-auto outline-none cursor-pointer" onClick={() => {
                        navigate("/parent/entry", { state: { parentdata : params.data } })
                    }}>
                        Add Visit
                    </span>
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
        getRequestWithToken(`security/getParentList`)
        .then((resp) => {
            if (resp.status === 401) {
                alert('Session expired. Please login again');
                navigate('/login');
            }
            return resp.data
        })
        .then((data) => setRowData(data));
    }, []);

    function convertToCsv(rowData, columnDefs) {
        // Extract column headers
        const columnHeaders = columnDefs.map(column => column.headerName);

        // Extract keys in the order they appear in columnDefs
        const keys = columnDefs.map(column => column.field);

        // Create CSV header row
        const headerRow = "Name,Mobile,Purpose,Exit Date,Exit Time,Entry Date,Entry Time,Exit Photo,Entry Photo";
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
            { headerName: "Purpose", field: "purpose" },
            { headerName: "Exit Date & Time", field: "exit_time" },
            { headerName: "Entry Date & Time", field: "entry_time" },
            { headerName: "Exit Photo", field: "photo_exit" },
            { headerName: "Entry Photo", field: "photo_entry" },
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

export default ParentListGrid

// Path: FrontEnd/Security/src/Views/ParentVisit/ParentListGrid.jsx
