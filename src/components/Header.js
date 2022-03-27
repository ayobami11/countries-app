import { useContext } from 'react';

import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faMoon as farMoon } from '@fortawesome/free-regular-svg-icons';

import { AppContext } from '../contexts/app';

const HeaderSC = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 5%;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.white
            : theme.colors.dark['dark-blue']};
`;


const H1 = styled.h1`
    @media (max-width: 600px) {
        font-size: 1rem;
    }
`;

const FontAwesomeIconSC = styled(FontAwesomeIcon)`
margin: 0 1em;

`;

const Button = styled.button`
    background: transparent;
    border: none;
    font-weight: ${({ theme }) => theme.font.weights['600']};
    color: inherit;
    cursor: pointer;
`;

const Header = () => {
    const {
        appState: { theme },
        appDispatch
    } = useContext(AppContext);

    const toggleTheme = () => {
        theme === 'light'
            ? appDispatch({ type: 'SET_THEME', payload: { theme: 'dark' } })
            : appDispatch({ type: 'SET_THEME', payload: { theme: 'light' } });
    };

    return (
        <HeaderSC>
            <H1>Where in the world?</H1>
            <Button onClick={toggleTheme}>
                {theme === 'light' ? (
                    <FontAwesomeIconSC icon={farMoon} size='lg' />
                ) : (
                    <FontAwesomeIconSC icon={faMoon} size='lg' />
                )}
                Dark mode

            </Button>
        </HeaderSC>
    );
};

export default Header;
