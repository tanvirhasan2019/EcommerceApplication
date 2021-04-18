import React, { Component, Fragment } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Commentbox from './Commentbox';

const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);



const HoverText = styled.div`
	color: #000;
	:hover {
		color: #ed1212;
		cursor: pointer;
	}
`



export default class PostList extends Component {

	constructor(props) {
		super(props);
	   
		this.state = { counter: 0, showComment: false , ChooseId:0 };
	   
	}

	handleClickComment = (id) => {
		//e.preventDefault();

		console.log('POST ID CLICK ', id)
		console.log('comment box', this.state.showComment)

		this.setState(prevState => ({
			showComment: !prevState.showComment
		}));

		this.setState(prevState => ({
			ChooseId: id
		}));

		//this.setState({ showComment: !this.state.showComment })
		//console.log('comment box', this.state.showComment)

	}


	render() {

		console.log('FROM BLOG')
		console.log(this.props.value)
		const listData = [];
		this.props.value.map(item => {
			
			listData.push({
				id:item.postId,
				href: 'https://ant.design',
				title: item.client.userName,
				avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
				description:
					'',
				content: item.postContent,
				comments: item.comments
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
				  pageSize: 10,
				}}
				dataSource={listData}
	
				renderItem={item => (

					<List.Item
				  
					key={item.id}
					actions={[
					  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
					  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
					  <HoverText onClick={()=>this.handleClickComment(item.id)} > <IconText  icon={MessageOutlined} text="2" key="list-vertical-message" /> </HoverText>,
					]}
		
				   >
					<List.Item.Meta
					 
					  avatar={<Avatar src={item.avatar} />}
					  title={<a>{item.title}</a>}
					 
					/>
					   
						<div className="container" dangerouslySetInnerHTML={{ __html: item.content }} />
						<div className="row" style={{width:'100%'}}>
							{
								this.state.showComment && this.state.ChooseId == item.id ? <div className="container">
									<Commentbox postid={item.id} comments={item.comments} />

								</div> : null
							}	
						</div>

					</List.Item>



	)}
  />
	);
  }
}






