import styled from 'styled-components';

const FooterSC = styled.footer`
    text-align: center;
    padding: 1em 0;
    font-weight: ${({ theme }) => theme.font.weights[600]};

    border-top: 2px solid limegreen;

    position: sticky;
    bottom: 0;
    background: inherit;

    filter: sepia(60%);
`;

const A = styled.a`
    font-weight: ${({ theme }) => theme.font.weights[800]};
    color: limegreen;
    text-decoration-style: wavy;
`;

const Footer = () => {
    return (
        <FooterSC>
            Challenge by{' '}
            <A
                href='https://www.frontendmentor.io'
                target='_blank'
                rel='noreferrer'
            >
                Frontend Mentor
            </A>
            . Coded by{' '}
            <A
                href='https://www.github.com/ayobami11/countries-app'
                target='_blank'
                rel='noreferrer'
            >
                Ayobami Tunwase
            </A>
            .
        </FooterSC>
    );
};

export default Footer;
