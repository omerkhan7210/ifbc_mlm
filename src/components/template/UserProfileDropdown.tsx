import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router-dom'
import {
    PiUserDuotone,
    PiUserCircleGearDuotone,
    PiSignOutDuotone,
    PiGlobeSimpleDuotone,
} from 'react-icons/pi'
import { useAuth } from '@/auth'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Profile',
        // path: '/profile',
        path: '/reports/profile',
        icon: <PiUserCircleGearDuotone />,
    },
]

const _UserDropdown = () => {
    const { profileImage, username, email } = useSessionUser(
        (state) => state.user,
    )

    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }

    const avatarProps = {
        ...(!profileImage
            ? { src: profileImage }
            : { icon: <PiUserDuotone /> }),
    }

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center">
                    <Avatar size={32} {...avatarProps} />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <Avatar {...avatarProps} />
                    <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {username || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {email || 'No email available'}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            <Dropdown.Item
                key='Go to Website'
                eventKey='Go to Website'
                className="px-0"
            >
                <a className="flex h-full w-full px-2"
                    href='https://ifbc.co'
                    target='_blank'
                    rel='noreferrer noopener'
                >
                    <span className="flex gap-2 items-center w-full">
                        <span className="text-xl"><PiGlobeSimpleDuotone /></span>
                        <span>Go to Website</span>
                    </span>
                </a>
            </Dropdown.Item>
            {/* {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" to={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))} */}
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2 px-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
