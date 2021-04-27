import React, { Component, Fragment } from 'react';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Commentbox from './Commentbox';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { ConfirmDialogDemo } from '../../../components/ShowDialog/ConfirmDialogDemo'
import { LikeTwoTone, DislikeTwoTone, MessageTwoTone, LikeFilled, DislikeFilled } from '@ant-design/icons';
import authService from '../../api-authorization/AuthorizeService'
import { Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
}));



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

		//console.log('FROM BLOG')
	//	console.log(this.props.value)
		const listData1 = [];
		var LikeOrUnlike = 0 // 1= like -1=unlike 0=nothing (user)

		if (this.props.value) {
			
			this.props.value.map(item => {

				var like = 0
				var dislike = 0
				
				//console.log('ITEM CLIENT ID CONSTRUCTOR ', this.state.userid)
				if (item.likes) {
					item.likes.map(item => {
						if (item.like == 1) {
							like += 1;
							
							if (item.clientId == this.props.userid) {
								LikeOrUnlike = 1
								//console.log('ITEM CLIENT ID INSIDE CONDITION ', this.props.userid)
							}

							
						}
						else if (item.like == -1) {
							dislike += 1;
							if (item.clientId == this.props.userid) {
								LikeOrUnlike = -1
							}
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
					commentSize: item.comments ? item.comments.length : 0,
					like: like,
					dislike: dislike,
					LikeOrUnlike: LikeOrUnlike,
					clientId: item.clientId,
					dateTime: item.dateTime
				})

				LikeOrUnlike = 0
			})


		} 

	   
		this.state = {
			counter: 0, listData: listData1,
			showComment: false, ChooseId: 0, CommentSize: 0,
			Like: 0, DisLike: 0,
			userid: '',
			ConfirmCalled: false,
			AgreedConfirm :false,
            DeletePostId : ''
			
		};
	   
	}

	commentSizeIncrease = (index) => {

		//console.log('COMMENT FUNCTION CALLED FROM PARENT with index ', index)
		//console.log('COMMENT FUNCTION CALLED FROM PARENT', size) CommentSize
		
		const increaseCommentSize = this.state.listData[index].commentSize + 1
		//console.log('COMMENT SIZE AFTER UPDATE ', increaseCommentSize) 
		
		this.setState(prevState => {
			const newItems = [...prevState.listData];
			prevState.listData[index].commentSize = increaseCommentSize;
			return { listData: newItems };
		})

    }

	async SaveLike(data, index) {

		
		const token = await authService.getAccessToken();

		console.log('LLike Id is ', data)

		fetch('Post/AddUserLike', {
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
				var LikeOrUnlike = 0

				if (Response.like_count == 1) {
					like1 = 1;
					LikeOrUnlike = 1
				}
				if (Response.like_count == -1) {
					like1 = -1;
					LikeOrUnlike = 0
				}
				if (Response.disLike_count == 1) {
					dislike1 = 1;
					//LikeOrUnlike = -1
				}
				if (Response.disLike_count == -1) {
					dislike1 = -1;
					//LikeOrUnlike = 0;
				}


				let like2 = this.state.listData[index].like + like1
				let dislike2 = this.state.listData[index].dislike + dislike1




				this.setState(prevState => {
					const newItems = [...prevState.listData];
					prevState.listData[index].like = like2;
					prevState.listData[index].dislike = dislike2;
					prevState.listData[index].LikeOrUnlike = LikeOrUnlike;
					return { listData: newItems };
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
				var LikeOrUnlike = 0

				if (Response.like_count == 1) {
					like1 = 1;
					//LikeOrUnlike =  1
				}
				if (Response.like_count == -1) {
					like1 = -1;
					//LikeOrUnlike = 0
				}
				if (Response.disLike_count == 1) {
					dislike1 = 1;
					LikeOrUnlike = -1
				}
				if (Response.disLike_count == -1) {
					dislike1 = -1;
					LikeOrUnlike = 0;
				}
				

                let like2 = this.state.listData[index].like + like1
                let dislike2 = this.state.listData[index].dislike + dislike1

              


				this.setState(prevState => {
					const newItems = [...prevState.listData];
					prevState.listData[index].like= like2;
					prevState.listData[index].dislike = dislike2; 
					prevState.listData[index].LikeOrUnlike = LikeOrUnlike;
					return {listData: newItems};
				})

			})
			.catch((error) => {

			});


	}


	handleClickLike = (id, index) => {
		
		this.SaveLike(id, index)

	}

	handleClickDeletePost = async (id) => {

		console.log('DELETE BUTTON PRESSED ', id)
		this.setState({ConfirmCalled : true})
        this.setState({DeletePostId : id})
		

		
    }

	handleClickDislike = (id, index) => {
		
		
		this.SaveDisLike(id, index)

	}

	handleClickComment = (id) => {
		

		this.setState(prevState => ({
			showComment: !prevState.showComment
		}));

		this.setState(prevState => ({
			ChooseId: id
		}));

		

	}

	handleConfirmDeletePost = async() => {


	   console.log('Delete postid success ', this.state.DeletePostId)   
       this.setState({ConfirmCalled : false})


	const token = await authService.getAccessToken();

		if (token) {


			fetch('Post/DeleteUserPost', {
				method: 'DELETE', // or 'PUT'
				headers: !token ? {} : {
					'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
				},

				body: JSON.stringify({

					'PostId': this.state.DeletePostId,

				}),
			})
				.then(response => response.json())
				.then(Response => {

					console.log({ Response })
					console.log('message ', Response.message) 
					console.log('status code  ', Response.statusCode)
					var statusCode = Response.statusCode ? Response.statusCode : 400; 
					if (statusCode == 200) {

						this.setState({
							listData: this.state.listData.filter(item => item.id !== this.state.DeletePostId)
						});

					    
                    }

					this.setState({ DeletePostId : '' })

				})
				.catch((error) => {

				});


		} 


    }


	render() {

		
	
		const { listData } = this.state
		console.log('USER', this.props.username)
		
		return (
			<>
				{this.state.ConfirmCalled == true ?
					<ConfirmDialogDemo
						message="Do you want to delete this post ?"
						confirm={1}
						handleConfirmDeletePost={() => this.handleConfirmDeletePost()}
					/>

					: null}
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

					<div className="container">
					<Paper elevation={3} style={{ backgroundColor: '#eceff1', width:'100%' }} >

					<List.Item					
				    style={{marginTop:'20px'}}
					key={item.id}
						actions={[
							
																					
					]}
		
					>
										
								<div className="row" style={{width:'100%'}}>

						          <div  className="d-flex justify-content-center align-self-center col-11">
								
										<Avatar src={item.avatar} style={{ marginRight: '10px' }} />
										<div>
											<Typography variant="h5" style={{ color: '#006064' }} >
												{item.title}
											</Typography>

											<Typography align='center' style={{textAlign:'center', color:'black'}} variant="body" style={{ color: '#006064' }} >
												{moment(item.dateTime).fromNow()}
											</Typography>
										</div>									
									</div>

									

									{this.props.userid == item.clientId ?
										<div className="col-1">
											<HoverText>
												<DeleteIcon style={{marginRight:'5px', textAlign: 'center', color: 'red' }}
												onClick={() => this.handleClickDeletePost(item.id)} />
											</HoverText>
										</div>
										: null
									}

							
									
					            </div>

							
										
					   
						<div style={{marginTop:'15px', marginBottom:'10px'}} className="container d-flex justify-content-center" dangerouslySetInnerHTML={{ __html: item.content }} />
						<div className="row d-flex justify-content-center align-self-center" style={{width:'100%'}}>
							{
								this.state.showComment && this.state.ChooseId == item.id ? <div className="container">
									<Commentbox commentSizeIncrease={() => this.commentSizeIncrease(index)}
										postid={item.id} comments={item.comments} username={this.props.username} />

								</div> : null
							}	
						</div>



						
						<div className="row d-flex justify-content-around" style={{ width: '100%', marginTop: '20px', marginBottom: '20px'  }}>

							<HoverText style={{ fontSize: '20px' }} onClick={() => this.handleClickLike(item.id, index)} >
								<IconText icon={item.LikeOrUnlike == 1 ? LikeFilled : LikeTwoTone} text={item.like} key="list-vertical-star-o" />
							</HoverText>
							<HoverText style={{ fontSize: '20px' }} onClick={() => this.handleClickDislike(item.id, index)} >
								<IconText icon={item.LikeOrUnlike == -1 ? DislikeFilled : DislikeTwoTone} text={item.dislike} key="list-vertical-like-o" />
							</HoverText>
							<HoverText style={{ fontSize: '20px' }} onClick={() => this.handleClickComment(item.id)} >
								<IconText icon={MessageTwoTone} text={item.comments ? item.commentSize : 0} key="list-vertical-message" />
							</HoverText>
							</div>
						

					</List.Item>

						</Paper>
				   </div>

	)}
				/>

 </>
	);
  }
}


//MessageTwoTone



