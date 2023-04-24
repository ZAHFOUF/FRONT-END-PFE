import { useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AES  } from 'crypto-js';

// components
import Swal from 'sweetalert2';

import Iconify from '../../../components/iconify';

import axios from '../../../api/axios'
import { useContextProvider } from '../../../context/contextProvider';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const em = useRef(null)
  const pwd = useRef(null)
  const { _setToken , setUser } = useContextProvider()

  async function getTooken () {
    axios.get("/sanctum/csrf-cookie").then((e)=>console.log(e)).catch((e)=>console.log(e))
}

async function Login (e,p) {
getTooken()
axios.post("/api/login",{email:e,password:p}).then((e)=>{
 
  const hash = AES.encrypt(e.data.user.role[0].name,"younes").toString()
  
 
  const token = AES.encrypt(e.data.token,"younes").toString()

  const userName = AES.encrypt(e.data.user.name,"younes").toString()

  const userEmail = AES.encrypt(e.data.user.email,"younes").toString()
  






 const session = {st:token,user:{name:userName,email:userEmail,role:hash}}
 
 window.localStorage.setItem("user_session",JSON.stringify(session))
 _setToken(e.data.token)
 setUser({name:e.data.user.name,email:e.data.user.email,role:e.data.user.role[0].name})
 navigate("/")
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


  

  return (
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
      </LoadingButton>
    </>
  );
}
