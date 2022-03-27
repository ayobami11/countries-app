import { Outlet } from 'react-router-dom';

import styled, { createGlobalStyle } from 'styled-components';

import { AppContextWrapper } from './contexts/app';
import { ThemeContextWrapper } from './contexts/theme';

const ResetStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.font.family};
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  img {
    object-fit: cover;
  }

  a {
    text-decoration: none;
  }
`;

const AppSC = styled.div`
    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['very-light-gray']
            : theme.colors.dark['very-dark-blue']};

    color: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['very-dark-blue']
            : theme.colors.white};

    min-height: 100vh;

    display: grid;
    grid-template-rows: auto 1fr auto;
`;

const App = () => {
    return (
        <AppContextWrapper>
            <ThemeContextWrapper>
                <ResetStyles />
                <AppSC>
                    <Outlet />
                </AppSC>
            </ThemeContextWrapper>
        </AppContextWrapper>
    );
};

export default App;
