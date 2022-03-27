import styled from 'styled-components';

const MainSC = styled.main`
    width: 90%;
    margin: 0 auto;
    letter-spacing: .02em;
`;

const Main = ({ children }) => <MainSC>{children}</MainSC>;

export default Main;
