import React, { Component} from 'react'
import {
    Button, ButtonToolbar, IconButton, Drawer
} from 'rsuite';

import VisibilityIcon from '@material-ui/icons/Visibility';
import { toaster } from 'evergreen-ui';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Demo from '../customize_product/DateTimeComponent/Demo';

export default class FullScreenDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.close = this.close.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }
    close() {
        this.setState({
            show: false
        });
    }
    toggleDrawer(placement) {
        this.setState({
            placement,
            show: true
        });
    }
    render() {
        const { placement, show } = this.state;
        //console.log('Full Screen Drawer props ', this.props.value)
        return (
            <div>
                                   
               
                 <Fab onClick={() => this.toggleDrawer('right')} variant="extended" color="primary" aria-label="add">
                        <NavigationIcon  />
                          DETAILS
                 </Fab>

                <Drawer full placement={placement} show={show} onHide={this.close}>
                    <Drawer.Header>
                        <Drawer.Title></Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div className="container">
                                 <div className="row">
                                {this.props.data.postId}
                             </div>

                              <div className="row">
                                {this.props.data.client.userName} 
                             </div>

                            <div className="row">
                                <Demo value={this.props.data.DateTime}/>
                             </div>

                             <div className="row">
                                 <div className="container" dangerouslySetInnerHTML={{ __html: this.props.data.postContent }}  />
                             </div>
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer style={{marginBottom:'10px'}}>
                        <Button onClick={this.close} appearance="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.close} appearance="subtle">
                            Cancel
                       </Button>
                    </Drawer.Footer>
                </Drawer>
            </div>
        );
    }
}
