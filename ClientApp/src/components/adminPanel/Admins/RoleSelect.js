import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';



export default function RoleSelect(props) {
    
    const [data, setData] = React.useState('');

    const handleChange = (event) => {
        setData(event.target.value);
        props.handleRole(event.target.value)

    };

    return (
        <>    
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data}
                    onChange={handleChange}
                >
                    <MenuItem value='Admin'>Admin</MenuItem>
                    <MenuItem value='Manager'>Manager</MenuItem>
                </Select>
        </>
    );
}
