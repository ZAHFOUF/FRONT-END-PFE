/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-const */
import { useState  ,  useRef} from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox , Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AES  } from 'crypto-js';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Swal from 'sweetalert2';

import { auth } from '../../../firebase.setting';
import { settings } from '../../../_mock/user';


// components

import Iconify from '../../../components/iconify';

import axios from '../../../api/axios'
import { useContextProvider } from '../../../context/contextProvider';


var UserRole = ''
  
 
 var token =''

var userName = ''

 var userEmail = ''

 var phone = 'a'

 var ic = ''

 var idd = 0


 var session = {st:token,user:{name:userName,email:userEmail,role:UserRole,icon:ic}}

// ----------------------------------------------------------------------

export default function LoginForm(props) {






  const navigate = useNavigate();
  const em = useRef(null)
  const pwd = useRef(null)
  const { _setToken , setUser } = useContextProvider()
  const [otpIn,setOtp] = useState('')

  const handelOtp = (e)=>{
    
     setOtp(e.target.value)
  }



  
  





  

  async function getTooken () {
    axios.get("/sanctum/csrf-cookie").then((e)=>console.log(e)).catch((e)=>console.log(e))
}

async function Login (e,p) {
getTooken()
axios.post("/api/login",{email:e,password:p}).then((e)=>{

 
   UserRole = e.data.user.role[0].name
  
 

 
   token = e.data.token

   userName = e.data.user.nom

    userEmail =e.data.user.email

    phone = e.data.user.phone_number

    ic = e.data.user.photo
    idd = e.data.user.id

   
  


  session = {st:AES.encrypt(e.data.token,"younes").toString(),user:{id:idd,icon:ic,name:AES.encrypt(e.data.user.nom,"younes").toString(),email:AES.encrypt(e.data.user.email,"younes").toString(),role:AES.encrypt(e.data.user.role[0].name,"younes").toString()}}

   
  if (settings.OTP === true) {
    // otp verification
    props.setOtpCase(true)

    onSignup(phone)

  }else{
    window.localStorage.setItem("user_session",JSON.stringify(session))
    _setToken(token)
    setUser({name:userName,email:userEmail,role:UserRole,icon:ic,id:idd})
    navigate("/")
  }
  
  /*
 
 window.localStorage.setItem("user_session",JSON.stringify(session))
 _setToken(e.data.token)
 setUser({name:e.data.user.nom,email:e.data.user.email,role:e.data.user.role[0].name})
 navigate("/") */


}).catch((e)=>{
  console.log(e);
       Swal.fire({title:"Someting wrong",icon:"error"})
})

  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    const e= em.current.querySelector("input").value
    const p = pwd.current.querySelector("input").value
    
    Login(e,p)
  

     
}





  /* OTP FUNCTIONS */


  const handelVer = () =>{

    console.log(otpIn);
    
   window.confirmationResult
      .confirm(otpIn)
      .then(async (res) => {
        window.localStorage.setItem("user_session",JSON.stringify(session))
        _setToken(token)
        setUser({name:userName,email:userEmail,role:UserRole,icon:ic,id:idd})
        navigate("/")
      
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({"title":"You Wrong !!","icon":"error"})
      }); 

  }

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }
  
  function onSignup(phoneNumber) {
    
    onCaptchVerify();
  
    const appVerifier = window.recaptchaVerifier;
  
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("YES");
     
      })
      .catch((error) => {
        console.log(error);
      
      });
  }


  /* ------------------------------------------------------------------------------*/
  

  return (
    <>
              <div id='recaptcha-container'></div>


  
{ ! props.otpCase &&

    <> 
        <Stack  spacing={3}>
       <TextField ref={em} name="email" label="Email address" />

       <TextField
       ref={pwd}

         name="password"
         label="Password"
         type={showPassword ? 'text' : 'password'}
         InputProps={{
           endAdornment: (
             <InputAdornment  position="end">
               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                 <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
               </IconButton>
             </InputAdornment>
           ),
         }}
       />
     </Stack>

     <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
       <Checkbox name="remember" label="Remember me" />
       <Link variant="subtitle2" underline="hover">
         Forgot password?
       </Link>
     </Stack>

     <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
       Login
     </LoadingButton> </> }

     { props.otpCase &&

<> 

<div className='con1'>

<div className='con2'>

<h2> OTP VERIFICATION </h2> 

<p> We send In Your Phone number an otp code for verification !</p>

<TextField
    id="outlined-number"
    label="YOUR CODE"
    type="number"
    required
    value={otpIn}
    onChange={handelOtp}
    // eslint-disable-next-line react/jsx-boolean-value
    focused={true}
    InputLabelProps={{
      shrink: true,
    }}
  />

<Button sx={{marginTop:'30px' , width:'150px'}} onClick={handelVer}  variant="contained"> Verify OTP </Button>


</div>



</div>

</>

 }


   
    
    
    </>
  );
}
