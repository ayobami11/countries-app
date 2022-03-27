import { useEffect, useContext } from 'react';

import { AppContext } from '../contexts/app';

import styled from 'styled-components';

const Select = styled.select`
    border: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 0.5em;
    padding: 1em;
    margin: 1em 0;
    max-width: max-content;

    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.white
            : theme.colors.dark['dark-blue']};

    color: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['very-dark-blue']
            : theme.colors.white};

    @media (min-width: 600px) {
        /* margin-top: 3em; */
    }
`;

const SelectInput = () => {
    const {
        appState: { region },
        appDispatch
    } = useContext(AppContext);

    const handleRegionChange = ({ target: { value } }) => {
        appDispatch({ type: 'SET_REGION', payload: { region: value } });
    };

    useEffect(() => {
        appDispatch({ type: 'FILTER_COUNTRIES_BY_REGION' });
    }, [region, appDispatch]);

    return (
        <Select name='region' value={region} onChange={handleRegionChange}>
            <option disabled>Filter by Region</option>
            <option value=''>All</option>
            <option value='africa'>Africa</option>
            <option value='americas'>America</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
        </Select>
    );
};

export default SelectInput;
