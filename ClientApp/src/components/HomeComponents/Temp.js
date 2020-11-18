import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import axios from 'axios';
import authService from '../api-authorization/AuthorizeService';


export class Temp extends Component {

      componentDidMount() {
        this.populateWeatherData();
        
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <h1>Data Panel</h1>
                </Row>
                <Row>
                    

                   
                </Row>
            </Fragment>
        );
    }

    async populateWeatherData() {

         const token = await authService.getAccessToken();
         console.log(token);
      //  const Name = { Name: 'example data from Client Request' };
       // const data1 = new FormData(data);  
        // Simple POST request with a JSON body using axios

      /*  const article = { title: 'React POST Request Example' };
        axios.post('ShowData/DataReceived', article)
            .then(response => console.log(response)); */

         fetch('ShowData/DataReceived', {
             method: 'POST', // or 'PUT'
              
             headers: !token ? {} : {
                 'Content-Type': 'application/json; charset=utf-8','Authorization': `Bearer ${token}`
            },
             body: JSON.stringify({ name:"Hi Client Side" }),
         })
             .then(response => response.json())
             .then(data => {
                 console.log('Success:', data);
             })
             .catch((error) => {
                 console.error('Error:', error);
             });
      /*  var data = "Tanshen";

        console.log("Token Found " + token);
        console.log("My name ===== " + data);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json;charset=utf-8' },
             
        };

         fetch('ShowData/DataReceived', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
            */
    }
}

