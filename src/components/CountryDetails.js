import { useEffect, useContext, Children } from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { AppContext } from '../contexts/app';

import { formatWithComma } from '../utils/formatWithComma';

const FaArrowLeft = styled(FontAwesomeIcon)`
    margin-right: 1em;
`;

const Button = styled.button`
    border: none;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    font-weight: ${({ theme }) => theme.font.weights['800']};
    font-size: ${({ theme }) => theme.font.size['16px']};
    margin: 2em 0;
    padding: 0.5em 1.5em;
    border-radius: 0.25em;
    cursor: pointer;

    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.white
            : theme.colors.dark['dark-blue']};

    color: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['very-dark-blue']
            : theme.colors.white};
`;

const Article = styled.article`
    font-size: ${({ theme }) => theme.font.size['16px']};

    margin: 2em 0;
`;

const Figure = styled.figure`
    @media (min-width: 700px) {
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 950px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`;

const ImageContainer = styled.div`
    overflow: hidden;

    @media (min-width: 700px) {
        margin: 0 auto;
    }

    @media (min-width: 950px) {
        flex: 2 1 300px;
        margin-right: 4em;
        max-height: 450px;
    }
`;

const Img = styled.img`
    border: 1px solid rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 100%;
    display: block;
    max-width: 650px;

    @media (min-width: 700px) {
        margin: 0 auto;
    }

    @media (min-width: 950px) {
        object-fit: contain;
    }
`;

const Figcaption = styled.figcaption`
    margin: 2em 0;
    max-width: 600px;

    @media (min-width: 950px) {
        flex: 5 2 400px;
    }
`;

const H2 = styled.p`
    font-weight: ${({ theme }) => theme.font.weights['800']};
    font-size: 2rem;
`;

const Dl = styled.dl`
    @media (min-width: 600px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(250px, 300px));
    }

    > div {
        margin: 2em 0;

        &.borders {
            grid-column: 1 / -1;
        }
    }
`;

const ListItem = styled.div`
    display: flex;
    align-items: center;
    margin: 0.75em 0;

    &.borders {
        flex-direction: column;
        align-items: flex-start;

        dt {
            white-space: nowrap;
        }

        @media (min-width: 700px) {
            flex-direction: row;
            align-items: center;
        }
        dd {
            margin: 0.75em 0;
        }
    }
`;

const BorderCountries = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

const BorderCountry = styled.li`
    margin: 0.5em;
    margin-left: 0;
    padding: 0.5em 0.75em;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 0.25em;

    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.white
            : theme.colors.dark['dark-blue']};

    color: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['very-dark-blue']
            : theme.colors.white};
`;

const Dt = styled.dt`
    font-weight: ${({ theme }) => theme.font.weights['600']};
    margin-right: 0.35em;

    &::after {
        content: ':';
    }
`;

const Dd = styled.dd`
    font-weight: ${({ theme }) => theme.font.weights['300']};
`;

const Ul = styled.ul``;
const Li = styled.li`
    display: inline;

    &:not(:last-child)::after {
        content: ', ';
    }
`;

const LinkSC = styled(Link)`
    color: inherit;

    :hover {
        text-decoration: underline;
    }
`;

