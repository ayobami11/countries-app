import { useEffect, useContext } from 'react';
import { Outlet, useMatch } from 'react-router-dom';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

import { useFetch } from '../hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import Main from './Main';
// import Footer from './Footer';

import CountryList from './CountryList';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';

const compareFunction = (a, b) => {
    const countryA =
        a?.name?.common?.toLowerCase() ?? a?.name?.official?.toLowerCase();
    const countryB =
        b?.name?.common?.toLowerCase() ?? b?.name?.official?.toLowerCase();

    return countryA < countryB ? -1 : countryA > countryB ? 1 : 0;
};

const Form = styled.form`
    margin: 2em auto;

    @media (min-width: 600px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const P = styled.p`
    font-weight: ${({ theme }) => theme.font.weights[600]};
`;

const FaSync = styled(FontAwesomeIcon)`
    margin-right: 1em;
`;

const Home = () => {
    const {
        appState: { countries },
        appDispatch
    } = useContext(AppContext);

    const match = useMatch('/countries/:country');

    const { isLoading, isError, data } = useFetch(
        'https://restcountries.com/v3.1/all'
    );

    // detects and sets the theme based on the user's preference
    useEffect(() => {
        if (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            appDispatch({ type: 'SET_THEME', payload: { theme: 'dark' } });
        } else {
            appDispatch({ type: 'SET_THEME', payload: { theme: 'light' } });
        }
    }, [appDispatch]);

    // fetches list of countries
    useEffect(() => {
        if (data) {
            const countries = data.sort(compareFunction);

            appDispatch({
                type: 'SET_COUNTRIES',
                payload: { countries }
            });
        }
    }, [appDispatch, countries, data]);

    return (
        <>
            <Header />
            <Main>
                {!match && (
                    <Form>
                        <SearchInput />
                        <SelectInput />
                    </Form>
                )}
                {match ? (
                    <Outlet />
                ) : (
                    <>
                        {isLoading ? (
                            <P>
                                <FaSync
                                    className='fa-spin fa-lg'
                                    icon={faSync}
                                />
                                Fetching countries...
                            </P>
                        ) : isError ? (
                            <P>Something went wrong. Try again later.</P>
                        ) : (
                            <CountryList />
                        )}
                    </>
                )}
            </Main>
            {/* <Footer /> */}
        </>
    );
};

export default Home;
