import React, { useState, useEffect } from 'react';
import prettyBytes from 'pretty-bytes';

import { useContext } from "react";
import AppContext from "../AppContext";
import ResponseTabs from './Response/ResponseTabs';



const Response = () => {
    const { state, dispatch } = useContext(AppContext)
    const [doc, setDoc] = useState('{}');

    useEffect(() => {
        if (state.response === null) return;
        const jsonResponse = JSON.stringify(state.response.data, null, 2);
        setDoc(jsonResponse);
    }, [state.response, state.loading]);

    const hasResponse = !(state.response == null);

    let time = '';
    let status = '';
    let size = '';

    if (hasResponse) {
        const hasCustomData = 'customData' in state.response;
        const hasData = 'data' in state.response;
        const hasHeaders = 'headers' in state.response;

        status = hasResponse ? state.response.status : 0;

        if (hasData && hasHeaders) {
            size = prettyBytes(
                (hasResponse ? JSON.stringify(state.response.data).length : 0) +
                (hasResponse ? JSON.stringify(state.response.headers).length : 0)
            );
        }

        if (hasCustomData) {
            time = state.response.customData.time;
        }
    }
    const RenderedResponseMeta = () => {
        return (
            <div className="response-status">
                <span className='w-28'>Status: {status}</span>
                <span className='w-24'>Time: {time}</span>
                <span className='w-24'>Size: {size}</span>
            </div>
        );
    };

    return (
        <div>
            <ResponseTabs
                doc={doc}
                setDoc={setDoc}
                response={state.response}
                loading={state.loading}
            />
            {state.response ? (<RenderedResponseMeta />) : null}
        </div>
    );
}

export default Response;
