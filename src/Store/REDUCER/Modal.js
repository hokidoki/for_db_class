const MODAL_OPEN = "MODAL_OPEN";
const MODAL_CLOSE = "MODAL_CLOSE";
const MESSAGE_MODAL_OPEN = "MESSAGE_MODAL_OPEN";
const GROUP_MESSAGE_MODAL_OPEN = "GROUP_MESSAGE_MODAL_OPEN";


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

export function messageModalOpen(who){
    return {
        type : MESSAGE_MODAL_OPEN,
        who : who
    }
}

export function groupMessageModalOpen(where){
    return {
        type : GROUP_MESSAGE_MODAL_OPEN,
        where : where
    }
}

const initialState = {
    modalIsOpen : false
}

export default function modalReducer(state = initialState, action){
    switch(action.type){
        case MODAL_OPEN : 
            return {
                mode : "createGroup",
                modalIsOpen : true,
            }
        case MODAL_CLOSE :
            return {
                modalIsOpen : false
            }
        case MESSAGE_MODAL_OPEN : 
            return {
                mode : "message",
                who : action.who,
                modalIsOpen : true,
            }
        case GROUP_MESSAGE_MODAL_OPEN : 
            return {
                mode : "group_message",
                where : action.where,
                modalIsOpen : true,
            }
        default : 
            return state
    }
}