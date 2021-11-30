import styled, {keyframes, css} from 'styled-components'

export const Container = styled.div`
    max-width: 700px;
    margin: 80px auto;
    background: #fff;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);

    h1{
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

export const Form = styled.form`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        padding: 10px 15px;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#ddd')};
        border-radius: 4px;
        font-style: 17px;
    }
`;

const animation = keyframes`
from{
    transform: rotate(0deg)
}
to{
    transform: rotate(360deg);
}
`;



export const SubmitButton = styled.button.attrs( props => ({
    type: 'submit',
    disabled: props.loading
    // aqui ele vai recber true se o loadinf for 1 === true
}))`
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: #0D2636;
    border-radius: 4px;

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${props => props.loading &&(
        css`
            svg{
                animation: ${animation} 2s linear infinite ;
            }
        `)
    }

`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`

    background: transparent;
    border: none;
    border-radius: 4px;
    color: #0D2636;
    padding: 8px 7px ;
    outline: none ;
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;
    

    li{
        padding: 15px 0 ;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & + li{
        border-top: 1px solid #eee ;
        }

        a{
            color: #0D2636;
            text-decoration: none;
        }

        }
    
   

   
`;

