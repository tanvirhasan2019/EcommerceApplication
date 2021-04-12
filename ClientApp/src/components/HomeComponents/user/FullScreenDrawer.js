import React, { Component} from 'react'
import {
    Button, ButtonToolbar, IconButton, Drawer
} from 'rsuite';

import VisibilityIcon from '@material-ui/icons/Visibility';
import Allitemslist from './Allitemslist'

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
                                   
                <VisibilityIcon onClick={() => this.toggleDrawer('right')} />

                <Drawer full placement={placement} show={show} onHide={this.close}>
                    <Drawer.Header>
                        <Drawer.Title>Drawer Title</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div className="container">
                            <Allitemslist value={this.props.value} />
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
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
