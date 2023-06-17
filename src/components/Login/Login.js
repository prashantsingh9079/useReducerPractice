import React, { useState, useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

function passwordReducer(state,action)
{
  if(action.title==="inputPassword")
  {
    return({value:action.val, isValid:action.val.trim().length > 6})
  }
  if(action.title === "inputPwdBlur")
  {
    return({value:state.value, isValid:state.value.trim().length > 6})
  }
  if(action.title==="resetForm")
  {
    return({value:'',isValid:false})
  }
  return({value:'',isValid:false})
}

function emailReducer(state,action)
{
  if(action.title==="inputEmail")
  {
    return({value:action.val, isValid:action.val.includes('@')})
  }
  if(action.title==="inputBlur")
  {
    return({value:state.value, isValid:state.value.includes('@')})
  }
  if(action.title==="resetForm")
  {
    return({value:'',isValid:false})
  }
  return({value:'',isValid:false})
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{value:'',isValid:null})

  useEffect( ()=>{
    console.log("runinggggggggggggg")
    const i = setTimeout(
      ()=>{setFormIsValid(emailState.isValid && passwordState.isValid)}
      ,500)
      return ()=>{clearTimeout(i)}
  }
    ,[emailState.isValid,passwordState.isValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({title:"inputEmail", val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({title:"inputPassword",val:event.target.value})
    
  };

  const validateEmailHandler = () => {
    console.log("onblur event fired..........")
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({title:"inputBlur"})
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({title:"inputPwdBlur"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
    dispatchEmail({title:"resetForm"});
    dispatchPassword({title:"resetForm"});
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
