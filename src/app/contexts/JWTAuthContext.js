/* eslint-disable */
import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { SERVER_URI as URI } from 'config';
import { useDispatch } from 'react-redux'
import { navigations } from 'app/navigations'
import { getNavigationByUser } from 'app/redux/actions/NavigationAction';
import { GET_QR_DATA } from 'app/redux/actions/UserAction';
import { NavLink, useNavigate } from 'react-router-dom';
const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken || accessToken === 'Failed') {
        return false
    }
    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken)
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    otpLogin: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    mpinRegister: () => Promise.resolve(),
    updateMerchant: () => Promise.resolve(),
    registerEmployee: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const login = async (userName, password) => {
        let accessToken = window.localStorage.getItem("accessToken");

        if (!isValidToken(accessToken)) {
            accessToken = await getAuthToken();
            // window.localStorage.setItem('accessToken', accessToken)
        }
        const response = await axios.post(URI + '/app/v1/employee/login', {
            userName,
            password,
        }, { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
        const user = response.data
        const navigationState = {}
        navigationState['navigations'] = navigations
        navigationState['user'] = user
        dispatcher(getNavigationByUser(navigationState))
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
        setSession(accessToken)
        if (user.mpinEnabled)
            window.localStorage.setItem('isMpinLoginEnabled', true)
        window.localStorage.setItem('userName', userName)
        // window.localStorage.setItem('user', JSON.stringify(user))
        return user;
    }
    const mpinRegister = async (otp) => {
        let accessToken = window.localStorage.getItem("accessToken");
        let userName = window.localStorage.getItem("userName");
        const response = await axios.post(URI + '/app/v1/employee/mPinRegister', {
            userName,
            otp,
        }, { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
        console.log('[mpinRegister 1]', response.status);
        window.localStorage.setItem('isMpinLoginEnabled', true)
        console.log('[mpinRegister]', response.status);
        return response.status;
    }
    const register = async (body) => {
        let accessToken = window.localStorage.getItem("accessToken");
        console.log(accessToken + '[Register]', body);
        const response = await axios.post(URI + '/app/v1/merchant/signUp/false',
            body
            , { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
        console.log("[response]", response);
        // const { accessToken, user } = response.data

        // setSession(accessToken)

        // dispatch({
        //     type: 'REGISTER',
        //     payload: {
        //         user,
        //     },
        // })
    }
    const otpLogin = async (otp) => {
        let accessToken = window.localStorage.getItem("accessToken");
        if (!isValidToken(accessToken)) {
            accessToken = await getAuthToken();
        }
        let userName = window.localStorage.getItem("userName");
        console.log('otp----->', otp);
        const response = await axios.post(URI + '/app/v1/employee/mPinLogin', {
            userName,
            otp,
        }, { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
        const user = response.data
        const navigationState = {}
        navigationState['navigations'] = navigations
        navigationState['user'] = user
        dispatcher(getNavigationByUser(navigationState))
        setSession(accessToken)
        window.localStorage.setItem('userName', userName)
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
        return user;
    }
    const updateMerchant = async (body) => {
        let accessToken = window.localStorage.getItem("accessToken");
        console.log('[update]' + body);
        await axios.post(URI + '/app/v1/merchant/update',
            body
            , { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
    }

    const registerEmployee = async (body) => {
        let accessToken = window.localStorage.getItem("accessToken");
        console.log('[Register]' + body);
        const response = await axios.post(URI + '/app/v1/employee/signUp',
            body
            , { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/json" } })
        // const { accessToken, user } = response.data

        // setSession(accessToken)

        dispatcher({
            type: GET_QR_DATA,
            payload: response.data,
        })
    }
    const getAuthToken = async () => {
        console.log('[Auth Token Called]');
        // var secure = new SecureStorage();
        let reqData = {
            "userName": "middlewareService",
            "password": "password"
        }
        return await axios.post(URI + "/authenticate", reqData).then((response) => {
            console.log("[SUCCESS AUTH]");
            const token = response.data.token;
            // secure.save("token", token)
            return token;
        }, (error) => {
            console.log("[FAILURE AUTH]" + error);
            return "Failed";
        });
    }

    const logout = () => {
        window.localStorage.clear();
        setSession(null)
        dispatch({ type: 'LOGOUT' })
        // history.push('/session/login')
    }

    useEffect(() => {
        (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                let userName = window.localStorage.getItem("userName");
                // let user = window.localStorage.getItem("user");
                if (accessToken && isValidToken(accessToken) && userName) {
                    console.log('[reload]')
                    navigate('/session/otp-login');
                    // history.push('/session/otp-login')
                    // setSession(accessToken)
                    // const response = await axios.get('/api/auth/profile')
                    // const { user } = response.data
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                otpLogin,
                logout,
                register,
                updateMerchant,
                registerEmployee,
                mpinRegister
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

