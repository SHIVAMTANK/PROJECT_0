import React, {
    useCallback,
    useMemo,
    useState,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { BACKEND_URL } from "../../Services/Helpers";
import { Link } from "react-router-dom";
import { getRequestWithToken, postRequestWithToken } from "../../Services/Api";

// [
//     {
//         "_id": "6654424275cf630783ef3ccd",
//         "name": "Vikram Malhotra",
//         "student_id": 202110901,
//         "vehicle": "MH 12 CD 1234"
//     },
// ]

const VechicleList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();

    const deleteVehicle = async (student_id) => {
        // console.log(student_id)
        const response = await postRequestWithToken('hostelWarden/removeVehicle', { student_id: student_id })

        // console.log(response)
        if (response.status == 200) {
            alert('Vehicle Deleted Successfully')
            const data = await fetch(`${BACKEND_URL}/hostelWarden/getVehicle`)
            const dataJson = await data.json()
            setRowData(dataJson)
        }
        else {
            alert('Failed to delete vehicle')
        }
    }

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Name",
            field: "name",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Student ID",
            field: "student_id",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Vehicle Number",
            field: "vehicle",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        // {
        //     headerName: "Delete",
        //     field: "student_id",
        //     // filter: "agDateColumnFilter",
        //     // sortable: true,
        //     cellRenderer: function (params) {
        //         const sid = params.data.student_id
        //         return (
        //             <button onClick={() => deleteVehicle(sid)} className="bg-red-500 hover:bg-red-400 text-white h-[40px] py-0 px-8 rounded-3xl" >
        //                 Delete
        //             </button>
        //         )
        //     }
        // },
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
        getRequestWithToken(`hostelWarden/getVehicle`)
            .then((resp) => {
                if (resp.status === 401) {
                    alert('Session expired. Please login again')
                    window.location.href = '/login'
                }
                return resp.data;
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

export default VechicleList

// Path: FrontEnd/Security/src/Views/Visitors/index.jsx
