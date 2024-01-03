import { useContext } from "react";
import axios from 'axios';

import AppContext from "../AppContext";
import { convertKeyValueToObject, deepEqual } from '../utils/helpers';

import UrlEditor from './Request/UrlEditor';
import RequestTabs from "./Request/RequestTabs";

export default function Request() {
    const { state, dispatch, db } = useContext(AppContext);

    const handleSubmit = async (e) => {
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
            const convertedHeaders = convertKeyValueToObject(state.headers);

            const options = {
                url: state.url,
                method: state.reqMethod,
                params: convertKeyValueToObject(state.queryParams),
                headers: {
                    ...convertedHeaders,
                    "Cache-Control": "no-cache",
                },
                data,
            };

            const response = await axios(options);

            dispatch({ type: "setResponse", payload: response });
            const item = state.history.filter(item => item.url === state.url && item.method === state.reqMethod);
            const stateful = { url: state.url, method: state.reqMethod, params: state.requestParams, headers: state.headers, body: state.body };
            const isEqual = deepEqual(item, stateful);
            
            if(isEqual){
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
                onInputSend={handleSubmit}
            />
            <RequestTabs
                queryParams={state.queryParams}
                setQueryParams={(e) => setQueryParams(e)}
                headers={state.headers}
                setHeaders={(e) => setHeaders(e)}
                body={state.body}
                setBody={setBody}
            />
        </>
    )
}