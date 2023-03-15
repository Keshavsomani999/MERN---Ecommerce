import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({component:Component,...rest}) => {
    const {loading,isAuthenticated} = useSelector((state)=>state.user)
    const navigate = useNavigate(); 
    


    if (!loading) {
        if(!isAuthenticated){
            return navigate("/login")
        }
        else{
            return <Component />
        }
    }

//   return (
//     <Fragment>
//         {!loading && (
            
//             <Route
//             {...rest}
//             render = {(props)=>{

//                 if(!isAuthenticated){
//                     return navigate("/login")
//                 }

//                 return <Component {...props} />
//             }}
//             />
//         )}
//     </Fragment>
//   )
}

export default ProtectedRoute