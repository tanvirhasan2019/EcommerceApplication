import React from 'react';

import 'antd/dist/antd.css';

import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { MenImageData} from '../../../../actions/Formdata';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [

            ],
        };
       

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
        });
       
    };

    handleChange = ({ fileList }) => this.setState(
        { fileList }, () => {
            const { MenImageData } = this.props;
            MenImageData(this.state.fileList);
        }

    );
  
    



    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
       

        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        
        return (
            <>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    MenImageData: (fileList) => dispatch(MenImageData(fileList)),
   
});

const mapStateToProps = (state) => ({
    value2: state.value,
});

export default connect(mapStateToProps, mapDispatchToProps)(PicturesWall);

