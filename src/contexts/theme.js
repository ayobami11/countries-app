import { useContext } from 'react';

import { ThemeProvider } from 'styled-components';

import { AppContext } from './app';

const theme = {
    userTheme: 'light',
    colors: {
        light: {
            'very-dark-blue': 'hsl(200, 15%, 8%)',
            'dark-gray': 'hsl(0, 0%, 52%)',
            'very-light-gray': 'hsl(0, 0%, 98%)'
        },
        dark: {
            'dark-blue': 'hsl(209, 23%, 22%)',
            'very-dark-blue': 'hsl(207, 26%, 17%)'
        },
        white: 'hsl(0, 0%, 100%)'
    },
    font: {
        family: 'Nunito Sans, sans-serif',
        size: {
            '14px': 14 / 16 + 'rem',
            '16px': '1rem'
        },
        weights: {
            300: 300,
            600: 600,
            800: 800
        }
    }
};

const ThemeContextWrapper = ({ children }) => {
    const {
        appState: { theme: appTheme }
    } = useContext(AppContext);

    return (
        <ThemeProvider theme={{ ...theme, userTheme: appTheme }}>
            {children}
        </ThemeProvider>
    );
};

export { ThemeContextWrapper };
