const initialState = {
    value: 0,
};

const FirstState = {
    valueMen:[]
};


const Menitem = {
    Root: [],
    Img: [
        {
            thumbUrl:""
        },
        {
            thumbUrl: ""
        },
        {
            thumbUrl: ""
        },
        {
            thumbUrl: ""
        },
        {
            thumbUrl: ""
        }

    ]

};

export default function Formdata(state = Menitem, action) {
    switch (action.type) {
        case 'ROOT':
           // return { ...state, Menitem: action.Payload };
            return {
                ...state, Root: action.Payload
                
            };

        case 'IMAGE':
            // return { ...state, Menitem: action.Payload };
            return {
                ...state, Img: action.Payload

            };

        case 'DECREMENT':
            return { ...state, value: state.value - 1 };
        default:
            return state;
    }
}

