import React, { useState, useEffect, useRef, useCallback , Component } from 'react';
import authService from '../../api-authorization/AuthorizeService';
import * as SignalR from '@aspnet/signalr';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import ChatBox, { ChatFrame } from 'react-chat-plugin';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { Toast } from 'primereact/toast';

const avatarAdmin = 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-business-customer-service-avatar-vector-illustration-png-image_2297978.jpg';

const avatarUser = 'https://e7.pngegg.com/pngimages/789/888/png-clipart-computer-icons-login-person-user-avatar-log-smiley-desktop-wallpaper-thumbnail.png';


export default class ChatTableLiveUpdate extends Component {

    constructor(props) {
        super(props);
       

        this.state = {
           hubConnection:null,
           
        }
    }

   

   
   
    componentDidMount = async () => {


        console.log('ComponentDidMount Called from ChatTableLiveUpdate')
      
        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:44317/signalrServer")
            .configureLogging(SignalR.LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));
            var connection = "AdminTableConnection"
            this.state.hubConnection.on(connection, (sendCode , message , UserID) => {

                console.log('SignalR Response')
                console.log('message from server ', message)
                this.props.ChatData(message)         

            });


        }) 

               
      
    }



    render() {



        return (
            <>
                             
            </>
        );
    }
}

