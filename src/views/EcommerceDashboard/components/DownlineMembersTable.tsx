import React from 'react'
import { TbBinaryTree } from 'react-icons/tb'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'

const { Tr, Td, TBody, THead, Th } = Table

// Define the type for treeView data
type TreeViewItem = {
    id: number
    profile: string
    tittle: string
    name: string
    level: string
}

type TreeViewTableProps = {
    data: TreeViewItem[]
}

const columnHelper = createColumnHelper<TreeViewItem>()

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (props) => <span>{props.row.original.id}</span>,
    }),
    columnHelper.accessor('profile', {
        header: 'Profile',
        cell: (props) => (
            <img
                src={props.row.original.profile}
                alt="Profile"
                className="w-10 h-10 rounded-full"
            />
        ),
    }),
    columnHelper.accessor('tittle', {
        header: 'Tittle',
        cell: (props) => <span>{props.row.original.tittle}</span>,
    }),
    columnHelper.accessor('name', {
        header: 'Name',
        cell: (props) => <span>{props.row.original.name}</span>,
    }),
    columnHelper.accessor('level', {
        header: 'Level',
        cell: (props) => <span>{props.row.original.level}</span>,
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
            <button className="text-primary hover:text-blue-600">
                <TbBinaryTree className="w-6 h-6" />
            </button>
        ),
    }),
]

const TreeViewTable: React.FC<TreeViewTableProps> = ({ data }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <h4>Team Members</h4>
                <Button
                    size="sm"
                    onClick={() => console.log('Navigate to details')}
                >
                    View Details
                </Button>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    )
}

export default TreeViewTable
