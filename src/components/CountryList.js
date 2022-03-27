import { useEffect, useContext, Children } from 'react';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

import CountryItem from './CountryItem';

const captitalizeString = str => {
    const [firstLetter, ...rest] = str;

    return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const Ul = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
    grid-gap: 1em;
`;

const CountryList = () => {
    const {
        appState: {
            countries,
            searchCountry,
            region,
            commonCountries,
            filteredCountriesBySearch,
            filteredCountriesByRegion
        },
        appDispatch
    } = useContext(AppContext);

    useEffect(() => {
        appDispatch({ type: 'SET_COMMON_COUNTRIES' });
    }, [searchCountry, region, appDispatch]);

    let currentCountryList =
        searchCountry && region
            ? commonCountries
            : searchCountry
            ? filteredCountriesBySearch
            : region
            ? filteredCountriesByRegion
            : countries;

    console.log(currentCountryList);

    return (
        <>
            {currentCountryList.length ? (
                <Ul>
                    {Children.toArray(
                        currentCountryList.map(country => (
                            <CountryItem {...country} />
                        ))
                    )}
                </Ul>
            ) : (
                <p>
                    No matching countries
                    {region ? ` in ${captitalizeString(region)}.` : '.'}
                </p>
            )}
        </>
    );
};

export default CountryList;
