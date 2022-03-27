import { useEffect, useContext } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Div = styled.div`
    position: relative;

    flex: 1;

    @media (min-width: 600px) {
        max-width: 400px;
    }
`;

const FaMagnifyingGlass = styled(FontAwesomeIcon)`
    color: inherit;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: max(2%, 20px);

    color: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['dark-gray']
            : theme.colors.white};
`;

const Input = styled.input`
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 0.5em;
    padding: 1em;
    padding-left: 4em;
    width: 100%;

    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.white
            : theme.colors.dark['dark-blue']};

    color: inherit;

    ::-webkit-input-placeholder {
        color: ${({ theme }) =>
            theme.userTheme === 'light'
                ? theme.colors.light['dark-gray']
                : theme.colors.white};
    }

    ::-moz-placeholder {
        color: ${({ theme }) =>
            theme.userTheme === 'light'
                ? theme.colors.light['dark-gray']
                : theme.colors.white};
    }

    :-ms-input-placeholder {
        color: ${({ theme }) =>
            theme.userTheme === 'light'
                ? theme.colors.light['dark-gray']
                : theme.colors.white};
    }

    :-moz-placeholder {
        color: ${({ theme }) =>
            theme.userTheme === 'light'
                ? theme.colors.light['dark-gray']
                : theme.colors.white};
    }
`;

const SearchInput = () => {
    const {
        appState: { searchCountry },
        appDispatch
    } = useContext(AppContext);

    const handleSearchInput = ({ target: { value } }) => {
        appDispatch({
            type: 'SET_SEARCH_COUNTRY',
            payload: { searchCountry: value }
        });
    };

    useEffect(() => {
        appDispatch({ type: 'FILTER_COUNTRIES_BY_SEARCH' });
    }, [searchCountry, appDispatch]);

    return (
        <Div>
            <Input
                type='search'
                name='country'
                placeholder='Search for a country'
                value={searchCountry}
                onChange={handleSearchInput}
            />
            <FaMagnifyingGlass icon={faMagnifyingGlass} />
        </Div>
    );
};

export default SearchInput;
