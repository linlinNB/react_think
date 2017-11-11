import React from 'react';
import {Avatar} from 'antd';

let photostyle = {
    display: 'inline'
}

class PhotoIcon extends React.Component {
    render() {
        return (
            <Avatar shape="square" size="large" src={require('../../img/test.jpg')}/>
        )
    }

}


export default PhotoIcon;