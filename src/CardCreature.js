import React from 'react';
import formatterCreatureName from '../utils/formatterCreatureName';


export default props => {
    const { name} = props;

    const creatureName = formatterCreatureName(name);

    let cardStyle = {
        border: "solid 1px lightgrey",
        borderRadius: '5px',
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: '5px'
    }

    let titleStyle = {
        fontSize: '15px',
        fontWeight: 'bold',
        textDecoration: "underline",
        color: "darkgrey"
    }

    let imageStyle = {
        
       width: "82px",
        height: "82px",
    }

    return(
        <div style={cardStyle}>
            <span style={titleStyle}>{creatureName}</span>
            <div >
                <img style={imageStyle} src={`assets/monsters/${creatureName}.gif`} />
            </div>
        </div>
    )
}