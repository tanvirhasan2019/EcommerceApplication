import React, { Component } from 'react';
import './StyleSheet.scss';
import { Redirect } from "react-router";
import { NavMenu } from '../../NavMenu'
import FooterLayout from '../../FooterLayout'
import PostList from './PostList'
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
            <div>
            <div class="container-fluid">
                <NavMenu />
                {this.renderRedirect()}

                <div className="container">
                    <div className="post-something">
                        <div className="form-floating mb-3 d-flex align-self-center">
                            <input onClick={this.redirectHandler} type="text"
                                className="form-control" id="floatingInput" placeholder="Whats on your mind ??" />
                        </div>
                    </div>
                    <div className="row">
                         <PostList />
                    </div>

                </div>

                </div>
                <div className="row" style={{marginTop:'10px', bottom:'0px'}}>
                    <FooterLayout  />
                </div>

              </div>
        );
    }
}