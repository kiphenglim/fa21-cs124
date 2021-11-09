import {useState} from 'react';
import Tab from './Tab.js';

function TabList(props) {

    const [activeTab, setActiveTab] = useState('owned');

    return (
        <div className={'Tabs'}>
            <ol className={'TabList'}>
                <Tab 
                    name={'owned'}
                    label={'My Lists'}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <Tab
                    name={'shared'}
                    label={'Shared With Me'}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </ol>

            {props.children.map((item) => item.key == activeTab && item)}
        </div>
    ) 
    
}

export default TabList;