import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
    &:last-child {
        margin-right: 0;
    }

    min-width: 180px;
    height: 60px;
    padding: 10px 15px;
    border-radius: 8px;
    margin-right: 10px;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    border: none;

    color: ${(props) => props.color || "gray"};
    background: ${(props) => props.background || "white"};

    ${(props) =>
        props.primary &&
        css`
            color: white;
            background: #000;
            border-color: #333;
        `}
`;

function Button({ children, ...props }) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
