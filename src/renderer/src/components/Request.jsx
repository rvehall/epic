import { useContext } from "react";
import axios from 'axios';

import AppContext from "../AppContext";
import { convertKeyValueToObject } from '../utils/helpers';

import UrlEditor from './Request/UrlEditor';
import RequestTabs from "./Request/RequestTabs";

export default function Request() {
    const { state, dispatch, db } = useContext(AppContext);

    const handleOnInputSend = async (e) => {
        dispatch({ type: "setLoading", payload: true });
        e.preventDefault();
        const requestBody = state.body.toString();

        let data;
        try {
            data = JSON.parse(requestBody);
        } catch (e) {
            alert('Something is wrong with the JSON data.');
        }

        try {
            const options = {
                url: state.url,
                method: state.reqMethod,
                params: convertKeyValueToObject(state.queryParams),
                headers: convertKeyValueToObject(state.headers),
                data,
            };

            const response = await axios(options);

            dispatch({ type: "setResponse", payload: response });
            const item = state.history.filter(item => item.url === state.url && item.method === state.reqMethod);
            console.log("item", item);
            if(item.length == 0){
                dispatch({ type: "addToHistory", payload: options});
                db.post(options);
            }
        } catch (e) {
            dispatch({ type: "setResponse", payload: e });
        }


        dispatch({ type: "setLoading", payload: false });
    }

    const setUrl = (url) => { dispatch({ type: "setUrl", payload: url }); };
    const setReqMethod = (reqMethod) => {
        dispatch({ type: "setRequest", payload: reqMethod });
    };
    const setQueryParams = (queryParams) => { 
        dispatch({ type: "setQueryParams", payload: queryParams });
    };

    const setHeaders = (headers) => { 
        dispatch({ type: "setHeaders", payload: headers});
    };

    const setBody = (body) => { 
        dispatch({ type: "setBody", payload: body});
    };

    return (
        <>
            <UrlEditor
                url={state.url}
                setUrl={setUrl}
                reqMethod={state.reqMethod}
                setReqMethod={setReqMethod}
                onInputSend={handleOnInputSend}
            />
            <RequestTabs
                queryParams={state.queryParams}
                setQueryParams={(e) => setQueryParams(e)}
                headers={state.headers}
                setHeaders={(e) => setHeaders(e)}
                body={'{\n\t\n}'}
                setBody={setBody}
            />
        </>
    )
}