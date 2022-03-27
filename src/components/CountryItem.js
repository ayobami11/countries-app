import { Link } from 'react-router-dom';

import styled from 'styled-components';

import PropTypes from 'prop-types';

import { formatWithComma } from '../utils/formatWithComma';

const Li = styled.li`
    border-radius: 0.5em;
    line-height: 1.75;
    margin: 1em 0;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);

    background: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.white
            : theme.colors.dark['dark-blue']};

    color: ${({ theme }) =>
        theme.userTheme === 'light'
            ? theme.colors.light['very-dark-blue']
            : theme.colors.white};
`;
const Figure = styled.figure``;
const Img = styled.img`
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 0.5em 0.5em 0 0;
    max-width: 100%;
    height: 300px;
`;
const Figcaption = styled.figcaption`
    padding: 2em 1.5em;
`;

const Dl = styled.dl``;

const ListItem = styled.div`
    display: flex;
`;

const Dt = styled.dt`
    font-weight: ${({ theme }) => theme.font.weights['600']};
    margin-right: 0.35em;

    &::after {
        content: ':';
    }
`;

const Dd = styled.dd``;

const H2 = styled.h2`
    font-weight: ${({ theme }) => theme.font.weights['800']};
`;

const CountryItem = ({
    flags,
    name,
    demonyms,
    population,
    region,
    capital
}) => {
    return (
        <Link to={name?.common ?? name?.official}>
            <Li>
                <Figure>
                    <Img
                        src={flags?.png ?? flags?.svg}
                        alt={`${demonyms?.eng?.m ?? demonyms?.eng?.f} flag`}
                        loading='lazy'
                    />
                    <Figcaption>
                        <H2>{name?.common ?? name?.official}</H2>
                        <Dl>
                            <ListItem>
                                <Dt>Population</Dt>
                                <Dd>{formatWithComma(population)}</Dd>
                            </ListItem>
                            <ListItem>
                                <Dt>Region</Dt>
                                <Dd>{region}</Dd>
                            </ListItem>
                            <ListItem>
                                <Dt>Capital</Dt>
                                <Dd>{capital[0]}</Dd>
                            </ListItem>
                        </Dl>
                    </Figcaption>
                </Figure>
            </Li>
        </Link>
    );
};

CountryItem.propTypes = {
    flags: PropTypes.shape({ png: PropTypes.string, svg: PropTypes.string }),
    name: PropTypes.shape({
        common: PropTypes.string,
        official: PropTypes.string
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.arrayOf(PropTypes.string).isRequired
};

CountryItem.defaultProps = {
    name: { common: 'Unknown', official: 'Unknown' },
    population: 0,
    region: 'Unknown',
    capital: ['Unknown']
};

export default CountryItem;
