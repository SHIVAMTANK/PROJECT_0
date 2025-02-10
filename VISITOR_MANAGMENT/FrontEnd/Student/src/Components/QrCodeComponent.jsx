import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import Logo from './../Assets/Logo.png'
import { useNavigate } from 'react-router-dom';

const QrCodeComponent = ({ value ="" }) => {


    // console.log(value);
    return (
        <>
        {
            value == "" ? 
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue3"></div>
            </div> :

            <QRCodeSVG
            value={value}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
            // imageSettings={{
            //     src: Logo,
            //     x: undefined,
            //     y: undefined,
            //     height:20,
            //     width:20,
            //     excavate: true,
            // }}
        />
        }
        </>
    )
}

export default QrCodeComponent
