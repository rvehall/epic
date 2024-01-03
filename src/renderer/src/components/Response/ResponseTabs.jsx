import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ThreeDots } from 'react-loader-spinner';

import JsonEditorPane from '../Request/JsonEditorPane';
import ResponseHeaderPane from './ResponseHeader';

const ResponseTabs = ({ doc, setDoc, response, loading }) => {
  const responseTabs = [
    {
      slug: 'response-body',
      title: 'Response Body'
    },
    {
      slug: 'response-header',
      title: 'Response Header'
    }
  ]
  
  return (
    <>
      {loading ? (
        <ThreeDots
          height="30"
          width="30"
          color="gray"
          visible={true}
        />
      ) : (<>
        <Tabs forceRenderTabPanel selectedTabClassName="selected-tab" className="tabs">
          <TabList className="tab-list">
            {responseTabs.map((tab) => (
              <Tab
                className="tab"
                key={tab.slug}>
                {tab.title}
              </Tab>
            ))}
          </TabList>

          <div className="tab-panel">
            <TabPanel>
              <JsonEditorPane
                paneValue={doc}
                setPaneValue={setDoc}
                isEditable={false}
              />
            </TabPanel>
            <TabPanel >
              <ResponseHeaderPane response={response} />
            </TabPanel>
          </div>
        </Tabs>
      </>)}
    </>
  );
}

export default ResponseTabs;