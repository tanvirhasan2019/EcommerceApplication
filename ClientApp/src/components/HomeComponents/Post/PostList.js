import React, { Component, Fragment } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Commentbox from './Commentbox';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { LikeTwoTone, DislikeTwoTone, MessageTwoTone , LikeFilled} from '@ant-design/icons';
import authService from '../../api-authorization/AuthorizeService'

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

		console.log('FROM BLOG')
		console.log(this.props.value)
		const listData1 = [];
		if (this.props.value) {
			
			this.props.value.map(item => {

				var like = 0
				var dislike = 0
				
				if (item.likes) {
					item.likes.map(item => {
						if (item.like == 1) {
							like += 1;
							console.log('is like given ------  ', item.like)
						}
						else if (item.like == -1) {
							dislike += 1;
						}
					})

				}
				listData1.push({

					id: item.postId,
					href: 'https://ant.design',
					title: item.client.userName,
					avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
					description:
						'',
					content: item.postContent,
					comments: item.comments,
					like: like,
					dislike: dislike
				})
			})


		}

	   
		this.state = { counter: 0, listData: listData1, showComment: false , ChooseId:0 , CommentSize:0, Like:0, DisLike:0 };
	   
	}

	

	async SaveLike(data, index) {

		
		const token = await authService.getAccessToken();

		fetch('Post/AddLike', {
			method: 'POST', // or 'PUT'
			headers: !token ? {} : {
				'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
			},

			body: JSON.stringify({

				'PostId': data,
				
			}),
		})
			.then(response => response.json())
			.then(Response => {
				

				var like1 = 0 
				var dislike1 = 0

				if (Response.like_count == 1) {
					like1 = 1;
				}
				if (Response.like_count == -1) {
					like1 = -1;
				}
				if (Response.disLike_count == 1) {
					dislike1 = 1;
				}
				if (Response.disLike_count == -1) {
					dislike1 = -1;
				}
				

                let like2 = this.state.listData[index].like + like1
                let dislike2 = this.state.listData[index].dislike + dislike1

               


				this.setState(prevState => {
					const newItems = [...prevState.listData];
					prevState.listData[index].like= like2;
                    prevState.listData[index].dislike= dislike2;
					return {listData: newItems};
				})

                 

			})
			.catch((error) => {

			});


	}


	async SaveDisLike(data, index) {


		const token = await authService.getAccessToken();

		fetch('Post/AddDisLike', {
			method: 'POST', // or 'PUT'
			headers: !token ? {} : {
				'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
			},

			body: JSON.stringify({

				'PostId': data,

			}),
		})
			.then(response => response.json())
			.then(Response => {
				
	            var like1 = 0 
				var dislike1 = 0

				if (Response.like_count == 1) {
					like1 = 1;
				}
				if (Response.like_count == -1) {
					like1 = -1;
				}
				if (Response.disLike_count == 1) {
					dislike1 = 1;
				}
				if (Response.disLike_count == -1) {
					dislike1 = -1;
				}
				

                let like2 = this.state.listData[index].like + like1
                let dislike2 = this.state.listData[index].dislike + dislike1

              


				this.setState(prevState => {
					const newItems = [...prevState.listData];
					prevState.listData[index].like= like2;
                    prevState.listData[index].dislike= dislike2;
					return {listData: newItems};
				})

			})
			.catch((error) => {

			});


	}


	handleClickLike = (id, index) => {
		console.log('INDEX FROM LIKE ', index)
		this.SaveLike(id, index)

	}


	handleClickDislike = (id, index) => {
		
		console.log('INDEX FROM DISLIKE ', index)
		this.SaveDisLike(id, index)

	}

	handleClickComment = (id) => {
		

		console.log('POST ID CLICK ', id)
		console.log('comment box', this.state.showComment)

		this.setState(prevState => ({
			showComment: !prevState.showComment
		}));

		this.setState(prevState => ({
			ChooseId: id
		}));

		

	}


	render() {

		
	
		const { listData } = this.state
		console.log('render list', { listData})
		
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
	
				renderItem={(item, index) => (

					<List.Item					
				    style={{marginTop:'20px'}}
					key={item.id}
						actions={[
							
																					
					]}
		
					>
						
						

						<div style={{ backgroundColor:'#f5f5f5'}} className="row d-flex justify-content-center align-self-center">

							<Avatar src={item.avatar} style={{marginRight:'10px'}} />
							<div className="d-flex align-self-center"><a>{item.title}</a></div>

					    </div>

							
						
					
					   
						<div style={{marginTop:'15px', marginBottom:'10px'}} className="container d-flex justify-content-center" dangerouslySetInnerHTML={{ __html: item.content }} />
						<div className="row" style={{width:'100%'}}>
							{
								this.state.showComment && this.state.ChooseId == item.id ? <div className="container">
									<Commentbox postid={item.id} comments={item.comments} />

								</div> : null
							}	
						</div>



						
						<div className="row d-flex justify-content-around" style={{ width: '100%', marginTop: '20px', marginBottom: '20px'  }}>

							<HoverText style={{ fontSize: '20px' }} onClick={() => this.handleClickLike(item.id, index)} >
								<IconText icon={LikeTwoTone} text={item.like} key="list-vertical-star-o" />
							</HoverText>
							<HoverText style={{ fontSize: '20px' }} onClick={() => this.handleClickDislike(item.id, index)} >
								<IconText icon={DislikeTwoTone} text={item.dislike} key="list-vertical-like-o" />
							</HoverText>
							<HoverText style={{ fontSize: '20px' }} onClick={() => this.handleClickComment(item.id)} >
								<IconText  icon={MessageTwoTone} text={item.comments ? item.comments.length : 0} key="list-vertical-message" />
							</HoverText>
							</div>
						

					</List.Item>



	)}
  />
	);
  }
}


//MessageTwoTone



