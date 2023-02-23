import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,Route } from 'react-router-dom'

const ProtectedRoute = ({component:Component,...rest}) => {
    const {loading,isAuthenticated,user} = useSelector((state)=>state.user)
    const navigate = useNavigate(); 
    console.log(Component+"gggggg");

  return (
    <Fragment>
        {!loading && (
            
            <Route
            {...rest}
            render = {(props)=>{

                if(!isAuthenticated){
                    return navigate("/login")
                }

                return <Component {...props} />
            }}
            />
        )}
    </Fragment>
  )
}

export default ProtectedRoute