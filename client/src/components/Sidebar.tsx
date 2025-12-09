import React from 'react';
import { MdLightbulbOutline, MdNotificationsNone, MdEdit, MdArchive, MdDelete } from 'react-icons/md';

interface SidebarProps {
    isOpen: boolean;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
    const menuItems = [
        { name: 'Notes', icon: <MdLightbulbOutline size={24} />, id: 'notes' },
        { name: 'Reminders', icon: <MdNotificationsNone size={24} />, id: 'reminders' },
        { name: 'Edit labels', icon: <MdEdit size={24} />, id: 'labels' },
        { name: 'Archive', icon: <MdArchive size={24} />, id: 'archive' },
        { name: 'Trash', icon: <MdDelete size={24} />, id: 'trash' },
    ];

    return (
        <aside style={{
            ...styles.sidebar,
            width: isOpen ? '280px' : '80px',
        }}>
            {menuItems.map((item) => (
                <div
                    key={item.id}
                    style={{
                        ...styles.menuItem,
                        backgroundColor: activeTab === item.id ? 'var(--sidebar-active)' : 'transparent',
                        borderRadius: isOpen ? '0 25px 25px 0' : '50%',
                        width: isOpen ? '100%' : '48px',
                        justifyContent: isOpen ? 'flex-start' : 'center',
                        paddingLeft: isOpen ? '24px' : '0',
                        marginLeft: isOpen ? '0' : '16px',
                    }}
                    onClick={() => setActiveTab(item.id)}
                    onMouseEnter={(e) => {
                        if (activeTab !== item.id) e.currentTarget.style.backgroundColor = 'var(--sidebar-hover)';
                    }}
                    onMouseLeave={(e) => {
                        if (activeTab !== item.id) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <span style={styles.icon}>{item.icon}</span>
                    {isOpen && <span style={styles.label}>{item.name}</span>}
                </div>
            ))}
        </aside>
    );
};

const styles = {
    sidebar: {
        paddingTop: '8px',
        height: 'calc(100vh - 64px)',
        transition: 'width 0.2s',
        display: 'flex',
        flexDirection: 'column' as 'column',
        overflowX: 'hidden' as 'hidden',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        height: '48px',
        cursor: 'pointer',
        marginBottom: '2px',
        transition: 'background-color 0.2s, width 0.2s, border-radius 0.2s',
    },
    icon: {
        color: 'var(--text-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        marginLeft: '20px',
        fontSize: '14px',
        fontWeight: 500,
        color: 'var(--text-color)',
        whiteSpace: 'nowrap' as 'nowrap',
    }
};

export default Sidebar;
