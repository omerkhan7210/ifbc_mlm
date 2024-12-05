import React from 'react'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import { FaInfo } from 'react-icons/fa'
import { MdExpandCircleDown } from 'react-icons/md'

// Card Component
const Card = ({ profile, title, name, level, id }) => (
    <div
        className="relative bg-white py-4 px-4 rounded-md gap-[5%] border mb-4 w-[100%] md:w-full flex items-center justify-between shadow"
        style={{
            boxShadow:
                '0 1px 1px rgba(0, 0, 0, 0.1), 0 -1px 1px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -1px 0 1px rgba(0, 0, 0, 0.1)',
        }}
    >
        <div className="flex gap-4 items-center">
            <img
                src={profile}
                alt="User Profile"
                className="w-[50px] h-[50px] rounded-full"
            />
            <div>
                <h6>{title}</h6>
                <p className="text-gray-600">{name}</p>
            </div>
        </div>
        <div className="bg-gray-100 border rounded-full w-[60px] h-[60px] flex flex-col items-center justify-center">
            <p>{level}</p>
            <h2>{id}</h2>
        </div>
        <div className="bg-gray-100 border rounded-full w-[60px] h-[60px] flex items-center justify-center">
            <FaInfo className="text-blue-500" size={25} />
        </div>
    </div>
)

// Recursive Rendering Component
const TreeView = ({ data }) => {
    const renderTree = (user) => {
        const childrenKeys = Object.keys(user).filter((key) =>
            key.toLowerCase().startsWith('sub'),
        )

        return (
            <div key={user.id} className="relative">
                {/* Render the card */}
                <Card
                    profile={user.profile}
                    title={user.title}
                    name={user.name}
                    level={user.level}
                    id={user.id}
                />
                {/* Render child users if present */}
                {childrenKeys.length > 0 && (
                    <div className="relative pl-10 ml-[20px] md:ml-[30px]">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-300"></div>
                        <div className="flex gap-2 flex-col md:flex-row">
                            {childrenKeys.map((key) => renderTree(user[key]))}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex gap-2 flex-col md:flex-col p-4 items-start">
            {data.map((user) => renderTree(user))}
        </div>
    )
}

const treeData = [
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
        title: 'INF00123',
        name: 'Sagar Uphade',
        level: '3',
        icons: <MdExpandCircleDown />,
        subUser1: {
            id: 4,
            profile: profileImage,
            title: 'INF00123',
            name: 'Sub User 1',
            level: '1',
        },
        subUser2: {
            id: 5,
            profile: profileImage,
            title: 'INF00123',
            name: 'Sub User 2',
            level: '1',
            subSubUser1: {
                id: 6,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sub Sub User 1',
                level: '1',
            },
        },
    },
    {
        id: 7,
        profile: profileImage,
        title: 'INF00123',
        name: 'Parent User',
        level: '4',
        icons: <MdExpandCircleDown />,
        subUser1: {
            id: 8,
            profile: profileImage,
            title: 'INF00124',
            name: 'Child User',
            level: '3',
        },
    },
    {
        id: 11,
        profile: profileImage,
        title: 'INF00123',
        name: 'Sagar Uphade',
        level: '2',
        icons: <MdExpandCircleDown />,
    },
    {
        id: 12,
        profile: profileImage,
        title: 'INF00123',
        name: 'Sagar Uphade',
        level: '2',
        icons: <MdExpandCircleDown />,
    },
    {
        id: 13,
        profile: profileImage,
        title: 'INF00123',
        name: 'Sagar Uphade',
        level: '2',
        icons: <MdExpandCircleDown />,
    },
    {
        id: 14,
        profile: profileImage,
        title: 'INF00123',
        name: 'Sagar Uphade',
        level: '1',
        icons: <MdExpandCircleDown />,
    },
    {
        id: 15,
        profile: profileImage,
        title: 'INF00123',
        name: 'Sagar Uphade',
        level: '1',
        icons: <MdExpandCircleDown />,
    },
]

export default function App() {
    return <TreeView data={treeData} />
}
