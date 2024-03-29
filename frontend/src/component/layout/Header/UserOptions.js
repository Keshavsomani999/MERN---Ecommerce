import React, { Fragment, useState } from 'react'
import "./Header.css";
import {SpeedDial,SpeedDialAction} from "@material-ui/lab"
import Backdrop from "@material-ui/core/Backdrop"
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToAppSharp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import {useNavigate} from 'react-router-dom'; 
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userAction';
import {useDispatch,useSelector} from "react-redux"
// import { Navigate } from 'react-router-dom';



const UserOptions = ({user}) => {

const {cartItems} = useSelector((state)=>state.cart);
const navigate = useNavigate(); 
const [open, setOpen] = useState(false);
const alert = useAlert()
const dispatch = useDispatch();

const options = [
    {icon:<ListAltIcon />,name:"Orders",func:orders},
    {icon:<PersonIcon />,name:"Profile",func:account},
    {icon:<ShoppingCartIcon style={{color:cartItems.length > 0 ? "tomato" :"unset"}} />,name:`Cart(${cartItems.length})`,func:cart},
    {icon:<ExitToAppIcon />,name:"Logout",func:logoutUser},
]

if(user.role === "admin"){
    options.unshift({icon:<DashboardIcon />,name:"Dashboard",func:Dashboard})
}

function Dashboard(){
    navigate("/admin/dashboard")
}
function cart(){
    navigate("/cart")
}
function orders(){
    navigate("/orders")
}
function account(){
    navigate("/account")
}
function logoutUser(){
    dispatch(logout());
    
    
    // navigate("/login")  // not uncomment

    alert.success("Logout Successully")
}

  return <Fragment>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <SpeedDial
    ariaLabel='SpeedDial tooltip'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    style={{zIndex:"11"}}
    open={open}
    direction="down"
    className='speedDial'
    icon={<img 
        className='speedDialIcon' 
        src={user.avatar.url ? user.avatar.url : "/Profile.png"} 
        alt="Profile"/>}
    >
        {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>
        ))}

    </SpeedDial>
  </Fragment>
}

export default UserOptions