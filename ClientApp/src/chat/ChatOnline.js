import React, { useState, useEffect, useRef, useCallback , Component } from 'react';
import authService from '../components/api-authorization/AuthorizeService';
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

      
       
        this.state = {

           isAuthenticated: false,
           chatLoaded : false ,
           userid : null,
           hubConnection:null,
            attr: {
                showChatbox: false,
                showIcon: true,
                messages: []
            }
        };
    }

    //const toastBC = useRef(null);   

   /*  showError = () => {
        toastBC.current.show({ severity: 'error', summary: 'PLease login first', detail: 'Chat is available for logged in user', life: 3000 });
    } */

   

    handleClickIcon = () => {
        // toggle showChatbox and showIcon

        var showChatbox1 = !this.state.attr.showChatbox
        var showIcon1 = !this.state.attr.showIcon
        if (this.props.login == true) {



            this.setState({
                attr :
                {
                    ...this.state.attr,
                    showChatbox : showChatbox1,
                    showIcon : showIcon1
                }
            }, async () => {


              if (this.state.chatLoaded == false) {

                var messageSet = [

                    {
                        text: 'you joined the conversation',
                        timestamp: 1578366389250,
                        type: 'notification',
                    },

                    {
                        author: {
                            username: 'Admin', id: 2,

                            avatarUrl: avatarAdmin
                        },
                        text: 'HELLOW SIR, WELCOME TO TANSHEN TECHNOLOGY',
                        type: 'text',
                        timestamp: 1578366425250,

                    },

                ]



                try {

                       const token = await authService.getAccessToken()
                 
                      
                        console.log('Token from chat home ', token)
                        const response = await fetch('Chat/GetUserChatMessage', {
                            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                        });
                        const data = await response.json();
                        this.setState({ Chat: data.data })
                        this.setState({ chatLoaded: true })

                        console.log('after fetch Chat List from home chat ', { data })
                    
                   


                    var uid = this.props.id

                    console.log('MSG 1 ', data.data)
                        if (data.data) {
                            data.data.map(item => {
                                console.log('ITEM ', item)
                                item.messages.map(item2 => {

                                    if (item2.userId == uid) {

                                        var msg1 = {

                                            author: {
                                                username: 'You', id: 1,
                                                avatarUrl: avatarUser
                                            },
                                            text: item2.messages,
                                            type: 'text',
                                            timestamp: 1578366425250,

                                        }

                                        messageSet.push(msg1);
                                    }
                                    else {


                                        var msg2 = {

                                            author: {
                                                username: 'Admin', id: 2,

                                                avatarUrl: avatarAdmin
                                            },
                                            text: item2.messages,
                                            type: 'text',
                                            timestamp: 1578366425250,

                                        }

                                        messageSet.push(msg2);
                                    }

                                })

                            })
                        }

                        this.setState({
                            attr:
                            {
                                ...this.state.attr,
                                messages: messageSet
                            }
                        });

                    this.componentDidMount()
                    

                } catch (Exception) {
                    console.log('ERROR CALLED')

                }

            }




         });
        } else {

            // showError()

        }


    };
    handleOnSendMessage = async (message) => {

        console.log('Messages ', message)
        this.setState({
            attr: {
                ...this.state.attr,
                messages: this.state.attr.messages.concat({
                    author: {
                        username: 'You',
                        id: 1,
                        avatarUrl: avatarUser ,
                    },
                    text: message,
                    type: 'text',
                    timestamp: +new Date(),
                })} }) 
      



        // API REQUEST FOR STORING DATA
        const token = await authService.getAccessToken();
      //  console.log("Token is  : " + token);

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

   /* componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])

        this.setState({          
            userid: user && user.sub
        });


    } */
    componentDidMount = async () => {

        // this._subscription = authService.subscribe(() => this.populateState());
        //  this.populateState(); this._subscription = authService.subscribe(() => this.populateState());
       //  this.populateState();
      
       
        console.log('COMPONENTDIDMOUNT CALLED FROM WEBSOCKET')
       // console.log('USER ID IS ', this.state.userid
        console.log('USER ID IS ', this.props.id)

            const hubConnection = new SignalR.HubConnectionBuilder()
                .withUrl("https://localhost:44317/signalrServer")
                .configureLogging(SignalR.LogLevel.Information)
                .build();

            this.setState({ hubConnection }, () => {
                this.state.hubConnection
                    .start()
                    .then(() => console.log('Connection started!'))
                    .catch(err => console.log('Error while establishing connection :('));
                // var connection = "connection" + this.state.user;
                var connection = "connection" + this.props.id;
                this.state.hubConnection.on(connection, (sendCode, message) => {

                    console.log('SignalR Response')
                    console.log('message from SERVER ', message)
                    if (sendCode == 2) {
                        this.setState({
                            attr: {
                                ...this.state.attr,
                                messages: this.state.attr.messages.concat({
                                    author: {
                                        username: 'Admin',
                                        id: 2,
                                        avatarUrl: avatarAdmin,
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

       // console.log('User id from chatOnnline', this.props.id)

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
                                username: 'You', id: 1,
                                avatarUrl: avatarUser
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



