import React from "react";
import logo from "../src/image/Logo.png";

function Navbar() {
    return (
        <div>
            <header style={{ display: 'flex', backgroundColor: '#07C27F', }}>
                <div>
                    <img src={logo} style={{ padding: 20, height: 80, width: 80, }} />
                </div>
                <div>
                    <p style={{ color: 'white', padding: 20, fontSize: 24, }}>AVB</p>
                </div>
                <div>
                    <h1 style={{ color: 'white', padding: 15 ,paddingLeft:500}}>Profile</h1>
                </div>
            </header>
        </div>
    );
}
export default Navbar;