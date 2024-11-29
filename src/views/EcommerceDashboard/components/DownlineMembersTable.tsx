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

// Define the table structure
const { Tr, Td, TBody, THead, Th } = Table

// Type for treeView data
type TreeViewItem = {
    id: number
    profile: string
    tittle: string
    name: string
    level: string
}

type TreeViewTableProps = {
    data: TreeViewItem[]
    headerConfig: {
        title: string
        buttonText: string
        buttonAction: () => void
    }
}

// Column helper for React Table
const columnHelper = createColumnHelper<TreeViewItem>()

// Define the table columns
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

// Header with Button Component
const HeaderWithButton: React.FC<{
    title: string
    buttonText: string
    buttonAction: () => void
}> = ({ title, buttonText, buttonAction }) => (
    <div className="flex items-center justify-between mb-6">
        <h4>{title}</h4>
        <Button
            size="sm"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF]"
            onClick={buttonAction}
        >
            {buttonText}
        </Button>
    </div>
)

// Main Component
const DownlineMembersTable: React.FC<TreeViewTableProps> = ({
    data,
    headerConfig,
}) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <HeaderWithButton
                title={headerConfig.title}
                buttonText={headerConfig.buttonText}
                buttonAction={headerConfig.buttonAction}
            />
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

                {/* Table Body */}
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

export default DownlineMembersTable
