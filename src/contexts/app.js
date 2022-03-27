import { useReducer, createContext } from 'react';

import { reducer, initialState } from '../reducers/app';

const AppContext = createContext(null);

const AppContextWrapper = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ appState: state, appDispatch: dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppContextWrapper };
