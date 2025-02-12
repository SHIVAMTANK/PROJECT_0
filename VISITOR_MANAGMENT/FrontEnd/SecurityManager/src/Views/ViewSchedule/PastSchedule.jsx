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

// [
//     {
//         "_id": "6679de2628badae58c369a3b",
//         "date": "27/06/2024",
//         "shift1": [
//             {
//                 "name": "Security 1",
//                 "mobile": 762205112,
//                 "_id": "6679c14427b9860ad21c54c4"
//             },
//             {
//                 "name": "Security 2",
//                 "mobile": 7632105112,
//                 "_id": "6679c15027b9860ad21c54cb"
//             },
//             {
//                 "name": "Security4",
//                 "mobile": 8832113112,
//                 "_id": "6679c16527b9860ad21c54d9"
//             }
//         ],
//         "shift2": [
//             {
//                 "name": "Security3",
//                 "mobile": 7632113112,
//                 "_id": "6679c15d27b9860ad21c54d2"
//             },
//             {
//                 "name": "Security5",
//                 "mobile": 8802113112,
//                 "_id": "6679c17027b9860ad21c54e0"
//             },
//             {
//                 "name": "Security7",
//                 "mobile": 9902113989,
//                 "_id": "6679c18a27b9860ad21c54ec"
//             }
//         ],
//         "shift3": [
//             {
//                 "name": "Shubham",
//                 "mobile": 7622051655,
//                 "_id": "6672e53dc7d001453a1f981c"
//             },
//             {
//                 "name": "Shubham",
//                 "mobile": 7622051111,
//                 "_id": "6672e54ac7d001453a1f9822"
//             },
//             {
//                 "name": "Security8",
//                 "mobile": 9909913989,
//                 "_id": "6679c19527b9860ad21c54f3"
//             }
//         ],
//         "__v": 0
//     }
// ]

const PastScheduleList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const navigate = useNavigate();

    const [columnDefs, setColumnDefs] = useState([
        {
            headerName: "Date",
            filter: "agTextColumnFilter",
            sortable: true,
            cellRenderer: (params) => {
                return params.data.date;
            }
        },
        {
            headerName: "Shift 1",
            field: "name1",
            filter: "agTextColumnFilter",
            sortable: true,
            cellRenderer: (params) => {
                return (
                    <div className="flex flex-col gap-0 text-black justify-between">

                        {params.data.shift1.map((shift) => {
                            return (
                                <div className="block p-0 h-8">
                                    {shift.name} ,
                                </div>
                            );
                        }
                        )}
                    </div>
                )
            }

        },
        {
            headerName: "Shift 2",
            field: "name2",
            filter: "agTextColumnFilter",
            sortable: true,
            cellRenderer: (params) => {
                return (
                    <div className="flex flex-col gap-0 text-black justify-between">

                        {params.data.shift2.map((shift) => {
                            return (
                                <div className="block p-0 h-8">
                                    {shift.name} ,
                                </div>
                            );
                        }
                        )}
                    </div>
                )
            }
        },
        {
            headerName: "Shift 3",
            field: "name3",
            filter: "agTextColumnFilter",
            sortable: true,
            cellRenderer: (params) => {
                return (
                    <div className="flex flex-col gap-0 text-black justify-between">

                        {params.data.shift3.map((shift) => {
                            return (
                                <div className="block p-0 h-8">
                                    {shift.name} ,
                                </div>
                            );
                        }
                        )}
                    </div>
                )
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
        getRequestWithToken(`securityManager/getShiftLogs`)
            .then((resp) => {
                if (resp.status === 401) {
                    alert('Session expired. Please login again');
                    navigate('/login');
                }
                return resp.data
            })
            .then((data) => {

                console.log(data);
                // const rowData = [
                // ];

                // for (let i = 0; i < data.length; i++) {

                // };

                // console.log(rowData);
                setRowData(data);
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
                        rowHeight={100}
                    />
                </div>
            </div>
        </>
    );
};

export default PastScheduleList
