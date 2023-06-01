/* eslint-disable no-unused-expressions */
import { CheckBox, Create, Delete, Save } from '@mui/icons-material';
import _, { forEach } from 'lodash';
import { useForm } from 'react-hook-form';
import { Container, Typography , Stack , Checkbox, Button, InputLabel, Box, Select, MenuItem , FormControl, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoles, deleteRole, loadRoles, upRole } from '../store/res/roles';
import { actionsRoles } from '../store/index';
import { permissions } from '../_mock/user';
import { Toast } from '../components/aleart';
import { useContextProvider } from '../context/contextProvider';
import DialogDelete from '../components/dialog-delete';




export default function RolesPage (){

    const [role, setRole] = React.useState('');
    const { can } = useContextProvider()
    const [checkboxs, setCheckboxs] = React.useState(permissions);
    const [disable,setDisable] = React.useState(true)
    const { register, handleSubmit } = useForm();
    const [open4,setOpen4] = React.useState(false)
    const [open2,setOpen2] = React.useState(false)





    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const roles = useSelector((state)=> state.roles)
    const dispatch = useDispatch()


  const handleChange = (event) => {
    setRole(event.target.value);
    checkPermissions(event.target.value)
  };

  const handleChangeCheckBox = (e)=>{
    const { name, checked } = e.target;
    const localname = name.replace('-', '_')
    setCheckboxs((prevState) => ({
        ...prevState,
        [localname]: checked
      }));

  }

  const SendD = (data)=>{
    addRoles((e)=>{setOpen4(false);Toast.fire({title:"Role Added !" , icon:"success"});dispatch(actionsRoles.loadRoles(e.roles))},(e)=>{setOpen4(false);Toast.fire({icon:"error" , title:"error try again !"})},data)
    
}

 const handelModel = ()=>{
    setOpen4(false)
 }

 const handelCreate = ()=>{
    setOpen4(true)
 }

 const handelDelete = ()=>{
    setOpen2(true)
 }

 
  const save =()=>{
    const data = {permissions:[...getCheckedCheckboxNames()]}
    upRole((e)=>{dispatch(actionsRoles.loadRoles(e.roles));Toast.fire({icon:"success" , title:"permissions updated !"})},(e)=> console.log(e),role,data)
  }


  const handelRemove =()=>{
     deleteRole((e)=>{dispatch(actionsRoles.loadRoles(e.roles));Toast.fire({icon:"info" , title:"role deleted !"});setOpen2(false)},(e)=>{setOpen4(false);Toast.fire({icon:"error" , title:"error try again !"})},role)
  }





  function getCheckedCheckboxNames() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedNames = [];
  
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedNames.push(checkbox.name);
      }
    });
  
    return checkedNames;
  }

  function checkPermissions(role) {

    const condition = (item) => item.name === role

    const item = _.filter(roles,condition)
    const perm = item[0].permissions
    
    // reset checkboxes
    setCheckboxs(permissions)

    // check permissions of the role
    perm.map((e)=>{
        const localname = e.replace('-', '_')
        setCheckboxs((prevState) => ({
            ...prevState,
            [localname]: true
          }));

          return 0
    })
    
    
  }

  useEffect(()=>{
    loadRoles((e)=> dispatch(actionsRoles.loadRoles(e.roles)) , (e)=>{console.log(e)})
    setDisable(!can("edit-role"))

  },[])


    return(
       <Container maxWidth="xl">

<DialogDelete res={'Role'} open={open2} setOpen={setOpen2} handelDelete={()=> handelRemove(role)} />


<Dialog open={open4} onClose={handelModel}>

<DialogTitle>  Create Role </DialogTitle>

<form onSubmit={handleSubmit((data)=> SendD(data))}>
<DialogContent dividers>

<TextField
    autoFocus
    margin="dense"
    id="name"
    {...register("role")}
    label="Name"
    type="text"
    fullWidth
    variant="standard"
    required
  />
  

  </DialogContent>

  <DialogActions >
  <Button onClick={handelModel}>Cancel</Button>
  <Button type='submit'> add </Button>
</DialogActions>

</form>




 

</Dialog>

        <Typography variant='h4' sx={{ mb: 2 }} >
            Roles

        </Typography>

        <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} spacing={3}>

            <Box sx={{ width : '40%' }} >
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> Role </InputLabel>
                <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Age"
          onChange={handleChange}
        >
            {
                roles.map((e)=>(
                    <MenuItem value={e.name}>{e.name}</MenuItem>
                ))
            }
         
        </Select>

                </FormControl>
            </Box>

            {
                can("create-role") &&  <Button onClick={handelCreate} startIcon={<Create />}  variant='contained'  >

                Create Role
    
                </Button>
            }

            {
                can("delete-role") &&  <Button startIcon={<Delete />} onClick={handelDelete}  variant='contained' color='error' >

                Delete Role
    
                </Button>
            }




          

        </Stack>

        <Typography variant='h4' sx={{ mt:3 }} >
            Permissions
        </Typography>

        <Stack direction="column" style={{marginTop:"-2px"}} spacing={2}>
        <Typography variant='subtitle'sx={{mb:2 , mt:4}}>
           employees
        </Typography>

        <Stack style={{marginTop:'-9px'}} direction="row"  spacing={3} >
        <InputLabel>
        <Checkbox disabled={Boolean(disable)} onChange={handleChangeCheckBox} checked={checkboxs.read_user} name="read-user" lang='en'/>
         read
        </InputLabel>

        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.create_user} name="create-user" lang='en'/>
         create
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.edit_user} name="edit-user" lang='en'/>
         edit
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.delete_user}  name="delete-user" lang='en'/>
         delete
        </InputLabel>

            </Stack>


            <Stack direction="column"  style={{marginTop:"-2px"}} spacing={2} >
            <Typography variant='subtitle'sx={{mb:2 , mt:4}}>
           Organisemes
        </Typography>

        <Stack style={{marginTop:'-9px'}} direction="row"  spacing={3} >
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.read_org} name="read-org" lang='en' />
            read
        </InputLabel>

        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.create_org} name="create-org" lang='en'/>
        create
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.edit_org} name="edit-org" lang='en'/>
         edit
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.delete_org} name="delete-org" lang='en'/>
        delete
        </InputLabel>
        </Stack>
        </Stack>



        <Stack direction="column"  style={{marginTop:"-2px"}} spacing={2} >
            <Typography variant='subtitle'sx={{mb:2 , mt:4}}>
           Projects
        </Typography>

        <Stack style={{marginTop:'-9px'}} direction="row"  spacing={3} >
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.read_project} name="read-project" lang='en'/>
         read
        </InputLabel>

        <InputLabel>
        <Checkbox disabled={disable}  onChange={handleChangeCheckBox} checked={checkboxs.create_project} name="create-project" lang='en'/>
         create
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.edit_project} name="edit-project" lang='en'/>
         edit
        </InputLabel>
        <InputLabel>
        <Checkbox  disabled={disable}onChange={handleChangeCheckBox} checked={checkboxs.delete_project} name="delete-project" lang='en'/>
         delete
        </InputLabel>
        </Stack>
        </Stack>
       

        <Stack direction="column"  style={{marginTop:"-2px"}} spacing={2} >
            <Typography variant='subtitle'sx={{mb:2 , mt:4}}>
           Phases
        </Typography>

        <Stack style={{marginTop:'-9px'}} direction="row"  spacing={3} >
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.read_phase} name="read-phase" lang='en'/>
         read
        </InputLabel>

        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.create_phase} name="create-phase" lang='en'/>
         create
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.edit_phase} name="edit-phase" lang='en'/>
         edit
        </InputLabel>
        <InputLabel>
        <Checkbox  disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.delete_phase}  name="delete-phase" lang='en'/>
         delete
        </InputLabel>
        </Stack>
        </Stack>


        <Stack direction="column"  style={{marginTop:"-2px"}} spacing={2} >
            <Typography variant='subtitle'sx={{mb:2 , mt:4}}>
           Livrables
        </Typography>

        <Stack style={{marginTop:'-9px'}} direction="row"  spacing={3} >
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.read_livrable} name="read-livrable" lang='en'/>
         read
        </InputLabel>

        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.create_livrable} name="create-livrable" lang='en'/>
         create
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.edit_livrable} name="edit-livrable" lang='en'/>
         edit
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.delete_livrable} name="delete-livrable" lang='en'/>
         delete
        </InputLabel>
        </Stack>
        </Stack>



        <Stack direction="column"  style={{marginTop:"-2px"}} spacing={2} >
            <Typography variant='subtitle'sx={{mb:2 , mt:4}}>
           Roles
        </Typography>

        <Stack style={{marginTop:'-9px'}} direction="row"  spacing={3} >
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.read_role} name="read-role" lang='en'/>
         read
        </InputLabel>

        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.create_role} name="create-role" lang='en'/>
         create
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.edit_role} name="edit-role" lang='en'/>
         edit
        </InputLabel>
        <InputLabel>
        <Checkbox disabled={disable} onChange={handleChangeCheckBox} checked={checkboxs.delete_role} name="delete-role" lang='en'/>
         delete
        </InputLabel>
        </Stack>
        </Stack>

{
    can("edit-role") &&<Button onClick={()=> save()} style={{width:"20%" , color:"#FFF"}}  startIcon={<Save />}   variant='contained' color='success' >

    Save
    
    </Button>
}
        





        </Stack>



       </Container>


    )



}