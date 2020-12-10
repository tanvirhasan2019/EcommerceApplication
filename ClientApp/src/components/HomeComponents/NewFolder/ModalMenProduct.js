import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MenModalCustom from './MenModalCustom';
import './MenModalCustom';

function ModalMenProduct(props) {

    const [visible, setVisible] = useState(false);
  

    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)} style={{ width: '100%', backgroundColor: 'white', color:'#424242',border:'none' }}>
                <span><i><VisibilityIcon style={{ textAlign: 'center', marginRight: '10px', color: 'rgba(255, 23, 68, 0.90)' }} /></i></span> <span style={{color: 'rgba(255, 23, 68, 0.90)'}}>QUICK VIEW</span>
      </Button>

            <Modal className="product-modal"
                title={props.header}
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={'95%'}
            >
                 
                   <MenModalCustom value={props.data}/>
                 

            </Modal>
               
        </>
    );
}
export default ModalMenProduct