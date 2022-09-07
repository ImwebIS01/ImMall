import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export function DataStore(props) {
    const [siteData, setSiteData] = useState([]);
    const [siteCode, setSiteCode] = useState('');
    const [domainName, setDomainName] = useState('');
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    return (
        <DataContext.Provider value={{
            siteData,
            setSiteData,
            siteCode,
            setSiteCode,
            domainName,
            setDomainName,
            currentPath,
            setCurrentPath,
        }}>
            { props.children }
        </DataContext.Provider>
    );
}
