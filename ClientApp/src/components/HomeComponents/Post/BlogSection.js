import React, { Component } from 'react';
import './StyleSheet.scss';
import { Redirect } from "react-router";

export default class Blogsection extends Component {
    state = {
       
    }
    state = {
        redirect: false
    }
    redirectHandler = () => {
        this.setState({ redirect: true })
        this.renderRedirect();
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/post-editor' />
        }
    }
   
    render() {
        return (
            <div class="container-fluid">
                {this.renderRedirect()}
                <div className="row post-something">
                    <div className="form-floating mb-3">
                        <input onClick={this.redirectHandler} type="email" className="form-control" id="floatingInput" placeholder="Whats on your mind ??" />
                            
                    </div>
                </div>
            </div>
        );
    }
}