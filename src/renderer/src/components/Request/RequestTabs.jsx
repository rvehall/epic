import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import KeyValuePane from "./KeyValuePane";
import JsonEditorPane from "./JsonEditorPane";

const RequestTabs = ({
    queryParams,
    setQueryParams,
    headers,
    setHeaders,
    body,
    setBody
}) => {
    const requestTabs = [
        {
            slug: 'query-params',
            title: 'Query Params',
            panel: KeyValuePane,
            paneValue: queryParams,
            setPaneValue: setQueryParams,
        },
        {
            slug: 'headers',
            title: 'Headers',
            panel: KeyValuePane,
            paneValue: headers,
            setPaneValue: setHeaders,
        },
        {
            slug: 'body',
            title: 'Body',
            panel: JsonEditorPane,
            paneValue: body,
            setPaneValue: setBody,
        },
    ];
    
    return (
        <Tabs forceRenderTabPanel selectedTabClassName="selected-tab" className="tabs">
            <TabList className="tab-list">
                {requestTabs.map((tab) => (
                    <Tab key={tab.slug} className="tab">{tab.title}</Tab>
                ))}
            </TabList>
            <div className="tab-panel">
            {requestTabs.map((tab) => (
                <TabPanel key={tab.slug}>
                    <tab.panel
                        paneValue={tab.paneValue}
                        setPaneValue={tab.setPaneValue}
                    />
                </TabPanel>
            ))}
            </div>
        </Tabs>
    )
}

export default RequestTabs;