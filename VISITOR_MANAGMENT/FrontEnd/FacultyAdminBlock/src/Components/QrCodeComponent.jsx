import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import Logo from './../Assets/Logo.png'
import { useNavigate } from 'react-router-dom';

const QrCodeComponent = ({ value ="www.reactjs.com" }) => {


    // console.log(value);
    return (
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
    )
}

export default QrCodeComponent
