// import React, { useEffect, useMemo, useState } from 'react'
// import ReactFlow, {
//     MiniMap,
//     Controls,
//     Background,
//     Handle,
// } from 'react-flow-renderer'
// import dagre from 'dagre'
// import AddUserInGraph from '../../components/forms/AddUserInGraph.jsx'
// import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant.js'
// import axios from 'axios'
// import profileImage from '../../../public/images/logo/android-chrome-192x192.png'

// // Custom Node Component
// const CustomNode = ({ data }) => {
//     return (
//         <div className="custom-node flex items-center justify-center p-2 border rounded bg-white shadow-md">
//             <img
//                 src={profileImage}
//                 alt="profileImage"
//                 className="w-6  h-6 rounded-full mr-2"
//             />
//             <div>{data.label}</div>
//             <Handle type="source" position="bottom" id="a" />
//             <Handle type="target" position="top" id="b" />
//         </div>
//     )
// }

// // Recursive function to generate nodes and edges
// const generateTree = (data, parentId = null) => {
//     const nodes = []
//     const edges = []

//     data.forEach((node) => {
//         nodes.push({
//             id: node.id,
//             data: { label: node.label },
//             position: { x: 0, y: 0 },
//             type: 'custom', // Use custom node type
//         })

//         if (parentId) {
//             edges.push({
//                 id: `e${parentId}-${node.id}`,
//                 source: parentId,
//                 target: node.id,
//             })
//         }

//         if (node.children) {
//             const { nodes: childNodes, edges: childEdges } = generateTree(
//                 node.children,
//                 node.id,
//             )
//             nodes.push(...childNodes)
//             edges.push(...childEdges)
//         }
//     })

//     return { nodes, edges }
// }

// // Dagre layout for positioning
// const applyDagreLayout = (nodes, edges, direction = 'TB') => {
//     const dagreGraph = new dagre.graphlib.Graph()
//     dagreGraph.setDefaultEdgeLabel(() => ({}))
//     dagreGraph.setGraph({ rankdir: direction })

//     nodes.forEach((node) => {
//         dagreGraph.setNode(node.id, { width: 125, height: 50 })
//     })

//     edges.forEach((edge) => {
//         dagreGraph.setEdge(edge.source, edge.target)
//     })

//     dagre.layout(dagreGraph)

//     nodes.forEach((node) => {
//         const { x, y } = dagreGraph.node(node.id)
//         node.position = { x, y }
//     })

//     return { nodes, edges }
// }

// const mapDynamicDataToTree = (data) => {
//     return (
//         data?.map((item) => ({
//             id: String(item.id),
//             label: item.name || 'IFBC',
//             children: item.children ? mapDynamicDataToTree(item.children) : [],
//         })) || []
//     )
// }

// const Business = () => {
//     // const treeData = [
//     const treeData = [
//         {
//             shayan: {
//                 id: 1,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: 'Level',
//                 // icons: <MdExpandCircleDown />,
//                 subUser1: {
//                     id: 2,
//                     profile: profileImage,
//                     title: 'INF00123',
//                     name: 'Sub User 1',
//                     level: '1',
//                 },
//                 subUser2: {
//                     id: 3,
//                     profile: profileImage,
//                     title: 'INF00123',
//                     name: 'Sub User 2',
//                     level: '1',
//                 },
//             },
//         },
//         {
//             sohail: {
//                 id: 2,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'User 2',
//                 level: 'Level',
//                 // icons: <MdExpandCircleDown />,
//             },
//         },
//         {
//             umer: {
//                 id: 3,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: '3',
//                 // icons: <MdExpandCircleDown />,
//                 subUser1: {
//                     id: 4,
//                     profile: profileImage,
//                     title: 'INF00123',
//                     name: 'Sub User 1',
//                     level: '1',
//                 },
//                 subUser2: {
//                     id: 5,
//                     profile: profileImage,
//                     title: 'INF00123',
//                     name: 'Sub User 2',
//                     level: '1',
//                     subSubUser1: {
//                         id: 6,
//                         profile: profileImage,
//                         title: 'INF00123',
//                         name: 'Sub Sub User 1',
//                         level: '1',
//                     },
//                 },
//             },
//         },
//         {
//             hassan: {
//                 id: 7,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Parent User',
//                 level: '4',
//                 // icons: <MdExpandCircleDown />,
//                 subUser1: {
//                     id: 8,
//                     profile: profileImage,
//                     title: 'INF00124',
//                     name: 'Child User',
//                     level: '3',
//                 },
//             },
//         },
//         {
//             hasnain: {
//                 id: 11,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: '2',
//                 // icons: <MdExpandCircleDown />,
//             },
//         },
//         {
//             abdullah: {
//                 id: 12,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: '2',
//                 // icons: <MdExpandCircleDown />,
//             },
//         },
//         {
//             basit: {
//                 id: 13,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: '2',
//                 // icons: <MdExpandCircleDown />,
//             },
//         },
//         {
//             baqar: {
//                 id: 14,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: '1',
//                 // icons: <MdExpandCircleDown />,
//             },
//         },
//         {
//             rohan: {
//                 id: 15,
//                 profile: profileImage,
//                 title: 'INF00123',
//                 name: 'Sagar Uphade',
//                 level: '1',
//                 // icons: <MdExpandCircleDown />,
//             },
//         },
//     ]
//     // const [treeData, setTreeData] = useState([])
//     const [selectedNode, setSelectedNode] = useState(null)
//     const [isFormOpen, setIsFormOpen] = useState(false)

