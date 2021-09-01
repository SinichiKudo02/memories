import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';   
import Input from './Input'
import Icon from './Icon';
import {signup, signin} from '../../actions/auth';

const initialState = {firstName : '', lastName : '', email : '', password : '', confirmPassword : ''};

const Auth = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) =>
    {
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () =>
    {
        setisSignup((previsSignup) => !previsSignup);
        setShowPassword(false);
    }

    const onSuccess = async (res) =>
    {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type : 'AUTH', data : {result, token}});
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const onFailure = (err) =>
    {
        console.log(err);
        console.log('Authentication Failed, Try Again Later')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
           
            <Typography variant='h5'>{isSignup ? 'SignUp' : 'SignIn'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword= {handleShowPassword}/>
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
        
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                    {isSignup ? 'Sign Up' : 'Sign In'};
                </Button>
                <GoogleLogin 
                    clientId="442461199336-khh1b25f70mqn9tre2njiriarlqkokqg.apps.googleusercontent.com"
                    render={(renderProps)=>(
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            // disabled={renderProps.disabled}
                            startIcon = {<Icon />}
                            variant="contained"
                        >Google Sign In</Button>
                    )}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy = "single_host_origin"
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already Have an Account? Sign In' : 'Dont have any account Yet? SignUp'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>    
        </Container>
    )
}

export default Auth
