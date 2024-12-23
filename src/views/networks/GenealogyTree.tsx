import React, { useState, useMemo, useEffect, useContext } from 'react'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Handle,
} from 'react-flow-renderer'
import dagre from 'dagre'
// import AddUserInGraph from '../../components/forms/AddUserInGraph.jsx'
import { useAuth } from '@/auth'
import { getData } from '@/services/axios/axiosUtils'

const CustomNode = ({ data }) => (
    <div className="custom-node flex items-center justify-center p-2 border rounded bg-white shadow-md">
        <img
            src={
                data.profile ||
                'https://ifbc.co/images/consultant-placeholer.jpg'
            }
            alt="profileImage"
            className="w-6 h-6 rounded-full mr-2"
        />
        <div>{data.label}</div>
        <Handle type="source" position="bottom" id="a" />
        <Handle type="target" position="top" id="b" />
    </div>
)

const generateTree = (data, parentId = null) => {
    const nodes = []
    const edges = []

    Object.keys(data).forEach((key) => {
        const node = data[key]
        const nodeId = String(node.docId)
        nodes.push({
            id: nodeId,
            data: {
                label: `${node.firstName.trim()} ${node.lastName.trim()}`,
                profile: node.profile,
            },
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

        if (node.subConsultants && node.subConsultants.length > 0) {
            node.subConsultants.forEach((subUser) => {
                const { nodes: childNodes, edges: childEdges } = generateTree(
                    { [subUser.docId]: subUser },
                    nodeId,
                )
                nodes.push(...childNodes)
                edges.push(...childEdges)
            })
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
        dagreGraph.setNode(node.id, { width: 170, height: 50 })
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
    const { user } = useAuth()
    const [selectedUser, setSelectedUser] = useState(null)
    const [apiData, setApiData] = useState([])
    console.log(apiData, 'apiData')
    function capitalizeWords(name) {
        return name
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
            .join(' ')
    }

    // Fetch data from the API
    const handleData = () => {
        getData(`consultants/getconsultanthierarchy/${user?.userId}`)
            .then((data) => {
                // setInfo(data)
                const cleanedData = {
                    ...data,
                    firstName: capitalizeWords(data.firstName.trim()),
                    lastName: capitalizeWords(data.lastName.trim()),
                    subConsultants: data.subConsultants.map((sub) => ({
                        ...sub,
                        firstName: capitalizeWords(sub.firstName.trim()),
                        lastName: capitalizeWords(sub.lastName.trim()),
                    })),
                }
                setApiData([cleanedData])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        handleData()
    }, [])

    useEffect(() => {
        if (apiData && apiData.length > 0) {
            const defaultUser = apiData.find(
                (user) => user.firstName === user.firstName,
            )
            setSelectedUser(defaultUser)
        }
    }, [apiData])

    const filteredTreeData = selectedUser
        ? { [selectedUser.docId]: selectedUser }
        : {}
    const { nodes, edges } = generateTree(filteredTreeData)
    const layout = applyDagreLayout(nodes, edges)

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), [])
    // const [selectedNode, setSelectedNode] = useState(null)
    // const [isFormOpen, setIsFormOpen] = useState(false)

    // const handleNodeClick = (event, node) => {
    //     setSelectedNode(node)
    //     setIsFormOpen(true)
    // }

    return (
        <>
            <div className="flex justify-between items-center">
                <h2>Genealogy Tree</h2>
            </div>

            <div style={{ height: '80vh', width: '100%' }}>
                <ReactFlow
                    nodes={layout.nodes}
                    edges={layout.edges}
                    fitView
                    // onNodeClick={handleNodeClick}
                    nodeTypes={nodeTypes}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>

                {/* {isFormOpen && (
                    <AddUserInGraph
                        selectedNode={selectedNode}
                        onClose={() => setIsFormOpen(false)}
                    />
                )} */}
            </div>
        </>
    )
}

export default Business
