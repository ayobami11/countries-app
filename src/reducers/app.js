const initialState = {
    theme: 'light',
    searchCountry: '',
    region: '',
    countries: [],
    filteredCountriesBySearch: [],
    filteredCountriesByRegion: [],
    // intersection of countries by search and region
    commonCountries: [],
    currentCountry: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_COUNTRIES': {
            const { countries } = action.payload;

            return {
                ...state,
                countries
            };
        }

        case 'SET_THEME': {
            const { theme } = action.payload;

            return {
                ...state,
                theme
            };
        }

        case 'SET_SEARCH_COUNTRY': {
            const { searchCountry } = action.payload;

            return {
                ...state,
                searchCountry
            };
        }

        case 'SET_REGION': {
            const { region } = action.payload;

            return {
                ...state,
                region
            };
        }

        case 'SET_COMMON_COUNTRIES': {
            const commonCountries = state.countries.filter(
                ({ name, region }) => {
                    return (
                        region.toLowerCase() === state.region.toLowerCase() &&
                        name?.common
                            .toLowerCase()
                            .startsWith(state.searchCountry.toLowerCase())
                    );
                }
            );

            return {
                ...state,
                commonCountries
            };
        }

        case 'FILTER_COUNTRIES_BY_SEARCH': {
            const filteredCountriesBySearch = state.searchCountry
                ? state.countries.filter(({ name }) =>
                      name?.common
                          .toLowerCase()
                          .startsWith(state.searchCountry.toLowerCase())
                  )
                : [];

            return {
                ...state,
                filteredCountriesBySearch
            };
        }

        case 'FILTER_COUNTRIES_BY_REGION': {
            const filteredCountriesByRegion = state.region
                ? state.countries.filter(
                      ({ region }) =>
                          state.region.toLowerCase() === region.toLowerCase()
                  )
                : [];

            return {
                ...state,
                filteredCountriesByRegion
            };
        }

        case 'SET_CURRENT_COUNTRY': {
            const currentCountry = state.countries.find(
                ({ name }) => name?.common === action.payload.country
            );

            return {
                ...state,
                currentCountry
            };
        }

        default:
            return {
                ...state
            };
    }
};

export { initialState, reducer };
