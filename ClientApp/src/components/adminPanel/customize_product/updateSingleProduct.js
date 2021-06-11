import React, { Component } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { Select, Tag } from 'antd';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { toaster } from 'evergreen-ui';
import './StyleSheet.scss';
import 'antd/dist/antd.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SimpleBackdrop from '../../spinner/SimpleBackdrop'
import authService from '../../api-authorization/AuthorizeService';
import FooterLayout from '../../Footer/FooterLayout';
import { NavMenu } from '../../NavMenu'; 

var user_id = 0

export class updateSingleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [


            ],

            loading :'true',

            img1: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',

            title: '',
            description: '',
            price: 0,
            quantity: 0,
            category :'',
            subcategory:'',
            newImg: '',
            data: [],
            loading: true,
          

            clickImage: 1,
            onMouse: {
                id: 0,
                mouse: false

            }

        };

    }

    componentDidMount() {

        fetch(`Product/GetSingleProduct/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => this.setState({


                img1: atob(data.data[0].img.img1 ? data.data[0].img.img1 : ''),
                img2: atob(data.data[0].img.img2 ? data.data[0].img.img2 : '' ),
                img3: atob(data.data[0].img.img3 ? data.data[0].img.img3 : ''),
                img4: atob(data.data[0].img.img4 ? data.data[0].img.img4 : ''),
                img5: atob(data.data[0].img.img5 ? data.data[0].img.img5 : ''),
                title: data.data[0].title,
                description: data.data[0].description,
                price: data.data[0].price,
                quantity: data.data[0].quantity,
                category: data.data[0].category,
                subcategory: data.data[0].subcategory,
                data: data.data[0],
                loading : false


            }));

        console.log('ComponentDidMount called')
    }




    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);

        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })


    };



    handleChange = ({ fileList }) => {
                
       this.setImage(fileList)
      
    } 

    async setImage(fileList) {

        let x1 = '';

        try {
            if (await getBase64(fileList[0].originFileObj) !== undefined || await getBase64(this.state.fileList[0].originFileObj) !== null) {
                x1 = await getBase64(fileList[0].originFileObj)
                if (this.state.clickImage == 1) {
                    this.setState({ img1: x1})
                }

                else if (this.state.clickImage == 2) {
                    this.setState({ img2: x1 })
                }
                else if (this.state.clickImage == 3) {
                    this.setState({ img3: x1 })
                }
                else if (this.state.clickImage == 4) {
                    this.setState({ img4: x1 })
                }
                else if (this.state.clickImage == 5) {
                    this.setState({ img5: x1 })
                }
                
            }
        } catch {
            x1 = '';
        }

      
       
    }

   async handleFormSubmit (values, x1, x2, x3, x4, x5) {
       
       const token = await authService.getAccessToken();
       

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


       console.log({ ProductImage })
       console.log('USER ID ', user_id)


       fetch('Admin/UpdateProduct', {
           method: 'POST', // or 'PUT'
           headers: !token ? {} : {
               'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify({

               'id': parseInt(user_id),
               'title': values.user.title,
               'description': values.user.description,
               'quantity': values.user.quantity,
               'price': values.user.price,
               'category': values.user.category,
               'subcategory': values.user.subcategory,
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




    }

   

    async onFinish(values) {
       
       // e.preventdefault();

        console.log("PROPS IMAGE URL : ", this.state.img1)
        // console.log("Posted after pass data :" + Data.Root.user.title);


    }


    handleDeletImage = () => {
        if (this.state.clickImage == 1) {
            this.setState({ img1: '' })
        }

        else if (this.state.clickImage == 2) {
            this.setState({ img2: '' })
        }
        else if (this.state.clickImage == 3) {
            this.setState({ img3: '' })
        }
       else if (this.state.clickImage == 4) {
            this.setState({ img4: '' })
        }
        else if (this.state.clickImage == 5) {
            this.setState({ img5: '' })
        }
        this.setState({ fileList:[]})
    }

    onStyleChange = (id) => {
        if (id == 1) {

            this.setState({ clickImage: 1 })
        }
        if (id == 2) {

            this.setState({ clickImage: 2 })
        }

        if (id == 3) {

            this.setState({ clickImage: 3 })
        }
        if (id == 4) {

            this.setState({ clickImage: 4 })
        }
        if (id == 5) {

            this.setState({ clickImage: 5 })
        }


    }
    render() {
      
        user_id = this.props.match.params.id

        const title = "TITLE OK";
        console.log('Loading - -  ', this.state.loading)
       
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;

        
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

       
        return (
            <>
                <div className="container" style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                }}>
                <NavMenu />
                {this.state.loading == true ?

                        <SimpleBackdrop /> :

                        <Form  {...layout} name="nest-messages"
                        onFinish={(values) =>
                            this.handleFormSubmit(values, this.state.img1, this.state.img2, this.state.img3, this.state.img4, this.state.img5 )}
                        validateMessages={validateMessages}>


                        <div className="header-text" style={{marginTop:'5%'}}>
                            UPDATE PRODUCT
                         </div>


                        <Form.Item

                            name={['user', 'category']}
                            label="Product Category"
                            initialValue={this.state.category}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />

                        </Form.Item>


                        <Form.Item

                            name={['user', 'title']}
                            label="Product Title"
                            initialValue={this.state.title }
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                          <Input  />

                        </Form.Item>

                        <Form.Item

                            name={['user', 'subcategory']}
                            label="Sub-Category"
                            initialValue={this.state.subcategory}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input  />

                        </Form.Item>

                        <Form.Item name={['user', 'description']} label="DESCRIPTION"
                            initialValue={this.state.description}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                                <Input.TextArea defaultValue={this.state.description} rows={6}/>
                        </Form.Item>

                        <Form.Item
                            name={['user', 'price']}
                            label="PRICE"
                            initialValue={this.state.price}
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 999999999,
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber defaultValue={this.state.price} />
                        </Form.Item>


                        <Form.Item
                            name={['user', 'quantity']}
                            label="QUANTITY"
                            initialValue={this.state.quantity}
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 999999,
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber defaultValue={this.state.quantity} />
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

                                <div className="row d-flex justify-content-start" >



                                    <img onClick={this.onStyleChange.bind(this, 1)} src={this.state.img1}
                                        style={this.state.clickImage == 1 ? { border: '2px solid red' } : {}}
                                        alt="NO IMAGE" className="img-item col-md-4"

                                    />


                                    <img onClick={this.onStyleChange.bind(this, 2)} src={this.state.img2}
                                        style={this.state.clickImage == 2 ? { border: '2px solid red' } : {}}
                                        alt="NO IMAGE" className="float-left col-md-4"


                                    />

                                    <img onClick={this.onStyleChange.bind(this, 3)} src={this.state.img3}
                                        style={this.state.clickImage == 3 ? { border: '2px solid red' } : {}}
                                        alt="NO IMAGE" className="float-left col-md-4" />

                                    <img onClick={this.onStyleChange.bind(this, 4)} src={this.state.img4}
                                        style={this.state.clickImage == 4 ? { border: '2px solid red', marginTop: '10px', marginBottom: '10px' } : { marginTop: '10px', marginBottom: '10px' }}
                                        alt="NO IMAGE" className="float-left col-md-4" />

                                    <img onClick={this.onStyleChange.bind(this, 5)} src={this.state.img5}
                                        style={this.state.clickImage == 5 ? { border: '2px solid red', marginTop: '10px', marginBottom: '10px' } : { marginTop: '10px', marginBottom: '10px' }}
                                        alt="NO IMAGE" className="float-left col-md-4" />


                                    <Button
                                        style={{ marginTop: '10px', marginLeft: '10px' }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleDeletImage}

                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                 </Button>

                                </div>



                                <>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={this.handleChange}
                                    >
                                        {uploadButton}
                                    </Upload>

                                </>
                            </div>
                        </Form.Item>


                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

                            <Fab variant="extended" color="secondary" aria-label="add" type="submit" style={{ width: '50%' }} >
                                <NavigationIcon />
                        UPDATE

                    </Fab>
                        </Form.Item>
                    </Form>
                }
                
                </div>

                <FooterLayout />
             </>

        );
    }


}

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



function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const options_color = [{ value: 'silver' }, { value: 'red' }, { value: 'green' }, { value: 'black' }];
const options_size = [{ value: 'small' }, { value: 'medium' }, { value: 'large' }];

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
