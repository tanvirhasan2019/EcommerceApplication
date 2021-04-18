import React, { Component } from 'react';
import './StyleSheet.scss';
import { Redirect } from "react-router";
import { NavMenu } from '../../NavMenu'
import FooterLayout from '../../FooterLayout'
import PostList from './PostList'
import authService from '../../api-authorization/AuthorizeService'


export default class Blogsection extends Component {
   
    state = {
        redirect: false,
        Post:[]
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

    async componentDidMount() {

        try {

            const token = await authService.getAccessToken()
            const response = await fetch('Post/GetUserAllpost', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            this.setState({Post:data.data})
            //setResult(data.data)

            console.log('after fetch post ', { data })
            console.log('after fetch state ', this.state.Post)

        } catch (e) {
            console.log('ERROR CALLED')
        }

    }

   
    render() {
        return (
            <div>
            <div className="container-fluid">
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
                            <PostList value={this.state.Post} />
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