import  styled from 'styled-components';


const StyledButton = styled.button`
    margin: 10px;
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: ${props => props.bcolor};
    box-shadow: 1px 1px 5px #000;
    &:hover{
        transform: scale(1.05);
    }
    &:active{
        transform: scale(.95);
    }
`


function Button(props) {


    return(
        <StyledButton {...props}>
        </StyledButton>
    )
}
export default Button;