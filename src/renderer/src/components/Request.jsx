import { useContext } from "react";
import axios from 'axios';

import AppContext from "../AppContext";
import { convertKeyValueToObject } from '../utils/helpers';

import UrlEditor from './Request/UrlEditor';
import RequestTabs from "./Request/RequestTabs";

export default function Request() {
    const { state, dispatch } = useContext(AppContext)

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
            const response = await axios({
                url: state.url,
                method: state.reqMethod,
                params: convertKeyValueToObject(state.queryParams),
                headers: convertKeyValueToObject(state.headers),
                data,
            });
            dispatch({ type: "setResponse", payload: response });
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