import React, { useEffect, useState } from 'react'
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    Handle,
} from 'react-flow-renderer'
import dagre from 'dagre'
import AddUserInGraph from '../../components/forms/AddUserInGraph.jsx'
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant.js'
import axios from 'axios'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'

// Custom Node Component
const CustomNode = ({ data }) => {
    return (
        <div className="custom-node flex items-center justify-center p-2 border rounded bg-white shadow-md">
            <img
                src={profileImage}
                alt="profileImage"
                className="w-6  h-6 rounded-full mr-2"
            />
            <div>{data.label}</div>
            <Handle type="source" position="bottom" id="a" />
            <Handle type="target" position="top" id="b" />
        </div>
    )
}

// Recursive function to generate nodes and edges
const generateTree = (data, parentId = null) => {
    const nodes = []
    const edges = []

    data.forEach((node) => {
        nodes.push({
            id: node.id,
            data: { label: node.label },
            position: { x: 0, y: 0 },
            type: 'custom', // Use custom node type
        })

        if (parentId) {
            edges.push({
                id: `e${parentId}-${node.id}`,
                source: parentId,
                target: node.id,
            })
        }

        if (node.children) {
            const { nodes: childNodes, edges: childEdges } = generateTree(
                node.children,
                node.id,
            )
            nodes.push(...childNodes)
            edges.push(...childEdges)
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

const mapDynamicDataToTree = (data) => {
    return (
        data?.map((item) => ({
            id: String(item.id),
            label: item.name || 'IFBC',
            children: item.children ? mapDynamicDataToTree(item.children) : [],
        })) || []
    )
}

const Business = () => {
    const [treeData, setTreeData] = useState([])
    const [selectedNode, setSelectedNode] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    // Fetch user data
    const handelGetUserData = async () => {
        try {
            const baseUrl = `${BASE_API_URL}/users/hierarchy`
            const response = await axios.get(baseUrl, {
                headers: {
                    'X-App-Token': HEADER_TOKEN,
                },
            })

            if (response?.status === 200) {
                const mappedTreeData = mapDynamicDataToTree(response.data)
                setTreeData(mappedTreeData)
                console.log(mappedTreeData, 'Mapped Tree Data')
            }
        } catch (error) {
            console.error('Error when fetching the User data:', error)
        }
    }

    useEffect(() => {
        handelGetUserData()
    }, [])

    const { nodes, edges } = generateTree(treeData)
    const layout = applyDagreLayout(nodes, edges)

    // Handle node click
    const handleNodeClick = (event, node) => {
        setSelectedNode(node)
        setIsFormOpen(true)
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ReactFlow
                nodes={layout.nodes}
                edges={layout.edges}
                onNodeClick={handleNodeClick}
                fitView
                nodeTypes={{ custom: CustomNode }}
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
    )
}

export default Business
