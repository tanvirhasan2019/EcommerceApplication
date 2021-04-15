import React, { Component, PropTypes, useRef, createRef  } from 'react';
import { Toast } from 'primereact/toast';
import RichTextEditor from 'react-rte';

import { NavMenu } from '../../NavMenu'
import FooterLayout from '../../FooterLayout'

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import authService from '../../api-authorization/AuthorizeService';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';






export default class MyStatefulEditor extends Component {

    constructor() {
        super()
       // this.buttonRef = createRef()
        this.toastBC = createRef(null);
        
    }

    state = {
        value: RichTextEditor.createEmptyValue()
       
    }

    


    handlesubmit = () => {

      
        const showWarn = () => {
            this.toastBC.current.show({ severity: 'warn', summary: 'Warn Message', detail: 'Please write something', life: 3000 });
        }

        console.log('HANDLE SUBMIT IS CALLED');
        var data = this.state.value.toString('html');
        console.log('editor data ', data)
        console.log('editor data size ', data.length)

        if (data.length < 12) {
           
            console.log('PLEASE WRITE SOMETHING');
           
            showWarn()
        }
        else if (data.length > 11) {

            this.SubmitData();

        } else {

        }
    }
    onChange = (value) => {
        this.setState({ value });
        console.log('EDITOR ' + value.toString('html'));
        if (this.props.onChange) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChange(
                value.toString('html')
            );
        }
    };


    async SubmitData(){

        const token = await authService.getAccessToken();

        //console.log("Token Data here : " + token);
        
        if (!token) {
           // setError(true)
        } else {

            fetch('ClientOrder/CreatePost', {
                    method: 'POST', // or 'PUT'
                    headers: !token ? {} : {
                        'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                    },

                    body: JSON.stringify({

                        'PostContent': this.state.value.toString('html')

                    }),
                })
                    .then(response => response.json())
                    .then(Response => {
                       // this.setState({ value:null })

                       
                    })
                    .catch((error) => {
                       
                   });
            
        }
    }

    render() {

       
       

        return (
            <>
                

                <Toast ref={this.toastBC}  position="bottom-center" />
                <NavMenu />

                <div className="row" style={{ marginTop: '80px' }}>
                   
                  <div class="container">

                        <div className="row d-flex justify-content-center" >
                            <RichTextEditor
                            style={{ width: '100%' }}
                            value={this.state.value}
                            onChange={this.onChange}
                            placeholder="Write something here.."
                        />
                    </div>

                        <div className="row d-flex justify-content-center" style={{ marginTop:'20px'}}>
                            <Button
                                onClick={this.handlesubmit}
                                style={{width:'20%'}}
                                variant="contained"
                                color="primary"
                                size="large"
                           
                                startIcon={<SaveIcon />}
                            >
                                Save
                          </Button>
                    </div>

                    </div>
                    </div>            

                <div className="row" style={{ marginTop:'150px' }}>
                    <FooterLayout />
                </div>

                
             </>

           
        );
    }
}