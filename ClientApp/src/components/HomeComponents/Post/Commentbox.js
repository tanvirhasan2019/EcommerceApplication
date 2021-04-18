import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import authService from '../../api-authorization/AuthorizeService'

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

export default class Commentbox extends Component {

    constructor(props) {
        super(props);

        const comments = [];
        if (this.props.comments) {


            this.props.comments.map(item => {

                var time = item.dateTime;

                comments.push(
                                      
                        {
                            author: 'Han Solo',
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            content: <p>{item.commentContent}</p>,
                            datetime: time,
                        }
                   
                )

            })
        }


        //this.state = { people };
        // Don't do this!
        this.state = {
            comments: comments,
            submitting: false,
            value: '',
        };
    }

  /* state = {
    comments: [],
    submitting: false,
    value: '',
  }; */

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                ],
            }, () => { this.SaveComment(this.state.comments) } )
        }, 1000);

       
    };

    async SaveComment(data) {

        var index = data.length - 1;
        console.log('COMMENTS last one', data[index]);
        console.log('POST ID', this.props.postid);
        console.log('content', data[index].content.props.children);
        const token = await authService.getAccessToken();

        fetch('Post/AddComment', {
           method: 'POST', // or 'PUT'
           headers: !token ? {} : {
               'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
           },

           body: JSON.stringify({

               'PostId': this.props.postid,
               'CommentContent': data[index].content.props.children

           }),
       })
           .then(response => response.json())
           .then(Response => {
               // this.setState({ value:null })


           })
           .catch((error) => {

           });
           

    }
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
    };

   

    componentDidMount() {


      /*  if (this.props.comments) {
           
          
            this.props.comments.map(item => {
               
                var time = item.dateTime;
               
            this.setState({
                comments: [
                    ...this.state.comments,
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{item.commentContent}</p>,
                        datetime: time,
                    }
                ],
            })

            })
        }*/

       
    }



  render() {
    const { comments, submitting, value } = this.state;
     // console.log('All Loaded comments', this.props.comments)
   

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

