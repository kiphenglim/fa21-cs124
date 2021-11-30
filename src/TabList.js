import {useState} from 'react';
import Tab from './Tab.js';

function TabList(props) {

    const [activeTab, setActiveTab] = useState('owned');

    return (
        <div className={'Tabs'}>
            {/*<h1*/}
            {/*  aria-label={"Lab 5"}*/}
            {/*  className={"ListMenuTitle"}*/}
            {/*>*/}
            {/*  Lab 5*/}
            {/*</h1>*/}
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

            {props.children.map((item) => item.key === activeTab && item)}
        </div>
    )

}

export default TabList;