const CountryDetails = () => {
    const {
        appState: { countries, currentCountry },
        appDispatch
    } = useContext(AppContext);

    const { country } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        appDispatch({ type: 'SET_CURRENT_COUNTRY', payload: { country } });
    }, [appDispatch, country]);

    const handleBackButton = () => {
        navigate('../');
    };

    return (
        <>
            <Button onClick={handleBackButton}>
                <FaArrowLeft icon={faArrowLeft} />
                Back
            </Button>
            {currentCountry ? (
                <Article>
                    <Figure>
                        <ImageContainer>
                            <Img
                                src={
                                    currentCountry?.flags?.png ??
                                    currentCountry?.flags?.svg
                                }
                                alt={`${
                                    currentCountry?.demonyms?.eng?.m ??
                                    currentCountry?.demonyms?.eng?.f
                                } flag`}
                            />
                        </ImageContainer>
                        <Figcaption>
                            <H2>
                                {currentCountry?.name?.common ??
                                    currentCountry?.name?.official}
                            </H2>
                            <Dl>
                                <div>
                                    <ListItem>
                                        <Dt>Native Name</Dt>
                                        <Dd>
                                            {Object.values(
                                                currentCountry?.name
                                                    ?.nativeName ?? {}
                                            ).length
                                                ? currentCountry?.name
                                                      ?.nativeName[
                                                      Object.keys(
                                                          currentCountry?.name
                                                              .nativeName ?? {}
                                                      )[0]
                                                  ].common
                                                : 'None'}
                                        </Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>Population</Dt>
                                        <Dd>
                                            {formatWithComma(
                                                currentCountry?.population
                                            )}
                                        </Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>Region</Dt>
                                        <Dd>
                                            {currentCountry?.region ??
                                                'Unknown'}
                                        </Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>Sub Region</Dt>
                                        <Dd>
                                            {currentCountry?.subregion ??
                                                'Unknown'}
                                        </Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>Capital</Dt>
                                        <Dd>
                                            {currentCountry?.capital?.[0] ??
                                                'Unknown'}
                                        </Dd>
                                    </ListItem>
                                </div>
                                <div>
                                    <ListItem>
                                        <Dt>Top Level Domain</Dt>
                                        <Dd>
                                            {currentCountry?.tld?.[0] ??
                                                'Unknown'}
                                        </Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>Currencies</Dt>
                                        <Dd>
                                            {Object.values(
                                                currentCountry?.currencies ?? {}
                                            ).length ? (
                                                <Ul>
                                                    {Children.toArray(
                                                        Object.values(
                                                            currentCountry?.currencies ??
                                                                {}
                                                        ).map(({ name }) => (
                                                            <Li>{name}</Li>
                                                        ))
                                                    )}
                                                </Ul>
                                            ) : (
                                                '-'
                                            )}
                                        </Dd>
                                    </ListItem>
                                    <ListItem>
                                        <Dt>Languages</Dt>
                                        <Dd>
                                            {Object.values(
                                                currentCountry?.languages ?? {}
                                            ).length ? (
                                                <Ul>
                                                    {Children.toArray(
                                                        Object.values(
                                                            currentCountry?.languages ??
                                                                {}
                                                        ).map(language => (
                                                            <Li>{language}</Li>
                                                        ))
                                                    )}
                                                </Ul>
                                            ) : (
                                                '-'
                                            )}
                                        </Dd>
                                    </ListItem>
                                </div>

                                <ListItem className='borders'>
                                    <Dt>Border countries</Dt>
                                    <Dd>
                                        {currentCountry?.borders?.length ? (
                                            <BorderCountries>
                                                {Children.toArray(
                                                    currentCountry?.borders.map(
                                                        country => {
                                                            return (
                                                                <BorderCountry>
                                                                    <LinkSC
                                                                        to={`../${
                                                                            countries.find(
                                                                                ({
                                                                                    cca3
                                                                                }) =>
                                                                                    cca3 ===
                                                                                    country
                                                                            )
                                                                                .name
                                                                                .common
                                                                        }`}
                                                                    >
                                                                        {
                                                                            countries.find(
                                                                                ({
                                                                                    cca3
                                                                                }) =>
                                                                                    cca3 ===
                                                                                    country
                                                                            )
                                                                                .name
                                                                                .common
                                                                        }
                                                                    </LinkSC>
                                                                </BorderCountry>
                                                            );
                                                        }
                                                    )
                                                )}
                                            </BorderCountries>
                                        ) : (
                                            'No bordering countries.'
                                        )}
                                    </Dd>
                                </ListItem>
                            </Dl>
                        </Figcaption>
                    </Figure>
                </Article>
            ) : (
                <p>{`'${country}'`} not found</p>
            )}
        </>
    );
};

CountryDetails.propTypes = {
    flags: PropTypes.shape({ png: PropTypes.string, svg: PropTypes.string }),
    name: PropTypes.shape({
        common: PropTypes.string,
        official: PropTypes.string,
        nativeName: PropTypes.object
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string.isRequired,
    capital: PropTypes.arrayOf(PropTypes.string).isRequired,
    tld: PropTypes.arrayOf(PropTypes.string).isRequired,
    currencies: PropTypes.object.isRequired,
    languages: PropTypes.object.isRequired,
    borders: PropTypes.arrayOf(PropTypes.string).isRequired
};

CountryDetails.defaultProps = {
    name: {
        common: 'Unknown',
        official: 'Unknown',
        nativeName: { default: 'Unknown' }
    },
    population: 0,
    region: 'Unknown',
    subregion: 'Unknown',
    capital: ['-'],
    tld: ['Unknown'],
    currencies: { default: 'Unknown' },
    languages: { default: 'Unknown' },
    borders: ['No bordering countries']
};

export default CountryDetails;
