import styled from 'styled-components';

export const Copyright = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    font-size: 0.8rem;
    span {
        padding-top: 0px;
        font-size: 20px;
        color: white;
    }
`;

export const FooterBottom = styled.footer`
    z-index: 4;
    width: 100%;
    flex: none;
    display: block;
    font-weight: 300;
    background-color: black;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    height: 60px;
    @media only screen and (max-width: 767px) {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100px;
        padding-left: 0;
    }
`;

export const Icon = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 180px;
    padding-right: 20px;
    img {
        width: 18px;
    }
    @media only screen and (max-width: 767px) {
        padding-right: 0;
        padding-top: 12px;
    }
`;

export const FooterLinks = styled.a`
    display: flex;
    font-size: 20px;
    color: white;
    &:hover {
        color: white;
        cursor: pointer;
    }
`;