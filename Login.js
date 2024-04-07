import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleLogin, GoogleLogout, } from 'react-google-login';
import { gapi } from 'gapi-script';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import Register from './register';
import { ReactSession } from 'react-client-session';
import Swal from 'sweetalert2';
import logo from '../src/image/Logo.png';
function Login() {

  const clientId = "80445697984-hft4hh6kkictok8q22lm89nunm1l8vt7.apps.googleusercontent.com"

  const [flag, setflag] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [tel,setTel] = useState("");
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      })
    }
    gapi.load("client:auth2", initClient)
  }, [])
  

  const onSuccess = async (res) => {
    const { name, email } = res.profileObj;
  
    try {
      // ทำการเรียก API เช็คข้อมูลในฐานข้อมูลว่ามีอีเมล์ที่เข้าสู่ระบบอยู่แล้วหรือไม่
      const response = await Axios.get(`http://localhost:5000/user1/${email}`);
      console.log("ข้อมูลที่ได้รับ:", response.data);
  
      if (response.data.length > 0 && response.data[0].email === email && response.data[0].statused === "Active") {
        // มีข้อมูลในฐานข้อมูลแล้ว จะทำการเซ็ตค่าและเปลี่ยนหน้าไปยังหน้าหลัก
        setProfile(res.profileObj);
        localStorage.setItem('username', email);
        console.log('name:', name);
        console.log('email:', email);
        console.log('success', res.profileObj);
        setflag(true);
        navigate(`/user`);
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการตรวจสอบข้อมูลผู้ใช้:", error);
    }
  }
  

  const onFailure = (res) => {
    console.log('failed', res)
  }

  const logOut = () => {
    setProfile(null);
    setflag(false);
  }
  const handleClick = (event) =>{
    navigate("/register")
  }

  return (
    <div>
      {flag ? (
       <div>
       <Box
           component="form"
           sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               padding: 5,
           }}
           noValidate
           autoComplete="off"
       >
           <div style={{ display: 'flex', flexDirection: 'column', width: '50ch' }}>
               <TextField

                   id="outlined-required"
                   label="Name"
                   defaultValue={profile.name}
               />
               <br />
               <TextField
                   disabled
                   id="outlined-disabled"
                   label="Email"
                   defaultValue={profile.email}
               />
               <br />
               <TextField
                   id="outlined-required"
                   label="Tel" 
                   type='number'
                   defaultValue=" "
                   onChange={(event) => {
                    setTel(event.target.value)
                  }}
               />
           </div>
       </Box>
   </div>
      ) : (<div className="App">
        <header className="App-header">
        <img src={logo} alt="โลโก้แอพ" style={{width:400}}/>
          <GoogleLogin
            clientId={clientId}
            buttonText='LOG IN WITH GOOGLE'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
            render={(renderProps) => (
              <button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{
                  backgroundColor: '#F5B041', /* เปลี่ยนสีพื้นหลังเป็นสีแดง*/
                  color: '#ffffff', /*เปลี่ยนสีตัวอักษรเป็นสีขาว*/
                  fontSize: '20px', /* เปลี่ยนขนาดตัวอักษร*/
                  width: '600px' , /* กำหนดความกว้าง */
                  height: '75px' , /* กำหนดความสูง */
                  margin: '30px' , /*กำหนดระยะห่าง */
                  cursor: 'pointer', /* ทำให้เมาส์เป็นรูปแบบของมือ*/
                }}
              >
                เข้าสู่ระบบ
              </button>
            )}
          />
          <button 
              onClick={handleClick}
              style={{
                  backgroundColor: '#F50303 ', /* เปลี่ยนสีพื้นหลังเป็นสีแดง*/
                  color: '#ffffff', /*เปลี่ยนสีตัวอักษรเป็นสีขาว*/
                  fontSize: '20px', /* เปลี่ยนขนาดตัวอักษร*/
                  width: '600px' , /* กำหนดความกว้าง */
                  height: '75px' , /* กำหนดความสูง */
                  margin: '10px' , /*กำหนดระยะห่าง */
                  cursor: 'pointer', /* ทำให้เมาส์เป็นรูปแบบของมือ*/
                }}>
              สมัครเข้าสู่ระบบด้วยบัญชี google
            </button>

        </header>
      </div>
      )}
    </div>
  );
}

export default Login;