import React, { useState, useRef, useEffect } from 'react';
import { MdMenu, MdSearch, MdRefresh, MdViewAgenda, MdViewModule, MdSettings, MdAccountCircle } from 'react-icons/md';

interface HeaderProps {
    toggleSidebar: () => void;
    toggleView: () => void;
    isGridView: boolean;
    toggleDarkMode?: () => void;
    onNavigate?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleView, isGridView, toggleDarkMode, onNavigate }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };

        if (isSettingsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSettingsOpen]);

    return (
        <header style={styles.header}>
            <div style={styles.leftSection}>
                <button style={styles.iconButton} onClick={toggleSidebar}>
                    <MdMenu size={24} />
                </button>
                <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" alt="Keep" style={styles.logo} />
                <span style={styles.title}>Keep</span>
            </div>

            <div style={styles.searchSection}>
                <div style={styles.searchBar}>
                    <button style={styles.iconButton}>
                        <MdSearch size={24} />
                    </button>
                    <input type="text" placeholder="Search" style={styles.input} />
                </div>
            </div>

            <div style={styles.rightSection}>
                <div style={{ padding: '4px 8px', backgroundColor: '#e8eaed', borderRadius: '4px', fontSize: '12px', marginRight: '8px', color: '#5f6368' }}>
                    Offline Mode
                </div>
                <button style={styles.iconButton} onClick={() => window.location.reload()}>
                    <MdRefresh size={24} />
                </button>
                <button style={styles.iconButton} onClick={toggleView}>
                    {isGridView ? <MdViewAgenda size={24} /> : <MdViewModule size={24} />}
                </button>
                <div style={{ position: 'relative' }} ref={settingsRef}>
                    <button
                        style={styles.iconButton}
                        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                        title="Settings"
                    >
                        <MdSettings size={24} />
                    </button>
                    {isSettingsOpen && (
                        <div style={styles.dropdown}>
                            <div style={styles.dropdownItem} onClick={() => { toggleDarkMode && toggleDarkMode(); setIsSettingsOpen(false); }}>
                                <span>Dark mode</span>
                            </div>
                        </div>
                    )}
                </div>
                <button style={styles.iconButton}>
                    <MdAccountCircle size={30} />
                </button>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-color)',
        position: 'sticky' as 'sticky',
        top: 0,
        zIndex: 100,
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '230px',
    },
    logo: {
        height: '40px',
        width: '40px',
        margin: '0 8px',
    },
    title: {
        fontSize: '22px',
        color: 'var(--text-color)',
        paddingLeft: '4px',
    },
    searchSection: {
        flex: 1,
        maxWidth: '720px',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--sidebar-hover)',
        borderRadius: '8px',
        padding: '0px 10px',
        height: '48px',
        maxWidth: '100%',
    },
    input: {
        border: 'none',
        backgroundColor: 'transparent',
        flex: 1,
        height: '100%',
        padding: '0 10px',
        fontSize: '16px',
        outline: 'none',
        color: 'var(--text-color)',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        paddingRight: '10px'
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '12px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--icon-color)',
        outline: 'none',
    },
    dropdown: {
        position: 'absolute' as 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'var(--bg-color)',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.30), 0 2px 6px 2px rgba(0,0,0,0.15)',
        borderRadius: '4px',
        padding: '6px 0',
        minWidth: '200px',
        zIndex: 1000,
        border: '1px solid var(--border-color)',
    },
    dropdownItem: {
        padding: '8px 16px',
        fontSize: '14px',
        color: 'var(--text-color)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    }
};

export default Header;