//     // Fetch user data
//     // const handelGetUserData = async () => {
//     //     try {
//     //         const baseUrl = `${BASE_API_URL}/users/hierarchy`
//     //         const response = await axios.get(baseUrl, {
//     //             headers: {
//     //                 'X-App-Token': HEADER_TOKEN,
//     //             },
//     //         })

//     //         if (response?.status === 200) {
//     //             const mappedTreeData = mapDynamicDataToTree(response.data)
//     //             setTreeData(mappedTreeData)
//     //             console.log(mappedTreeData, 'Mapped Tree Data')
//     //         }
//     //     } catch (error) {
//     //         console.error('Error when fetching the User data:', error)
//     //     }
//     // }
//     // useEffect(() => {
//     //     handelGetUserData()
//     // }, [])

//     const { nodes, edges } = generateTree(treeData)
//     const layout = applyDagreLayout(nodes, edges)

//     // Handle node click
//     const handleNodeClick = (event, node) => {
//         setSelectedNode(node)
//         setIsFormOpen(true)
//     }
//     const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])
//     const [selectCandidate, setSelectCandidate] = useState('')
//     const handleSelectCandidate = (event: any) => {
//         setSelectCandidate(event.target.value)
//     }
//     console.log(selectCandidate, 'selectCandidate')
//     return (
//         <>
//             <div className="flex justify-between items-center">
//                 <h2>Genealogy Tree</h2>

//                 {/* <h4 className="mt-4">
//                     Selected Value: <strong>{selectCandidate || 'None'}</strong>
//                 </h4> */}
//                 <select
//                     className="p-2 border rounded-md"
//                     value={selectCandidate}
//                     onChange={handleSelectCandidate}
//                 >
//                     <option value="" disabled selected>
//                         Select an Option
//                     </option>
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                     <option value="option4">Option 4</option>
//                     <option value="option5">Option 5</option>
//                     <option value="option6">Option 6</option>
//                 </select>
//             </div>
//             <div style={{ height: '100vh', width: '100%' }}>
//                 <ReactFlow
//                     nodes={layout.nodes}
//                     edges={layout.edges}
//                     onNodeClick={handleNodeClick}
//                     fitView
//                     nodeTypes={nodeTypes}
//                 >
//                     <MiniMap />
//                     <Controls />
//                     <Background />
//                 </ReactFlow>

//                 {isFormOpen && (
//                     <AddUserInGraph
//                         selectedNode={selectedNode}
//                         onClose={() => setIsFormOpen(false)}
//                     />
//                 )}
//             </div>
//         </>
//     )
// }

// export default Business

import React, { useEffect, useMemo, useState } from 'react'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Handle,
} from 'react-flow-renderer'
import dagre from 'dagre'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import AddUserInGraph from '../../components/forms/AddUserInGraph.jsx'

// Custom Node Component
const CustomNode = ({ data }) => (
    <div className="custom-node flex items-center justify-center p-2 border rounded bg-white shadow-md">
        <img
            src={profileImage}
            alt="profileImage"
            className="w-6 h-6 rounded-full mr-2"
        />
        <div>{data.label}</div>
        <Handle type="source" position="bottom" id="a" />
        <Handle type="target" position="top" id="b" />
    </div>
)

