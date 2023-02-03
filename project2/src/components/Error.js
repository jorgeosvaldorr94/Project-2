import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje}) => (
        <h4 className='alert-danger2'>{mensaje}</h4>    
);

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;
