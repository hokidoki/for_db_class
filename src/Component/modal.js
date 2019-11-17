import ReactDom from 'react-dom';

const ModalPotal = ({children}) =>{
    const el = document.getElementById('modal');
    return ReactDom.createPortal(children,el)
}

export default ModalPotal;