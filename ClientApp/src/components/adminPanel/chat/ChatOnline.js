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


export default class ChatOnline extends Component {

    constructor(props) {
        super(props);
        console.log('CHAT DATA ', this.props)
        console.log('USER ID CHAT  ', this.props.data.data.user.id)

        var messageSet = [

            {
                text: 'you joined the conversation',
                timestamp: 1578366389250,
                type: 'notification',
            },

            {
                author: {
                    username: 'Admin', id: 1,
                    avatarUrl: avatarAdmin
                },
                text: 'HELLOW SIR, WELCOME TO TANSHEN TECHNOLOGY',
                type: 'text',
                timestamp: 1578366425250,

            },

        ]


        //var uid = this.props.data.chatData.data.user.id
        var uid = this.props.data.data.user.id
       // var userName = this.props.data.chatData.data.userName
        var userName = this.props.data.data.user.userName
        console.log('User Name ', userName)

       // this.props.data.chatData.data.messages.map(item => {
        this.props.data.data.messages.map(item => {
            if (item.user.id == uid) {

                var msg1 = {

                    author: {
                        username: userName, id: 2,
                        avatarUrl: avatarUser
                    },
                    text:  item.messages,
                    type: 'text',
                    timestamp: 1578366425250,

                }

                messageSet.push(msg1);
            }        
            else {

               
                var msg2 = {

                    author : {
                        username: 'Admin', id: 1,

                        avatarUrl: avatarAdmin
                    },
                    text: item.messages,
                    type: 'text',
                    timestamp: 1578366425250,

                }

                messageSet.push(msg2);
            }
            
            
        })


        this.state = {
           hubConnection:null,
            attr: {

                showChatbox: true,
                showIcon: false,
                messages: messageSet,
                    

                
            }
        };
    }

   

    //const toastBC = useRef(null);   

    /* showError = () => {
        toastBC.current.show({ severity: 'error', summary: 'PLease login first', detail: 'Chat is available for logged in user', life: 3000 });
    } */
    handleClickIcon = () => {
        // toggle showChatbox and showIcon
       

        this.props.handleCloseChat()
       
         
        

    };

    handleOnSendMessage = async (message) => {

        console.log('Messages ', message)

        this.setState({
            attr: {
                ...this.state.attr,
                messages: this.state.attr.messages.concat({
                    author: {
                        username: 'Admin',
                        id: 1,
                        avatarUrl: avatarAdmin,
                    },
                    text: message,
                    type: 'text',
                    timestamp: +new Date(),
                })
            }
        })

        const token = await authService.getAccessToken();
      

        if (!token) {
            // setError(true)
        } else {

            fetch('Chat/AdminCreateChat', {
                method: 'POST', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({

                    'Messages': message,
                    'UserId': this.props.data.data.user.id


                }),
            })
                .then(response => response.json())
                .then(Response => {
                    // this.setState({ value:null })
                    console.log('Response ', Response)

                })
                .catch((error) => {

                });

        }


    };


    componentDidMount = async () => {


        console.log('ComponentDidMount Called')
        //console.log("USER ID STRING FOR CONN  ${this.props.data.data.user.id}")
       

        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:44317/signalrServer")
            .configureLogging(SignalR.LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));
            var connection = "connection" + this.props.data.data.user.id;
            this.state.hubConnection.on(connection, (sendCode , message) => {

                console.log('SignalR Response')
                console.log('message from server ', message)
                if (sendCode == 1) {
                    this.setState({
                        attr: {
                            ...this.state.attr,
                            messages: this.state.attr.messages.concat({
                                author: {
                                    username: this.props.data.data.user.userName,
                                    id: 2,
                                    avatarUrl: avatarUser,
                                },
                                text: message,
                                type: 'text',
                                timestamp: +new Date(),
                            })
                        }
                    })
                }
               


            });


        }) 

               
      
    }



    render() {



        return (
            <>
                
                <ChatFrame
                    chatbox={

                        <ChatBox

                            onSendMessage={this.handleOnSendMessage}
                            userId={1}
                            messages={this.state.attr.messages}
                            width={'300px'}
                            showTypingIndicator={true}
                            activeAuthor={{
                                username: 'Admin', id: 1,
                                avatarUrl: avatarAdmin
                            }}
                        />
                    }
                    icon={<WhatsAppIcon className="Icon" style={{ color: 'white' }} />}
                    clickIcon={this.handleClickIcon}
                    showChatbox={this.state.attr.showChatbox}
                    showIcon={this.state.attr.showIcon}
                    iconStyle={{ background: 'black ', fill: 'white' }}

                >

                </ChatFrame>


            </>
        );
    }
}











