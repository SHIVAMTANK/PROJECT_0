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
import { getRequest, getRequestWithToken } from "../../Services/Api";


// {
//     "_id": "6672e53dc7d001453a1f981c",
//     "name": "Shubham",
//     "mobile": 7622051655,
//     "uuid": "95e3550a-2aca-47ab-a986-f39521545f03staff",
//     "shift": 3
// },

// {
// [
//     {
//         "_id": "6672e53dc7d001453a1f981c",
//         "name": "Shubham",
//         "mobile": 7622051655,
//         "uuid": "95e3550a-2aca-47ab-a986-f39521545f03staff",
//         "shift": 3
//     },
//     {
//         "_id": "6672e54ac7d001453a1f9822",
//         "name": "Shubham",
//         "mobile": 7622051111,
//         "uuid": "8807a4cd-d182-4475-92c2-ffaab6e992b1staff",
//         "shift": 3
//     },
//     {
//         "_id": "6679c14427b9860ad21c54c4",
//         "name": "Security 1",
//         "mobile": 762205112,
//         "uuid": "aecda1ad-4d77-42ba-ae36-41777ecebbd4staff",
//         "shift": 1
//     },
//     {
//         "_id": "6679c15027b9860ad21c54cb",
//         "name": "Security 2",
//         "mobile": 7632105112,
//         "uuid": "dbaa7099-cf15-4e31-9df4-2a22ef3fd1fcstaff",
//         "shift": 1
//     },
//     {
//         "_id": "6679c15d27b9860ad21c54d2",
//         "name": "Security3",
//         "mobile": 7632113112,
//         "uuid": "9935e829-5c37-49bd-979b-e673737174fbstaff",
//         "shift": 2
//     },
//     {
//         "_id": "6679c16527b9860ad21c54d9",
//         "name": "Security4",
//         "mobile": 8832113112,
//         "uuid": "ef7ee209-4b6b-4277-8e9e-0b191d735404staff",
//         "shift": 1
//     },
//     {
//         "_id": "6679c17027b9860ad21c54e0",
//         "name": "Security5",
//         "mobile": 8802113112,
//         "uuid": "297f6c2d-64c2-41b6-a79b-7ec46f3f8ccbstaff",
//         "shift": 2
//     },
//     {
//         "_id": "6679c18a27b9860ad21c54ec",
//         "name": "Security7",
//         "mobile": 9902113989,
//         "uuid": "a5dd4503-fe79-499f-91ec-d1c455d3e311staff",
//         "shift": 2
//     },
//     {
//         "_id": "6679c19527b9860ad21c54f3",
//         "name": "Security8",
//         "mobile": 9909913989,
//         "uuid": "a7ae9df0-3d21-43d7-b256-63c7db1a7499staff",
//         "shift": 3
//     }
// ]
// }


const ScheduleList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const navigate = useNavigate();

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Shift",
            filter: "agTextColumnFilter",
            sortable: true,
            cellRenderer: (params) => {
                return params.data.shift;
            }
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
            headerName: "Name 3",
            field: "name3",
            filter: "agTextColumnFilter",
            sortable: true,
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
        getRequestWithToken(`securityManager/getTodaysShift`)
            .then((resp) => {
                if (resp.status === 401) {
                    alert('Session expired. Please login again');
                    navigate('/login');
                }
                return resp.data
            })
            .then((data) => {

                // console.log(data);
                const rowData = [
                    { shift: "Shift 1 (07:00 AM - 3:00 PM)", name1: "", name2: "", name3: "" },
                    { shift: "Shift 2 (3:00 PM - 11:00 PM)", name1: "", name2: "", name3: "" },
                    { shift: "Shift 3 (11:00 PM - 07:00AM)", name1: "", name2: "", name3: "" }
                ];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].shift === 1) {
                        if (rowData[0].name1 === "") {
                            rowData[0].name1 = data[i].name;
                        }
                        else if (rowData[0].name2 === "") {
                            rowData[0].name2 = data[i].name;
                        }
                        else if (rowData[0].name3 === "") {
                            rowData[0].name3 = data[i].name;
                        }
                    }
                    else if (data[i].shift === 2) {
                        if (rowData[1].name1 === "") {
                            rowData[1].name1 = data[i].name;
                        }
                        else if (rowData[1].name2 === "") {
                            rowData[1].name2 = data[i].name;
                        }
                        else if (rowData[1].name3 === "") {
                            rowData[1].name3 = data[i].name;
                        }
                    }
                    else if (data[i].shift === 3) {
                        if (rowData[2].name1 === "") {
                            rowData[2].name1 = data[i].name;
                        }
                        else if (rowData[2].name2 === "") {
                            rowData[2].name2 = data[i].name;
                        }
                        else if (rowData[2].name3 === "") {
                            rowData[2].name3 = data[i].name;
                        }
                    }
                };

                console.log(rowData);
                setRowData(rowData);
            });
    }, []);


    return (
        <>
            <div className="w-screen h-screen p-8" >

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

export default ScheduleList