// Recursive function to generate nodes and edges
const generateTree = (data, parentId = null) => {
    const nodes = []
    const edges = []

    Object.keys(data).forEach((key) => {
        const node = data[key]
        const nodeId = String(node.id)
        nodes.push({
            id: nodeId,
            data: { label: node.name },
            position: { x: 0, y: 0 },
            type: 'custom',
        })

        if (parentId) {
            edges.push({
                id: `e${parentId}-${nodeId}`,
                source: parentId,
                target: nodeId,
            })
        }

        if (node.subUser1 || node.subUser2) {
            if (node.subUser1) {
                const { nodes: childNodes, edges: childEdges } = generateTree(
                    { subUser1: node.subUser1 },
                    nodeId,
                )
                nodes.push(...childNodes)
                edges.push(...childEdges)
            }
            if (node.subUser2) {
                const { nodes: childNodes, edges: childEdges } = generateTree(
                    { subUser2: node.subUser2 },
                    nodeId,
                )
                nodes.push(...childNodes)
                edges.push(...childEdges)
            }
        }
    })

    return { nodes, edges }
}

// Dagre layout for positioning
const applyDagreLayout = (nodes, edges, direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: direction })

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: 125, height: 50 })
    })

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    nodes.forEach((node) => {
        const { x, y } = dagreGraph.node(node.id)
        node.position = { x, y }
    })

    return { nodes, edges }
}

const Business = () => {
    const setTreeData = [
        {
            shayan: {
                id: 1,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: 'Level',
                // icons: <MdExpandCircleDown />,
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
        },
        {
            sohail: {
                id: 2,
                profile: profileImage,
                title: 'INF00123',
                name: 'User 2',
                level: 'Level',
                // icons: <MdExpandCircleDown />,
            },
        },
        {
            umer: {
                id: 3,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: '3',
                // icons: <MdExpandCircleDown />,
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
        },
        {
            hassan: {
                id: 7,
                profile: profileImage,
                title: 'INF00123',
                name: 'Parent User',
                level: '4',
                // icons: <MdExpandCircleDown />,
                subUser1: {
                    id: 8,
                    profile: profileImage,
                    title: 'INF00124',
                    name: 'Child User',
                    level: '3',
                },
            },
        },
        {
            hasnain: {
                id: 11,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: '2',
                // icons: <MdExpandCircleDown />,
            },
        },
        {
            abdullah: {
                id: 12,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: '2',
                // icons: <MdExpandCircleDown />,
            },
        },
        {
            basit: {
                id: 13,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: '2',
                // icons: <MdExpandCircleDown />,
            },
        },
        {
            basit: {
                id: 14,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: '1',
                // icons: <MdExpandCircleDown />,
            },
        },
        {
            rohan: {
                id: 15,
                profile: profileImage,
                title: 'INF00123',
                name: 'Sagar Uphade',
                level: '1',
                // icons: <MdExpandCircleDown />,
            },
        },
    ]

    const [selectedUser, setSelectedUser] = useState(null)
    const [selectCandidate, setSelectCandidate] = useState('')

    // Handle dropdown selection
    const handleSelectCandidate = (event) => {
        const userKey = event.target.value
        const selected = setTreeData.find((item) => item[userKey])
        setSelectedUser(selected ? selected[userKey] : null)
        setSelectCandidate(userKey)
    }

    const filteredTreeData = selectedUser
        ? { [selectCandidate]: selectedUser }
        : {}
    const { nodes, edges } = generateTree(filteredTreeData)
    const layout = applyDagreLayout(nodes, edges)

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])
    const [selectedNode, setSelectedNode] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const handleNodeClick = (event, node) => {
        setSelectedNode(node)
        setIsFormOpen(true)
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <h2>Genealogy Tree</h2>
                <select
                    className="p-2 border rounded-md"
                    value={selectCandidate}
                    onChange={handleSelectCandidate}
                >
                    <option value="" disabled>
                        Select a User
                    </option>
                    <option value="shayan">Shayan</option>
                    <option value="sohail">Sohail</option>
                    <option value="umer">Umer</option>
                    <option value="Basit">Basit</option>
                    <option value="hassan">hassan</option>
                    <option value="hasnain">hasnain</option>
                    <option value="abdullah">abdullah</option>
                    <option value="basit">basit</option>
                    <option value="rohan">rohan</option>
                </select>
            </div>
            <div style={{ height: '100vh', width: '100%' }}>
                <ReactFlow
                    nodes={layout.nodes}
                    edges={layout.edges}
                    fitView
                    onNodeClick={handleNodeClick}
                    nodeTypes={nodeTypes}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>

                {isFormOpen && (
                    <AddUserInGraph
                        selectedNode={selectedNode}
                        onClose={() => setIsFormOpen(false)}
                    />
                )}
            </div>
        </>
    )
}

export default Business
