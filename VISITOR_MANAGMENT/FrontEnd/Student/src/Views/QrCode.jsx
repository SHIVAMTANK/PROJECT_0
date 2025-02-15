import React, { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { StickyFooterMobile } from "../Components/StickyFooterMobile";
import QrCodeComponent from "../Components/QrCodeComponent";
import { getRequestWithToken } from "../Services/Api";
import { useNavigate } from "react-router-dom";

const QrCode = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Fetching data from backend
  useEffect(() => {
    getRequestWithToken("student/getData")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Profile Box with Name, Email & QR Code */}
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[350px] space-y-6">
          {/* Name & ID */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-blue-600">{data?.name || "Unknown"}</h1>
            <p className="text-blue-500 font-light">{data?.student_id || "N/A"}</p>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center items-center bg-gray-200 p-6 rounded-xl">
            {data?.uuid ? <QrCodeComponent value={data.uuid} /> : <p>No QR Code Available</p>}
          </div>

          {/* Go Back Button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300"
              onClick={() => navigate("/profile")}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <StickyFooterMobile />
    </>
  );
};

export default QrCode;
