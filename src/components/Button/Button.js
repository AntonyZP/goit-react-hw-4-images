import React from "react";
import PropTypes from 'prop-types';
import { LoadMoreButton } from "./Button.styled";


const Button = ({onClick, onLoadMoreBtn}) =>{
    return (
        <LoadMoreButton disabled = {!onLoadMoreBtn} type="button" onClick={onClick}
        >LoadMore...</LoadMoreButton>
    )
}

export default Button;

Button.propTypes = {
    onLoadMoreBtn: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

