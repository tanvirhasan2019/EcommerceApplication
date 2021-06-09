import React, { Component} from 'react';
import PicturesWall from './PicturesWall';

import './MenCategory.scss';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Form, Input, InputNumber} from 'antd';
import { Select, Tag } from 'antd';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { toaster } from 'evergreen-ui';


import { connect } from 'react-redux';
import { ProductRootData} from '../../../../actions/AdminCreateProduct';
import authService from '../../../api-authorization/AuthorizeService';

 
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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



const { Option } = Select

var category = 'GETNTS'
var subcategory = 'GENTS1'


class MenCategory extends Component {
    constructor(props) {
        super(props);
       

        this.onFinish = this.onFinish.bind(this);
        this.OnchangeDesc = this.OnchangeDesc.bind(this);
     
    }

   
    onFinish(values) {

        const {ProductRootData} = this.props;
       

       // console.log(values);
        ProductRootData(values);

        
       // console.log(JSON.stringify(Data));

        //SEND TO SERVER
        this.SubmiData();

      
    }

     
   
    async SubmiData() {

      
        const token =  await authService.getAccessToken();
        console.log("Token Data here : " + token);

        const { Data} = this.props;


      //  console.log("ORIGINAL IMAGE URL " + JSON.stringify(getBase64(Data.Img[0].originFileObj)));

        let x1 = '', x2 = '', x3 = '', x4 = '', x5 = '';

        try {
            if (await getBase64(Data.Img[0].originFileObj) !== undefined || await getBase64(Data.Img[0].originFileObj) !== null) {
                x1 = await getBase64(Data.Img[0].originFileObj);
            }
        } catch{
            x1 = '';
        }


        try {
            if (await getBase64(Data.Img[1].originFileObj) !== undefined || await getBase64(Data.Img[1].originFileObj) !== null) {
                x2 = await getBase64(Data.Img[1].originFileObj);
            }
        } catch{
            x2 = '';
        }

        try {
            if (await getBase64(Data.Img[2].originFileObj) !== undefined || await getBase64(Data.Img[2].originFileObj) !== null) {
                x3 = await getBase64(Data.Img[2].originFileObj);
            }
        } catch{
            x3 = '';
        }

        try {
            if (await getBase64(Data.Img[3].originFileObj) !== undefined || await getBase64(Data.Img[3].originFileObj) !== null) {
                x4 = await getBase64(Data.Img[3].originFileObj);
            }
        } catch{
            x4 = '';
        }

        try {

            if (await getBase64(Data.Img[4].originFileObj) !== undefined || await getBase64(Data.Img[4].originFileObj) !== null) {
                x5 = await getBase64(Data.Img[4].originFileObj);
            }

        } catch{
            x5 = '';
        }



        const ProductImage = [
            {
                img1: x1

            },
            {
                img2: x2
            },
            {
                img3: x3
            },
            {
                img4: x4
            },
            {
                img5: x5
            }

        ]

        console.log(ProductImage)
        
       
        fetch('Admin/CreateProduct', {
            method: 'POST', // or 'PUT'
            headers: !token ? {} : {
                'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                'title' : Data.Root.user.title,
                'description' : Data.Root.user.description,  
                'quantity': Data.Root.user.quantity,
                'price': Data.Root.user.price, 
                'category': category,
                'subcategory': subcategory, 
                'Img': ProductImage
            }), 
        })
            .then(response => response.json())
            .then(Response => {
                toaster.success(
                    '' + Response.status
                )
                console.log('Success:', Response);

            })
            .catch((error) => {

                console.error('Error:', error);
                toaster.danger(
                    'Something went wrong trying to create your audience'
                )
            });
       // console.log("Posted after pass data :" + Data.Root.user.title);  

      
    }

    OnchangeDesc(e) {
        console.log('data ', e.target.value)
}

    render() {

       // const Menitem = this.props;
     //   const { value2, incrementAction, decreaseAction } = this.props;

        return (


            <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>


                <div className="header-text">
                    GENTS ITEM
                </div>


                <Form.Item

                    name={['user', 'category']}
                    label="Category"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >

                    <Select
                        showSearch
                       
                        placeholder="Select a category"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                       
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="GENTS">GENTS</Option>
                        <Option value="KIDS">KIDS</Option>
                        <Option value="LADIES">LADIES</Option>
                        <Option value="STATIONARY">STATIONARY</Option>
                        
                    </Select>
                </Form.Item>


                <Form.Item

                    name={['user', 'subcategory']}
                    label="Sub Category"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >

                    <Select
                        showSearch
                        
                        placeholder="Select a subcategory"
                        optionFilterProp="children"
                        onChange={onChangeSub}
                        onFocus={onFocus}
                        onBlur={onBlur}
                       
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="GENTS1">GENTS1</Option>
                        <Option value="KIDS1">KIDS1</Option>
                        <Option value="LADIES1">LADIES1</Option>
                        <Option value="STATIONARY1">STATIONARY1</Option>

                    </Select>
                </Form.Item>


                <Form.Item

                    name={['user', 'title']}
                    label="Product Title"
                   
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                 <Input />
                </Form.Item>

               

                <Form.Item name={['user', 'description']} label="DESCRIPTION"

                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextareaAutosize
                        style={{ width: '100%', whiteSpace: 'pre-line'}}
                        onChange={this.OnchangeDesc}
                        aria-label="minimum height" rowsMin={5} placeholder="Description ..."
                    />
                    
                  
                </Form.Item>

                <Form.Item
                    name={['user', 'price']}
                    label="PRICE"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 999999999,
                            required:true
                        },
                    ]}
                >
                    <InputNumber  />
                </Form.Item>


                <Form.Item
                    name={['user', 'quantity']}
                    label="QUANTITY"
                    rules={[
                        {
                            type: 'number',
                            min: 0,
                            max: 999999,
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

                    <Fab variant="extended" color="secondary" aria-label="add" type="submit" style={{width:'50%'}} >
                        <NavigationIcon  />
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

function onChange(value) {
    console.log(`selected ${value}`);
    category = value
}

function onChangeSub(value) {
    console.log(`selected ${value}`);
    subcategory =  value
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}


function handleChange(value) {
    console.log(`selected ${value}`);
}



const mapStateToProps = (state) => ({

    Data: state.createproduct
    
});


const mapDispatchToProps = (dispatch) => ({
    ProductRootData: (values) => dispatch(ProductRootData(values)),
    //decreaseAction: () => dispatch(decreaseAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenCategory);

//  <Input.TextArea onChange={this.OnchangeDesc} />