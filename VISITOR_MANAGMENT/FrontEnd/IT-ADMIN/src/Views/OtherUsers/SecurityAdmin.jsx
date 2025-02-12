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
import { postRequest, postRequestWithToken } from "../../Services/Api";

// sample data from response
// [
//     {
//         "name" : "John Doe",
//         "email" : "asaa@daii",
//         "mobile" : "1234567890",
//         "uuid" : "232312312ljafbwhd",
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


const SecurityAdminList = () => {

    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState();
    const gridRef = useRef();

    const deleteWarden = async (uuid) => {
        const response = await postRequestWithToken('itAdmin/deleteUser', {
            uuid: uuid,
            role: 'securityManager'
        })

        // console.log(response)
        if (response.status == 200) {
            alert('Security-Admin Deleted Successfully')
            const data = await fetch(`${BACKEND_URL}/itAdmin/getSecurityManager`, {
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
            headerName: "Mobile",
            field: "mobile",
            filter: "agTextColumnFilter",
            sortable: true,
        },
        {
            headerName: "Delete",
            field: "uuid",
            cellRenderer: function (params) {
                const _uuid = params.data.uuid
                return (
                    <span onClick={() => deleteWarden(_uuid)} className="bg-red-500 hover:bg-red-400 text-white h-[40px] py-2 px-8 rounded-3xl cursor-pointer" >
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
        fetch(`${BACKEND_URL}/itAdmin/getSecurityManager`, {
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
                {
                    !rowData && <div>Loading...</div>
                }
                {
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
                }
            </div>
        </>
    );
};

export default SecurityAdminList

// path: FrontEnd/IT-ADMIN/src/Views/OtherUsers/Registrar.jsx
