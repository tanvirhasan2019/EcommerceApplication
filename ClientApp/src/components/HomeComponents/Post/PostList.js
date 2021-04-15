import React, { Component, Fragment } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';



const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


export default class PostList extends Component {

    constructor(props) {
        super(props);
       
        this.state = { counter: 0 };
       
    }

    render() {

        console.log('FROM BLOG')
        console.log(this.props.value)
        const listData = [];
        this.props.value.map(item => {
            
            listData.push({
                href: 'https://ant.design',
                title: item.client.userName,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                    '',
                content: item.postContent
            })
        })
      /*  for (let i = 0; i < 23; i++) {
            listData.push({
                href: 'https://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        } */


        return (

            <List
               
                itemLayout="vertical"
                size="default"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={listData}
    
                renderItem={item => (

                    <List.Item
                  
                    key={item.title}
                    actions={[
                      <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                    ]}
        
                   >
                    <List.Item.Meta
                     
                      avatar={<Avatar src={item.avatar} />}
                      title={<a>{item.title}</a>}
                     
                    />
                       
                        <div className="container" dangerouslySetInnerHTML={{ __html: item.content }}  />
                  </List.Item>
    )}
  />
    );
  }
}






