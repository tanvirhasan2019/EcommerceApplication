import React, { Component, useState } from 'react';
import PicturesWall from './PicturesWall';

import './MenCategory.scss';

import { Form, Input, InputNumber, Button } from 'antd';
import { Select, Tag } from 'antd';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';




const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const options_color = [{ value: 'silver' }, { value: 'red' }, { value: 'green' }, { value: 'black' }];
const options_size = [{ value: 'small' }, { value: 'medium' }, { value: 'large' }];





export default class KidsCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''

        };


        this.handleSubmit = this.handleSubmit.bind(this);

    }



    handleSubmit(event) {



    }

    render() {


        return (


            <Form {...layout} name="nest-messages" onFinish={this.handleSubmit} validateMessages={validateMessages}>

                <div className="header-text">
                    KIDS ITEM
                </div>
                <Form.Item
                    name={['user', 'name']}
                    label="Product Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name={['user', 'introduction']} label="DESCRIPTION"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name={['user', 'age']}
                    label="PRICE"
                    rules={[
                        {
                            type: 'number',
                            min: 1,
                            max: 10000000,
                            required: true
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>


                <Form.Item
                    name={['user', 'Quantity']}
                    label="QUANTITY"
                    rules={[
                        {
                            type: 'number',
                            min: 1,
                            max: 10000000,
                            required: true
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item>
                    <Select
                        mode="multiple"
                        showArrow
                        tagRender={tagRenderColor}
                        defaultValue={['silver']}
                        className="selection-options"

                        options={options_color}

                    />
                </Form.Item>

                <Form.Item>
                    <Select
                        mode="multiple"
                        allowClear
                        className="selection-options"
                        placeholder="Please select Size"
                        defaultValue={['small']}
                        onChange={handleChange}
                        options={options_size}
                    >

                    </Select>
                </Form.Item>


                <Form.Item>
                    <div className="selection-options">
                        <PicturesWall />
                    </div>
                </Form.Item>


                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

                    <Fab variant="extended" color="secondary" aria-label="add" type="submit" style={{ width: '50%' }} >
                        <NavigationIcon />
                        Submit
                    </Fab>
                </Form.Item>
            </Form>


        );
    }


}

function tagRenderColor(props) {
    const { label, value, closable, onClose } = props;

    return (
        <Tag color={value} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label}
        </Tag>
    );
}



function handleChange(value) {
    console.log(`selected ${value}`);
}
