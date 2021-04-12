import React, { useState, useEffect, useRef } from 'react';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';

import ChatBox, { ChatFrame } from 'react-chat-plugin';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import { Toast } from 'primereact/toast';


export default function ChatOnline(props) {

 
    const toastBC = useRef(null);

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
      }, */
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
  const handleOnSendMessage = (message) => {
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
    });
    };

   

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




