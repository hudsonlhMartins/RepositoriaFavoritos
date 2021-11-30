import {createGlobalStyle} from'styled-components'

export default createGlobalStyle`
*{
    padding:0;
    margin:0;
    outline:0;
    box-sizing:border-box;
}

body, html, #root{
    min-height: 100%;
}

body{
    background: #0D2636;
    font-size: 14px;
    -webkit-font-smoothing: antialiased !important;
    //deixa a fonte mais bonita arredondada
}

body, input, button{
    color: #222;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
} 
button{
    cursor: pointer;
}

`