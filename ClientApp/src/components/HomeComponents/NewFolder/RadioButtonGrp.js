import { Radio } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

export default class RadioButtonGrp extends React.Component {
    state = {
        value: 2,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        return (
            <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio value={1}>S</Radio>
                <Radio value={2}>M</Radio>
                <Radio value={4}>L</Radio>
            </Radio.Group>
        );
    }
}

