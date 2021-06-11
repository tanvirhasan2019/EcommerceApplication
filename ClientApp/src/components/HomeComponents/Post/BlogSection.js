import React, { Component } from 'react';
import './StyleSheet.scss';
import { Redirect } from "react-router";
import { NavMenu } from '../../NavMenu'
import FooterLayout from '../../Footer/FooterLayout'
import PostList from './PostList'
import authService from '../../api-authorization/AuthorizeService'


export default class Blogsection extends Component {
   
    state = {
        redirect: false,
        Post: [],
        loading: true,
        userid: [],
        idloading: true,
        username:''
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
            this.populateState();	

            this.setState({ Post: data.data })
            this.setState({ loading: false })
            //setResult(data.data)

            console.log('after fetch post ', { data })
            console.log('after fetch state ', this.state.Post)

            

        } catch (e) {
            console.log('ERROR CALLED')
        }

    }

    async populateState() {

        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        console.log('user data', { user })
        this.setState({
            userid: user.sub,
            username: user.name
        }, () => { this.setState({ idloading: false }) });
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
                        <div className="row d-flex align-self-center justify-content-center" style={{width:'100%'}}>
                            {!this.state.loading && !this.state.idloading ?
                                <PostList userid={this.state.userid} value={this.state.Post} username={this.state.username}/> : null}   
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