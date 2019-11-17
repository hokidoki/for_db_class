const MODAL_OPEN = "MODAL_OPEN";
const MODAL_CLOSE = "MODAL_CLOSE";

export function modal_open(){
    return {
        type : MODAL_OPEN
    }
}

export function modal_close(){
    return {
        type : MODAL_CLOSE
    }
}

const initialState = {
    modalIsOpen : false
}

export default function modalReducer(state = initialState, action){
    switch(action.type){
        case MODAL_OPEN : 
            return {
                modalIsOpen : true,
            }
        case MODAL_CLOSE :
            return {
                modalIsOpen : false
            }

        default : 
            return state
    }
}