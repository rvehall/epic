import { useContext, useEffect } from "react";

import AppContext from "../AppContext";
import * as React from 'react';

export default function Histroy(props) {
    const { state, dispatch, db } = useContext(AppContext);

    useEffect(() => {
      const fetchHistory = async () => {
        let list = [];        

        const data = await db.allDocs({ include_docs: true });
        data.rows.forEach(row => {
            list.push(row.doc);
        });

        dispatch({ type: 'setHistory', payload: list })
      }

      fetchHistory();
    }, [])
    return (<>
        <h1>History</h1>
        {state.history.length > 0 && state.history.map(item => {
            return (
                <div key={item.url} className="parent">
                    <div className="method left">{item.method} </div>
                    <div className="url right">{item.url}</div>
                </div>
                )
        })}
    </>);
}