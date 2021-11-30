import styled, {keyframes, css} from "styled-components";
import { Link } from "react-router-dom";


const animation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;



export const LoadingDiv = styled.div`

    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;

    ${css`
        svg{
            animation: ${animation} 2s linear infinite ;
        }
    `}



`;

export const Container = styled.div`
    max-width: 700px;
    margin: 80px auto;
    background: #fff;
    padding: 30px;
    box-shadow: 0 0 20 rgba(0,0,0, 0.2);
    border-radius: 4px;

    select{
        margin-top: 12px;
        padding: 4px;
        background: #0D2636;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 14px;

    }

`;

export const ButtonLink = styled(Link)``;

export const Owener = styled.header`

    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }
    h1{
        font-size: 30px;
        color: #0D2636;
    }
    p{
        margin-top: 5px;
        max-width: 400px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        margin-bottom:20px;

    }

`;

export const IssuesList = styled.ul`

    list-style: none;
    border-top: 1px solid #ddd;


    li{
        display: flex;
        align-items: center;
        margin-top: 16px;


        img{
            width: 42px;
            height: 42px;
            object-fit: cover;
            border-radius: 50%;
            border: 1px solid #eee;
        }
        & + li{
            margin-top: 32px;
        }

        div{
            margin-left: 8px;
            flex: 1;

            strong{

                a{
                    color: #222;
                    text-decoration: none;
                    font-size: 14px;

                    &:hover{
                        color: blue;
                    }
                }
            }

            p{
                margin-top: 2px;
                color: #666;
                font-size: 12px;
            }
        }

    }
`;

export const ButtonsPagination = styled.div`

    display: flex;
    justify-content: space-between;
    margin-top: 18px;

    button{
        padding: 6px 8px;
        border: none;
        color: #fff;
        background: #0D2636;
        border-radius: 5px;

        &:disabled{
            opacity: 0.5;
            cursor: not-allowed;
        }
    }


`;