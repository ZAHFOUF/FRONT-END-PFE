import { useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

import axios from '../../../api/axios'


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const em = useRef(null)
  const pwd = useRef(null)


 
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    const e= em.current.querySelector("input").value
    const p = pwd.current.querySelector("input").value


    axios.post("/login",{email:"younes@example.com",password:"1234tipo"}).then((e1)=>{console.log(e1)})
    .catch((e1)=>{console.log(Error(e1));})
  
    
  };

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
