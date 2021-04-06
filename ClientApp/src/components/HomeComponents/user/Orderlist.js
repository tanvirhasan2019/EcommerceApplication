import React, { useState, useEffect } from 'react';
import authService from '../../api-authorization/AuthorizeService'

export default function Orderlist() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(async () => {
        const token = await authService.getAccessToken()
        console.log('token', token)
        if (token) {

            const token = await authService.getAccessToken()
            const response = await fetch('ClientOrder/Getuserorder', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setData(data)
            setLoading(false)
            
            console.log('after fetch ', { data })
        }
    }, []);

   
    return (
        <div>
            jzhbscb
        </div>
    );
}

