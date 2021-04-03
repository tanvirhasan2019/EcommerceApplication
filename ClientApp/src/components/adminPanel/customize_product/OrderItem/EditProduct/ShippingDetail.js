import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    country: "",
    phonenumber: ""

});

function ShippingDetail(props) {

    const [formData, updateFormData] = React.useState(initialFormData);
   // const dispatch = useDispatch();
   // dispatch(ShippingData_Add(formData))
  
    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });

       // dispatch(ShippingData_Add(formData))
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleChange}
                        defaultValue={props.value.firstname}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        onChange={handleChange}
                        defaultValue={props.value.lastname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        onChange={handleChange}
                        defaultValue={props.value.address1}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        onChange={handleChange}
                        defaultValue={props.value.address2}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        onChange={handleChange}
                        defaultValue={props.value.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="phonenumber"
                        defaultValue={props.value.phonenumber}
                        name="phonenumber" label="Contact/phonenumber"
                        fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        onChange={handleChange}
                        defaultValue={props.value.zip}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        onChange={handleChange}
                        defaultValue={props.value.country}
                    />
                </Grid>
                
            </Grid>
        </React.Fragment>
    );
}

export default ShippingDetail;