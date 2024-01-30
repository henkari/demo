import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';


function Login(){
    const[login, setLogin]=useState({email:'', password:''})

    const handleLogin=(e)=>{
        const{name,value}=e.target
        setLogin({...login,[name]:value})
    }    
   async function submit(e){
    try{
     await axios.post('http://localhost:3001/api/files/login', login)
    }catch(error){console.log(error)}
   }

return(
 <div className='login'>
 <form onSubmit={submit}>
 <input type="email" name='email' value={login.email} onChange={handleLogin} />   
<input type="password" name='password' value={login.password} onChange={handleLogin} /> 
<input type="submit" />
</form>
</div>
)

}
export default Login;