import React, { useState } from 'react'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Table from '@/components/ui/Table'
import { Input } from '@/components/ui'
import { TbBinaryTree } from 'react-icons/tb'
import PaginationHandler from '@/components/PaginationHandler'
import { array } from 'zod'

const { Tr, Td, TBody, THead, Th } = Table

type TreeViewItem = {
    additionalEmail: string
    additionalFirstName: string
    additionalLastName: string
    additionalPhone: string
    additionalRelationship: string
    agentUserId: number
    currentCity: string
    currentState: string
    currentZipcode: string
    docDate: string
    docid: number
    email: string
    firstName: string
    franchiseInterested: string
    isArchive: boolean
    isCompleted: boolean
    isDeleted: boolean
    lastName: string
    lostReason: string
    phone: string
    pipelineStep: string
    refferralId: number | null
    status: string
    territoryCity: string
    territoryState: string
    territoryZipcode: string
    updateDt: string | null
}

type TreeViewTableProps = {
    data: TreeViewItem[]
    headerConfig: {
        title: string
        buttonText: string
        placeholderText: string
        buttonAction: () => void
        onchangeAction: () => void
    }
}
const HeaderWithButton: React.FC<{
    title: string
    buttonText: string
    placeholderText: string
    onchangeAction: () => void
    buttonAction: () => void
}> = ({ title, buttonText, buttonAction, placeholderText, onchangeAction }) => (
    <div className="flex items-center justify-between mb-6">
        <h4>{title}</h4>
        <Input
            placeholder={placeholderText}
            onChange={onchangeAction}
            className="w-[30%] bg-[#E5E5E5]"
            // {...props}
            // value={props.value}
            // suffix={inputSuffix}
            // prefix={inputPrefix}
        />
        <Button
            size="sm"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF]"
            onClick={buttonAction}
        >
            {buttonText}
        </Button>
    </div>
)

const columnHelper = createColumnHelper<TreeViewItem>()

const DownlineMembersTable: React.FC<TreeViewTableProps> = ({
    data,
    headerConfig,
}) => {
    console.log(data, 'datadatadata')
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

    const handleCheckboxChange = (id: number) => {
        setSelectedIds((prevSelected) => {
            const updated = new Set(prevSelected)
            if (updated.has(id)) {
                updated.delete(id)
            } else {
                updated.add(id)
            }
            return updated
        })
    }

    const handleGetSelectedIds = () => {
        console.log(Array.from(selectedIds))
    }
    console.log(selectedIds, 'temperary')

    const columns = [
        columnHelper.display({
            id: 'select',
            header: () => (
                <input
                    type="checkbox"
                    checked={selectedIds.size === data.length}
                    onChange={(e) => {
                        const checked = e.target.checked
                        setSelectedIds(
                            checked
                                ? new Set(data.map((row) => row.id))
                                : new Set(),
                        )
                    }}
                />
            ),
            cell: (props) => (
                <input
                    type="checkbox"
                    checked={selectedIds.has(props.row.original?.id)}
                    onChange={() =>
                        handleCheckboxChange(props.row.original?.id)
                    }
                />
            ),
        }),
        columnHelper.accessor('docid', {
            header: 'ID',
            cell: (props) => <span>{props.row.original.docid}</span>,
        }),
        columnHelper.accessor('firstName', {
            header: 'First Name',
            cell: (props) => <span>{props.row.original.firstName}</span>,
        }),
        columnHelper.accessor('lastName', {
            header: 'Last Name',
            cell: (props) => <span>{props.row.original.lastName}</span>,
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (props) => <span>{props.row.original.email}</span>,
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: (props) => <span>{props.row.original.phone}</span>,
        }),
        columnHelper.accessor('pipelineStep', {
            header: 'Deal State',
            cell: (props) => <span>{props.row.original.pipelineStep}</span>,
        }),
        columnHelper.accessor('territoryCity', {
            header: 'Territory City',
            cell: (props) => <span>{props.row.original.territoryCity}</span>,
        }),
        columnHelper.accessor('territoryState', {
            header: 'Territory State',
            cell: (props) => <span>{props.row.original.territoryState}</span>,
        }),
        columnHelper.accessor('updateDt', {
            header: 'Date & Time',
            cell: (props) => <span>{props.row.original.updateDt}</span>,
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
                placeholderText={headerConfig.placeholderText}
                buttonAction={headerConfig.buttonAction}
                onchangeAction={headerConfig.onchangeAction}
            />
            <PaginationHandler items={data} itemsPerPage={10}>
                {(paginatedItems) => (
                    <Table>
                        <THead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
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
                            {paginatedItems.map((row) => {
                                return (
                                    <Tr key={row?.docid}>
                                        {columns.map((column) => (
                                            <Td key={column?.id}>
                                                {column?.cell({
                                                    row: { original: row },
                                                })}
                                            </Td>
                                        ))}
                                    </Tr>
                                )
                            })}
                        </TBody>
                    </Table>
                )}
            </PaginationHandler>
            {/* <Button onClick={handleGetSelectedIds}>Get Selected IDs</Button> */}
        </Card>
    )
}

export default DownlineMembersTable
