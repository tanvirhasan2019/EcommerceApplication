import React, { Component, Fragment } from 'react';
import { Autocomplete, TextInput } from 'evergreen-ui'

export class Searchitem extends Component {
    render() {
        return(
            <Fragment>
                <Autocomplete
                    title="PRODUCTS NAME"
                    onChange={(changedItem) => console.log(changedItem)}
                    items={['Apple', 'Macbook Air', 'Macbook pro', 'Germents', 'Samsung','Ornaments','Orange','Drinks']}
                >
                    {(props) => {
                        const { getInputProps, getRef, inputValue } = props
                        return (
                            <TextInput
                                placeholder="SEARCH ITEM HERE"
                                value={inputValue}
                                ref={getRef}
                                {...getInputProps()}
                            />
                        )
                    }}
                </Autocomplete>

            </Fragment>
        );
    }
}
export default Searchitem;



