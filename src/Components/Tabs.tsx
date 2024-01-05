import { ReactElement, useState } from 'react';
import {
    Tabs as ChakraTabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Center,
    SystemStyleObject,
} from '@chakra-ui/react';


/**
 * Properties for the Tabs component.
 */
type TabProps = {
    /**
     * An array of Tab objects to render.
     */
    tabs: Tab[];

    /**
     * If true, centers the tabs. Defaults to false.
     */
    centerTabs?: boolean;

    /**
     * The index of the tab to be selected by default.
     */
    defaultIndex?: number;

    /**
     * Callback function called with the index of the new active tab when the active tab changes.
     * @param index - Index of the new active tab.
     */
    onChange?: (index: number) => void;

    /**
     * Custom styles to apply to the tab list.
     */
    tabListStyles?: SystemStyleObject;
};

/**
 * Defines the structure of each tab.
 */
type Tab = {
    /**
     * The title of the tab.
     */
    title: string;

    /**
     * The content to be displayed when the tab is active. Can be a single JSX element or an array of elements.
     */
    children: JSX.Element[] | JSX.Element;
};

/**
 * Tabs component used to organize content into separate views where only one view can be visible at a time.
 * Each tab has its own content that is displayed when the tab is active. 
 *  
 * @param props - Properties of the Tabs component.
 * @returns A React element representing the Tabs component.
 */
export function Tabs(props: TabProps): ReactElement {
    const { tabs, centerTabs, defaultIndex, onChange, tabListStyles } = props;

    const [activeTab, setActiveTab] = useState(defaultIndex || 0);

    function onTabChange(index: number) {
        setActiveTab(index);
        if (onChange) {
            onChange(index);
        }
    }
    return (
        <ChakraTabs
            defaultIndex={activeTab}
            onChange={(index) => onTabChange(index)}
        >
            {centerTabs ? (
                <Center>
                    <TabList sx={tabListStyles}>
                        {tabs.map((tab, index) => {
                            return <Tab key={`tl${index}`}>{tab.title}</Tab>;
                        })}
                    </TabList>
                </Center>
            ) : (
                <TabList sx={tabListStyles}>
                    {tabs.map((tab, index) => {
                        return <Tab key={`tl${index}`}>{tab.title}</Tab>;
                    })}
                </TabList>
            )}
            <TabPanels>
                {tabs.map((tab, index) => {
                    return (
                        <TabPanel key={`tp${index}`}>{tab.children}</TabPanel>
                    );
                })}
            </TabPanels>
        </ChakraTabs>
    );
}
