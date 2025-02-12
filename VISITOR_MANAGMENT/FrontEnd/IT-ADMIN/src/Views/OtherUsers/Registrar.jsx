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
import Cookies from "js-cookie";
import { postRequestWithToken } from "../../Services/Api";



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


const RegistrarList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const deleteRegistrar = async (uuid) => {
        console.log(uuid)
        const response = await postRequestWithToken('itAdmin/deleteUser', {
            uuid: uuid,
            role: 'registrar'
        })

        // console.log(response)
        if (response.status == 200) {
            alert('Registrar Deleted Successfully')
            const data = await fetch(`${BACKEND_URL}/itAdmin/getRegistrar`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Cookies.get("token"),
                },
            })
            const dataJson = await data.json()
            setRowData(dataJson)
        }
        else {
            alert('Failed to delete. Please try again later.')
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
            headerName: "Email",
            field: "email",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Delete",
            field: "uuid",
            cellRenderer: function (params) {
                const _uuid = params.data.uuid
                return (
                    <span onClick={() => deleteRegistrar(_uuid)} className="bg-red-500 hover:bg-red-400 text-white h-[40px] py-2 px-8 rounded-3xl cursor-pointer" >
                        Delete
                    </span>
                )
            }
        }
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
        fetch(`${BACKEND_URL}/itAdmin/getRegistrar`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Cookies.get("token"),
            },
        })
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
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

export default RegistrarList

// path: FrontEnd/IT-ADMIN/src/Views/OtherUsers/Registrar.jsx
