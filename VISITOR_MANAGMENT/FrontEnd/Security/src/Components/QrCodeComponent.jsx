import React from 'react'
import { QRCodeSVG } from 'qrcode.react';
import Logo from './../Assets/Logo.png'
import { Navbar } from './Navbar';
import { StickyFooterMobile } from './StickyFooterMobile';

const QrCodeComponent = ({ value = "www.reactjs.org" }) => {
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
            //     height: 70,
            //     width: 70,
            //     excavate: true,
            // }}
        />
    )
}

export default QrCodeComponent
