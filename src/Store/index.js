//라이브러리
import thunk from 'redux-thunk';
import { createStore, combineReducers,applyMiddleware,compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
//리듀서
import USER from './REDUCER/USER/REDUCER';

export function configureStore(history){
    const middleware = applyMiddleware(thunk,routerMiddleware(history));

    const composed = window.__REDUX_DEVTOOLS_EXTENSION__?
    compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
    ):
    middleware;
    
    return createStore(
        combineReducers({ 
            USER,
            router : connectRouter(history)
        }),
        composed
    )
}