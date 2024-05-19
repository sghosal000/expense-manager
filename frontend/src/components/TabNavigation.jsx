import React, { useState, useEffect, useRef } from 'react'
import { useData } from '../contexts/DataContext';

export default function TabNavigation({ tabs }) {
    const { activeTab, setActiveTab } = useData()
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])

    return (
        <>
            {/* Navbar for large screens */}
            <nav className="sticky top-16 mt-16 bg-base/70 backdrop-blur-sm w-2/3 highlight-white rounded-full px-2 z-10 hidden lg:block">
                <ul className="flex my-auto justify-between text-lg text-center">
                    {tabs.map((tab) => (
                        <li
                            key={tab.name}
                            className={`w-1/6 my-1 py-2 content-center cursor-pointer transition-all
                                ${activeTab === tab.name ? "rounded-full font-bold text-lg shadow-lg bg-neutral border-t border-slate-600 text-sky-300" : "hover:text-txt-depressed"}
                                ${tab.name !== tabs[0].name && tab.name !== tabs[tabs.length - 1].name ? "border-x border-neutral" : ""} `}
                            onClick={() => setActiveTab(tab.name)}
                        >
                            {tab.name}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Dropdown selector for small screens */}
            <div ref={dropdownRef} className="lg:hidden sticky top-16 mt-16 bg-base/70 backdrop-blur-sm w-2/3 highlight-white rounded-full shadow-xl px-4 z-10">
                <div className="flex flex-col my-auto text-sm text-center">
                    <span className="my-1 py-1 px-4 cursor-pointer" onClick={toggleDropdown}>
                        {activeTab}
                    </span>
                    {isDropdownOpen && (
                        <ul className="absolute top-full left-0 mt-1 w-full bg-base border-b border-neutral rounded-xl shadow-lg transition-all">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.name}
                                    className={`py-2 border-t border-neutral cursor-pointer ${activeTab === tab.name ? "font-bold text-sky-300" : ''}`}
                                    onClick={() => {
                                        setActiveTab(tab.name);
                                        toggleDropdown();
                                    }}
                                >
                                    {tab.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}
