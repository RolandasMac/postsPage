import styled from "styled-components";

const StyledDiv = styled.div`
    margin: 5px 0;
    height: ${props => props.height}px;
    width: ${props => props.width}%;
    border: 1px solid ${props => props.bordercolor};
    border-radius: 10px;
    &>div{
        background-color: ${props => props.bcolor};
        height: 100%;
        width: ${props => props.progress}%;;
    }
`


function ProgressBar(props){


    return(
        <StyledDiv {...props}>
            <div className="bar"></div>
        </StyledDiv>
    )
}
export default ProgressBar;