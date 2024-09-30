import React, { useMemo } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

type LinkType = {
    id: number,
    text: string,
    url?: string,
    handleClick?: () => void
}

export default function AuthButtonMobile({ avatar, session, onLogOut }: { avatar: string, session: any, onLogOut: () => void }): JSX.Element {
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const drawerLinks: LinkType[][] = [
        [
            { id: 1, text: "Find Events" },
            { id: 2, text: "Create Events", url: "/manage/events/create" },
            { id: 3, text: "Help Centre" },
        ],
        [
            { id: 1, text: "Log out", handleClick: onLogOut },
        ]
    ]
    const linksIfAnonymus: LinkType[][] = [
        [
            { id: 1, text: "Find Events" },
            { id: 2, text: "Create Events", url: "/manage/events/create" },
            { id: 3, text: "Help Centre" },
        ],
    ]
    const list = useMemo(() => {
        if (session?.user?.id) {
            return drawerLinks
        }
        return linksIfAnonymus
    }, [session])
    return (
        <div className='mobile_header'>
            <div className='mobile_header-btn'>
                <div onClick={toggleDrawer} className="header_user_image" >
                    {avatar ? <img src={avatar} alt="" />
                        : <i className="ri-menu-line"></i>
                    }
                </div>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                customIdSuffix="right-drawer"
                enableOverlay={false}
                style={{ height: 'max-content', minHeight: 100, top: 60 }}
            >
                <div className='mobile_header-sidebar-content'>
                    <div onClick={toggleDrawer} className='mobile_header-sidebar-close-btn'><i className="ri-close-line ri-lg"></i></div>
                    {list.map((links, i) =>
                        <div key={i} className='mobile_header-sidebar-group'>
                            {links.map(link =>
                                <a className='mobile_header-link' key={link.id} href={link.url} onClick={link.handleClick}>{link.text}</a>
                            )}
                        </div>
                    )}
                </div>
            </Drawer>
        </div>
    )
}
