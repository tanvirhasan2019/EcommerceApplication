import  React  from 'react';
import axios from "axios";
import { toaster } from 'evergreen-ui'
import authService from '../../api-authorization/AuthorizeService';

const ClickBefore = {
    width: '100%',
    height: '40px',
    borderRadius: '25px'
};
const ClickAfter = {
    width: '100%',
    height: '400px',
    borderRadius: '0px'
};


class EditPost extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            value: '',
            design: ClickBefore,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextAreaClick = this.handleTextAreaClick.bind(this);
    }

    handleTextAreaClick(event) {
        this.setState({ design: ClickAfter });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {

        this.populateWeatherData();
       
    }

    async populateWeatherData() {
        const token = await authService.getAccessToken();
        console.log("Token Data here : " + token);

        fetch('Blog/PostData', {
            method: 'POST', // or 'PUT'
            headers: !token ? {} : {
                'Content-Type': 'application/json; charset=utf-8', 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ post: this.state.value }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);

                toaster.success(

                    'Data Saved Successfully',
                    {
                        duration: 5
                    }
                )
            })
            .catch((error) => {
                toaster.danger(
                    'Something Went Wrong !',
                    {
                        duration: 5
                    }
                )
                console.error('Error:', error);
            });


        // alert('A name was submitted: ' + this.state.value);
        console.log("POST : " + this.state.value);
        // event.preventDefault();

    }
    
    render() {

        return (

            <div className="flex-direction:row" style={{ width: '100%' }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row" style={{ width: '100%' }}>
                        <div className="form-group" style={{ width: '100%' }}>

                            <textarea onChange={this.handleChange} placeholder="WRITE SOMETHING HERE..." className="form-control" id="exampleFormControlTextarea1"

                                style={{
                                    width: '100%',
                                    height: '200px',
                                    borderRadius: '10px'
                                }}>
                            </textarea>
                        </div>


                    </div>

                    <div className="row" style={{ marginLeft: '5px' }}>
                        <button type="submit" className="btn btn-primary" style={{ marginRight: '5px' }}>POST</button>
                        <button type="submit" className="btn btn-primary">Cancel</button>
                    </div>

                </form>
            </div>
        )
    }

}

export default EditPost; 