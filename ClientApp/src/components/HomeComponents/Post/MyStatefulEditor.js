import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';

import { NavMenu } from '../../NavMenu'
import FooterLayout from '../../FooterLayout'

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


export default class MyStatefulEditor extends Component {


    state = {
        value: RichTextEditor.createEmptyValue()
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

    render() {
        return (
            <>
                <NavMenu />

                <div className="row" style={{ marginTop: '80px' }}>
                  <div class="container">

                        <div className="row" >
                            <RichTextEditor
                            style={{ width: '100%' }}
                            value={this.state.value}
                            onChange={this.onChange}
                            placeholder="Write something here.."
                        />
                    </div>

                        <div className="row" style={{ marginTop:'20px'}}>
                            <Button
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