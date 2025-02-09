import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../commons/hooks/useForm";
import { Context } from "../store/appContext";

export const Login = () => {
    const [ error, setError ] = useState("")
    const { actions } = useContext(Context) 
    const navigate = useNavigate()
    const { pathname } = useLocation()
    

    const { formState,
        onInputChange,
        onResetForm 
    } = useForm({email: "", password: ""})

    useEffect(()=>{
        onResetForm()
        setError("")
    }, [pathname])

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (pathname.includes('/signup')) {
            actions.register(formState)
            .then(() => navigate("/"))
            .catch((e) => {
                setError(e.message)
            })
            return
        }
        actions.login(formState)
        .then(() => navigate("/home"))
        .catch((e) => {
            setError(e.message)            
        })
        
    }

    const showTextByPath = (textSigin, textSignup) => {
        return pathname.includes('/signup') ? textSignup : textSigin
    }

    return (
        <>

            <form className="form" onSubmit={handleSubmit}>
                
                <p className="form-title">{showTextByPath('Sign in to your account', 'Create new account')}</p>
                <div className="input-container">
                    <input placeholder="Enter email" type="email" name="email" onChange={onInputChange} autoComplete="email" required value={formState.email}/>
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                </div>
                <div className="input-container">
                    <input placeholder="Enter password" type="password" name="password" onChange={onInputChange} autoComplete="current_password" required value={formState.password}/>

                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                </div>
                <button className="submit" type="submit">
                    {
                        showTextByPath('Sign in', 'Sign up')
                    }                    
                </button>
                {
                    error && (
                        <p className="signup-link" style={{color:"red"}}>
                            {error}
                        </p>
                    )
                }
                
                <p className="signup-link">
                    {
                        showTextByPath('No account? ', 'Already have an acount ')
                    }                                        
                    <Link to={showTextByPath('/signup', '/')}>{showTextByPath('Sign up', 'Sign in')}</Link>
                </p>
            </form>

        </>
    )
}