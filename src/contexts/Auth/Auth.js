import React, { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Auth } from "../../api/Endpoints/Auth";
import toast from "react-hot-toast";

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    token: null
};
const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            token: null
        };
    },
    LOGIN: (state, action) => {
        const { token } = action.payload;

        if (token === undefined) {
            console.log("you dont have token");
        }
        return {
            ...state,
            isAuthenticated: true,
            token
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user
        };
    }
};

const reducer = (state, action) => (handlers[action.type]
    ? handlers[action.type](state, action)
    : state);

export const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                if (accessToken != undefined) {
                    const token = localStorage.getItem('accessToken')
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            token: token
                        }
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            token: null
                        }
                    });
                }
            } catch (err) {
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        token: null
                    }
                });
            }
        };
        initialize();
    }, []);


    const login = async (email, password) => {
        console.log("this is email ", email);
        const accessToken = await Auth.login({ email, password });
        console.log("this is access token", accessToken);
        if (accessToken.data.status !== "error") {
            localStorage.setItem('accessToken', accessToken.data.data.auth_token);

            dispatch({
                type: 'LOGIN',
                payload: {
                    token: localStorage.getItem('accessToken')
                }
            });
            toast.success("Login successful!", {
                position: "top-center"
            });
        } else {
            toast.error(accessToken.data.message, {
                position: "top-center"
            })
        }
    };

    const logout = async () => {
        localStorage.removeItem('accessToken');
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );

}


AuthProvider.protoTypes = {
    children: PropTypes.node.isRequired
}
