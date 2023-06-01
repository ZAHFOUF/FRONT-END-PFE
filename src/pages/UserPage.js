/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable import/order */
import { Helmet } from 'react-helmet-async';
import { filter , sample, update } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState , useEffect } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


import { actionsRoles, actionsUsers } from '../store';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Dialog ,
  DialogTitle ,
  TextField ,
  DialogContentText,
  DialogContent ,
  DialogActions,
  FormControl,
  InputLabel,
  Select ,
  Collapse ,
  Box ,
  Alert ,
  Backdrop ,
  CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import { faker } from '@faker-js/faker';
import { useDispatch , useSelector } from 'react-redux';
import '../theme/css/index.css'
import axios from '../api/axios'
import AlertDialogSlide from '../components/dailog/index';

import Swal from 'sweetalert2';
import { Message } from '@mui/icons-material';
import { useContextProvider } from '../context/contextProvider';
import { useNavigate } from 'react-router-dom';
import { loadRoles } from '../store/res/roles';


// --------------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'phone', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];




// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const load = true


export default function UserPage(props) {
  const [open, setOpen] = useState(null);
  const [otp, setOtp] = useState('');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open2, setOpen2] = useState(false)

  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)
  const [open6, setOpen6] = useState(true)
  const roles =useSelector((state)=> state.roles)


  const [message, setMessage] = useState(' ')



  const [userPoint,setuserPoint] = useState(null)

  const [up,setUp] = useState(false)

  const [userUpdate,setuserUpdate] = useState({})


  const [age, setAge] = useState('admin')

  const [textAlert,settextAlert] = useState(" ")

  const [photoSrc,setPhoto] = useState(" ")

  const dispatch = useDispatch()
  const navigate = useNavigate();




  
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const handleClickOpen = () => {
    setOpen2(true);
    setOpen3(false)
    setuserUpdate({})
    setAge('admin')
    setPhoto(' ')
    setOpen5(false)
  };

  const handleClose = () => {
      setOpen2(false);
      setUp(false)
  };

  const handleClose6 = () => {
    setOpen6(false);
};



  const USERLIST = useSelector((state)=>{
     return state.users
})

const handleChangePhoto = (e) => {
  const file = e.target.files[0];
  if (file) {
    const photoURL = URL.createObjectURL(file);
    setPhoto(photoURL)
  }
};

  const handleOpenMenu = (event,id) => {
    setOpen(event.currentTarget);
    setuserPoint(id)
  };

  const handelDelete =()=>{
     setOpen4(true)
     setOpen(null)
  }

  const handelUpdate =()=>{
     const user = USERLIST.filter((e)=> e.id === userPoint)
      setuserUpdate(user[0])
     setAge(user[0].role)
    setOpen(null)
    setUp(true)
    setPhoto(user[0].avatarUrl)
    setOpen2(true)
 }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const handleSumbit = (e)=>{
    e.preventDefault()
    if (up === false) {
      
      const data = {photo:e.target[0].files[0],name:e.target[1].value,prenom:e.target[2].value,email:e.target[3].value,phone_number:e.target[4].value,roles:[e.target[5].value]}
     
      const formData = new FormData();
formData.append('name', data.name);
formData.append('prenom', data.prenom);
formData.append('phone_number', data.phone_number);
formData.append('email', data.email);
formData.append('roles', data.roles);
formData.append('photo', data.photo); // where `file` is a File object

const headers = {  'Content-Type': 'multipart/form-data' }



      axios.post("/api/users",formData,headers).then((e)=>{

       
        
         const resUser = {
          id: e.data.user.id,
          avatarUrl: e.data.user.photo,
          name: e.data.user.nom ,
          prenom : e.data.user.prenom ,
          company: e.data.user.email,
          phone: e.data.user.phone_number,
          status: 'active',
          role:data.roles[0] ,
         }
         dispatch(actionsUsers.addUsers(resUser)) 
         setOpen2(false)
         setOpen3(true)
         settextAlert('Employeeadded successfully !')
       
      }).catch((e)=> {
          // if error

          setMessage(e.response.data.message);

          setOpen5(true)


          
      })
    }else if (up === true) {

      const data = {photo:null,name:e.target[1].value,prenom:e.target[2].value,email:e.target[3].value,phone_number:e.target[4].value,roles:[e.target[5].value]}
     
    

      axios.put(`/api/users/${userPoint}`,data).then((e)=>{

       
        
        const resUser = {
          id: e.data.user.id,
          avatarUrl: e.data.user.photo,
          name: e.data.user.nom ,
          prenom : e.data.user.prenom ,
          company: e.data.user.email,
          phone: e.data.user.phone_number,
          status: 'active',
          role:data.roles[0] ,
         }
         dispatch(actionsUsers.upUsers({id:userPoint,data:resUser})) 
         setOpen2(false)
         setOpen3(true)
         settextAlert('Employeeupdated successfully !') 
       
      })
    }
  



    
  }

  const handelName = (e)=>{
        setuserUpdate({name:e.target.value , phone:userUpdate.phone  , email: userUpdate.email , prenom:userUpdate.prenom})
  }

  const handelEmail = (e)=>{
    setuserUpdate({name: userUpdate.name , phone:userUpdate.phone , email:  e.target.value , prenom:userUpdate.prenom})
}