/* export default function ChatOnline(props) {

 
    const toastBC = useRef(null);
    const [hubConnection, setConnection ] = useState(null);

    const showError = () => {
        toastBC.current.show({ severity: 'error', summary: 'PLease login first', detail: 'Chat is available for logged in user', life: 3000 });
    }


  const [attr, setAttr] = useState({
    showChatbox: false,
    showIcon: true,
    messages: [
      {
        text: 'you joined the conversation',
        timestamp: 1578366389250,
        type: 'notification',
      },
      /* {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
       // text: 'Hi',
        type: 'text',
        timestamp: 1578366393250,
      }, 
      {
          author: {
              username: 'Admin', id: 2,
              
              avatarUrl: 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-business-customer-service-avatar-vector-illustration-png-image_2297978.jpg'
          },
        text: 'HELLOW SIR, WELCOME TO TANSHEN TECHNOLOGY',
        type: 'text',
        timestamp: 1578366425250,
       
      },
      
    ],
  });
  const handleClickIcon = () => {
    // toggle showChatbox and showIcon
      if (props.login == true) {
          setAttr({
              ...attr,
              showChatbox: !attr.showChatbox,
              showIcon: !attr.showIcon,
          });
      } else {

          showError()

          }
      
   
  };
    const handleOnSendMessage = async (message) => {

    console.log('Messages ', message)
    setAttr({
      ...attr,
      messages: attr.messages.concat({
        author: {
          username: 'You',
          id: 1,
              avatarUrl: 'https://e7.pngegg.com/pngimages/789/888/png-clipart-computer-icons-login-person-user-avatar-log-smiley-desktop-wallpaper-thumbnail.png',
        },
        text: message,
        type: 'text',
        timestamp: +new Date(),
      }),
    })



      // API REQUEST FOR STORING DATA
        const token = await authService.getAccessToken();
        console.log("Token is  : " + token);

        if (!token) {
            // setError(true)
        } else {

            fetch('Chat/CreateChat', {
                method: 'POST', // or 'PUT'
                headers: !token ? {} : {
                    'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
                },

                body: JSON.stringify({

                    'Messages': message
                   

                }),
            })
                .then(response => response.json())
                .then(Response => {
                    // this.setState({ value:null })


                })
                .catch((error) => {

                });

        }

    
    };





    useEffect(() => {

        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("https://localhost:44317/signalrServer")
            .configureLogging(SignalR.LogLevel.Information)
            .build();
       

        setConnection(hubConnection);
    }, []);


    useEffect(() => {
        if (hubConnection) {
            hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));
            hubConnection.on("ReceiveMessage", (message) => {

                console.log('SignalR Response')
                console.log('message from ', message)


            });
        }
    }, [hubConnection]);

   

 


    return (
        <>
            <Toast ref={toastBC} position="bottom-center" />
                <ChatFrame
                        chatbox={
                       
                        <ChatBox

                            onSendMessage={handleOnSendMessage}
                            userId={1}
                            messages={attr.messages}
                            width={'300px'}
                            showTypingIndicator={true}
                            activeAuthor={{
                                username: 'Admin', id: 2,
                                avatarUrl: 'https://png.pngtree.com/element_our/20200702/ourmid/pngtree-business-customer-service-avatar-vector-illustration-png-image_2297978.jpg'
                            }}
                                /> 
                    }
                    icon={<WhatsAppIcon className="Icon" style={{ color: 'white' }} />}
                    clickIcon={handleClickIcon}
                    showChatbox={attr.showChatbox}
                    showIcon={attr.showIcon}
                    iconStyle={{ background: 'black ', fill: 'white' }}

                >

            </ChatFrame>
        
            
       </>
  );
}

*/



