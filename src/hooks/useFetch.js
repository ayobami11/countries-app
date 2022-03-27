import { useEffect, useReducer } from 'react';

const initialState = {
    data: null,
    isLoading: true,
    isError: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_REQUEST_SUCCESS': {
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.data
            };
        }

        case 'SET_REQUEST_FAILURE': {
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        }

        case 'SET_LOADING_FALSE': {
            return {
                ...state,
                isLoading: false
            };
        }

        case 'SET_ERROR_TRUE': {
            return {
                ...state,
                isError: true
            };
        }

        default:
            return {
                ...state
            };
    }
};

export const useFetch = (url) => {
    const [{ isLoading, isError, data }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await fetch(url);
                const jsonResponse = await response.json();

                if (response.ok) {
                    dispatch({
                        type: 'SET_REQUEST_SUCCESS',
                        payload: { data: jsonResponse }
                    });
                } else {
                    dispatch({ type: 'SET_REQUEST_FAILURE' });
                }
            } catch (error) {
                dispatch({ type: 'SET_ERROR_TRUE' });
            } finally {
                dispatch({ type: 'SET_LOADING_FALSE' });
            }
        };

        sendRequest();
    }, [url]);

    return { isLoading, isError, data };
};