const handelPrenom = (e)=>{
  setuserUpdate({name: userUpdate.name , phone:userUpdate.phone , email:  userUpdate.email , prenom:e.target.value})
}

const { _setToken , setUser , can } = useContextProvider()

/* ----------------------------------- axios load data -------------------------------------------*/


useEffect(()=>{

 
let users = []

  axios.get("/api/users").then((e)=>{
    setOpen6(false)

  
    const data = e.data.data

    
    
  
    data.map((e,i)=>{
       users.push({
        id: e.id,
        avatarUrl: e.photo,
        name: e.nom  ,
        prenom :e.prenom ,
        company: e.email,
        isVerified: faker.datatype.boolean(),
        status: 'active',
        phone:e.phone_number ,
        role: e.role[0]?.name ?? null,
       })
  
       return 0
  
    })

  
    
  
    dispatch(actionsUsers.loadUsers(users))
  
  
  }).catch((e)=>{
    dispatch(actionsUsers.loadUsers([]))
    
    if ( e.response.status === 401 ) {
     
      setOpen6(false)
      Swal.fire({title:e.response.data.message,icon:"error",timer:1500})
      setTimeout(() => {
        localStorage.removeItem("user_session")
        _setToken(0)
        setUser({})
        navigate("/login")
      }, 1500);

      
      

    }else{
      Swal.fire({title:e.message,icon:"error"})
    }
  
  })

  if (  can("read-roles")  ) {
    loadRoles((e)=>{dispatch(actionsRoles.loadRoles(e.roles))})

    
  }





},[dispatch])


/* ----------------------------------------------------------------------------------------*/




/* -------------------------------- return the component ----------------------------------------------*/
  

  return (
    <>

  

      <Helmet>
        <title> Employee| Minimal UI </title>
      </Helmet>

      <Container>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open6}
        onClick={handleClose6}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

        

        <AlertDialogSlide id={userPoint} open={open4} setOpen={setOpen4} />
        

     


        <Dialog open={open2} onClose={handleClose}>

        <Box sx={{ width: '80%' , margin:'10px'}}>
      <Collapse in={open5}>
        <Alert
        variant="filled" severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen5(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
           This is an error - {message}
        </Alert>
      </Collapse>
    
    </Box>
        
        <form onSubmit={handleSumbit} >
        <DialogTitle>  {up === false ? ' Add New Employee' : ' Update User' }</DialogTitle>
        <DialogContent>
      
        
          <DialogContentText>
          {up === false ? ' Here You can Add New Employeeto Your App' : 'Here You can Update Your Employee' } 
          </DialogContentText>

          

          <label className='labelPhoto' htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' ,}}

              disabled={up === true ? true : false}
              onChange={handleChangePhoto}
            />
            <Avatar
              src={photoSrc}
              alt={userUpdate.name}
              sx={{ width: 75, height: 75, cursor : up === true ? 'no-drop' : 'pointer'}}
            />
          </label>
       
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={userUpdate.name}
            onChange={handelName}
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />

<TextField
            
            margin="dense"
            id="name"
            value={userUpdate.prenom}
            onChange={handelPrenom}
            label="Prenom"
            type="text"
            fullWidth
            variant="standard"
            required
          />

           <TextField
           required
            margin="dense"
            id="email"
            onChange={handelEmail}
            value={userUpdate.company}
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

          <div style={{marginTop:'30px'}}>

          <PhoneInput

          placeholder='phone number'
          
          disabled={up === true ? true : false}
          country={'ma'}
          value={userUpdate.phone}
         
        />

          </div>

          

          

          


<FormControl  className='select' sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label"> Roles </InputLabel>
        <Select
        required
      
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Age"
          
        >

          {
            roles.map((e)=>(
              <MenuItem value={e.name}> {e.name} </MenuItem>
            ))
          }

        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'> {up === false ? 'add' : ' Update' } </Button>
        </DialogActions>
        </form>
      </Dialog>

      







        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Employees
          </Typography>

      
          {
            can("create-user") &&  <Button onClick={handleClickOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Employees
          </Button>
          }
         
        </Stack>

        <Box sx={{ width: '100%' }}>
      <Collapse in={open3}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen3(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {textAlert}
        </Alert>
      </Collapse>
    </Box>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, prenom ,name, role, status, company, avatarUrl, phone } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name + ' ' + prenom }
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{phone }</TableCell>

                        <TableCell align="left">{role}</TableCell>

                       

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        
                         
                          <TableCell align="right" >
                       <IconButton size="large" color="inherit" onClick={(event)=> handleOpenMenu(event,id)} >
                         <Iconify icon={'eva:more-vertical-fill'} />
                       </IconButton>
                     </TableCell>
                        

                        
                        
                      
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      > 

      {
        can("edit-user") &&  <MenuItem onClick={handelUpdate}>
        <Iconify  icon={'eva:edit-fill'} sx={{ mr: 2 }} />
        Edit
      </MenuItem>
      }

{
        can("delete-user") &&   <MenuItem onClick={handelDelete} sx={{ color: 'error.main' }}>
        <Iconify  icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
        Delete
      </MenuItem>
      }
       

      
      </Popover>

   
    </>
  );
}
