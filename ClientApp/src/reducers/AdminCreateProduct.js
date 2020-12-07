const initialState = {
    value: 0,
};

const ImgInitial= [
    {
        originFileObj:''
    }
    ,
    {
        originFileObj: ''
    }
    ,
    {
        originFileObj: ''
    }
    ,
    {
        originFileObj: ''
    },
    {
        originFileObj: ''
    }
]

const Menitem = {
    Root: [],
    Img: [
        {
            originFileObj: ''
        }
        ,
        {
            originFileObj: ''
        }
        ,
        {
            originFileObj: ''
        }
        ,
        {
            originFileObj: ''
        },
        {
            originFileObj: ''
        }
    ]

};

export default function AdminCreateProduct(state = Menitem, action) {
    switch (action.type) {
        case 'ROOT':
           // return { ...state, Menitem: action.Payload };
            return {
                ...state, Root: action.Payload
                
            };

        case 'IMAGE':
            // return { ...state, Menitem: action.Payload };
            return {
                //...state, Img:action.Payload
                ...state, Img: Object.assign({}, ImgInitial, action.Payload)

            };

        case 'DECREMENT':
            return { ...state, value: state.value - 1 };
        default:
            return state;
    }
}

