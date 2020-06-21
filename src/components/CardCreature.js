import React from 'react';
import formatterCreatureName from '../utils/formatterCreatureName';


export default props => {
    const { name} = props;

    const creatureName = formatterCreatureName(name);

    let cardStyle = {
        border: "solid 2px lightgrey",
        borderRadius: '2px',
        width: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: '120px',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
        transition: '0.3s',
    }

    let imageStyle = {
       width: "82px",
        height: "82px",
    }

    return(
        <div style={cardStyle}>
            <div >
                <img style={imageStyle} alt="" src={`assets/monsters/${creatureName}.gif`} />
            </div>
        </div>
    )
}