import React from 'react'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import { FaInfo } from 'react-icons/fa'
import { MdExpandCircleDown } from 'react-icons/md'

const Card = ({ profile, title, name, level, id, icons }) => (
    <div>
        <div
            className="flex relative justify-between items-center max-w-[40%] bg-white py-4 px-4 rounded-md mb-4 border-b-2"
            style={{
                boxShadow:
                    '0 1px 1px rgba(0, 0, 0, 0.1), 0 -1px 1px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -1px 0 1px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div className="w-[] absolute top-1 left-1 text-[black]">
                {/* {icons} */}
            </div>
            {/* <div>icnos</div> */}
            <img
                src={profile}
                alt="User Profile"
                className="w-[50px] rounded-full"
            />
            <div>
                <h5>{title}</h5>
                <h6 className="text-gray-600">{name}</h6>
            </div>
            <div className="bg-gray-100 border rounded-full w-[60px] h-[60px] flex flex-col items-center justify-center">
                <p>{level}</p>
                <h2>{id}</h2>
            </div>
            <div className="bg-gray-100 border rounded-full w-[60px] h-[60px] flex items-center justify-center">
                <FaInfo className="text-blue-500" size={25} />
            </div>
        </div>
    </div>
)

const TreeView = () => {
    const treeView = [
        {
            id: 1,
            profile: profileImage,
            title: 'INF00123',
            name: 'Sagar Uphade',
            level: 'Level',
            icons: <MdExpandCircleDown />,
            subUser1: {
                id: 2,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sub User 1',
                level: '1',
            },
            subUser2: {
                id: 3,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sub User 2',
                level: '1',
            },
        },
        {
            id: 2,
            profile: profileImage,
            title: 'INF00123',
            name: 'User 2',
            level: 'Level',
            icons: <MdExpandCircleDown />,
        },
        {
            id: 3,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '3',
            icons: <MdExpandCircleDown />,
            subUser2: {
                id: 3,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sub User 2',
                level: '1',
            },
            subUser1: {
                id: 3,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sub User 2',
                level: '1',
            },
        },
        {
            id: 4,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
            icons: <MdExpandCircleDown />,
        },
        {
            id: 5,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
            icons: <MdExpandCircleDown />,
        },
        {
            id: 6,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
            icons: <MdExpandCircleDown />,
        },
        {
            id: 7,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
            icons: <MdExpandCircleDown />,
        },
        {
            id: 8,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
            icons: <MdExpandCircleDown />,
        },
    ]

    const renderTree = (user) => {
        return (
            <div key={user.id}>
                <Card
                    profile={user.profile}
                    title={user.title}
                    name={user.name}
                    level={user.level}
                    id={user.id}
                    icons={user.icons}
                />
                {/* Recursively render sub-users */}
                {user.subUser1 && (
                    <div className="ml-10">{renderTree(user.subUser1)}</div>
                )}
                {user.subUser2 && (
                    <div className="ml-10 border-b-2 mb-4">
                        {renderTree(user.subUser2)}
                    </div>
                )}
            </div>
        )
    }

    return <div className="p-4">{treeView.map((user) => renderTree(user))}</div>
}

export default TreeView
