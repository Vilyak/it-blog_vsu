import React, {useReducer, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import {useDispatch, useSelector} from "react-redux";
import {BlogStore} from "../types";
import {auth, loginDialogState} from "../actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
            margin: `${theme.spacing(0)} auto`,
            position: 'absolute',
            top: 0,
            left: 'calc(50% - 200px)'
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        },
        loginBg: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: '#000',
            opacity: 0.5,
            top: 0,
        },
    })
);

type State = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState:State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess':
            return {
                ...state,
                helperText: action.payload,
                isError: false
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}

const Login = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);
    const {isOpenLogin} = useSelector((store: BlogStore) => store);
    const globalDispatch = useDispatch();

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.username, state.password]);

    const handleLogin = () => {
        globalDispatch(auth.request({
            login: state.username,
            password: state.password
        }));
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }
    return (
        <>
            {isOpenLogin ? <><div className={classes.loginBg}></div>
                <form className={classes.container} noValidate autoComplete="off">
                    <Card className={classes.card}>
                        <CardHeader className={classes.header} title="Вход в админ панель" />
                        <CardContent>
                            <div>
                                <TextField
                                    error={state.isError}
                                    fullWidth
                                    id="username"
                                    type="email"
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    onChange={handleUsernameChange}
                                    onKeyPress={handleKeyPress}
                                />
                                <TextField
                                    error={state.isError}
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    helperText={state.helperText}
                                    onChange={handlePasswordChange}
                                    onKeyPress={handleKeyPress}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={classes.loginBtn}
                                onClick={(e) => {
                                    globalDispatch(loginDialogState(false));
                                }}
                                disabled={false}>
                                Назад
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                className={classes.loginBtn}
                                onClick={handleLogin}
                                disabled={state.isButtonDisabled}>
                                Войти
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </> : null }
        </>
    );
}

export default Login;