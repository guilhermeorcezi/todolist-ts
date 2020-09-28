import styled from 'styled-components';

export const Header = styled.div`
    display:flex;
    width:100%;
    padding: 20px 30px;
    background-color: #7159c1;

    strong{
        color:#FFF;
        font-size:32px;
        font-weight:bold;
    }
`;

export const Container = styled.div`
	display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;

    div{
        background-color: #fff;
        padding 30px;
        max-width:900px;
        width:100%;
        border-radius:10px
    }
`;