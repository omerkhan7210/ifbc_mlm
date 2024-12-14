import React, { useEffect, useState } from 'react'
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

const { Tr, Td, TBody, THead, Th } = Table

type TreeViewItem = {
    docid: number
    firstName: string
    lastName: string
    email: string
    phone: string
    pipelineStep: string
    territoryCity: string
    territoryState: string
    updateDt: string | null
}

type TreeViewTableProps = {
    data: TreeViewItem[]
    handleGetValue: any
    // searchQuery: string
    // setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    headerConfig: {
        title: string
        buttonText: string

        placeholderText: string
        buttonAction: () => void
    }
}

const columnHelper = createColumnHelper<TreeViewItem>()

const DownlineMembersTable: React.FC<TreeViewTableProps> = ({
    data,
    headerConfig,
    handleGetValue,
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectRowName, setSelectRowName] = useState<
        {
            docId: number
            firstName: string
            lastName: string
        }[]
    >([])
    useEffect(() => {
        handleGetValue(selectRowName)
    }, [selectRowName])
    // Filter logic: Search across all fields
    const filteredData = data?.filter((item) => {
        const searchLower = searchQuery?.toLowerCase()
        return (
            item.firstName.toLowerCase().includes(searchLower) ||
            item.lastName.toLowerCase().includes(searchLower) ||
            item.email.toLowerCase().includes(searchLower) ||
            item.phone.toLowerCase().includes(searchLower) ||
            item.pipelineStep.toLowerCase().includes(searchLower) ||
            item.territoryCity.toLowerCase().includes(searchLower) ||
            item.territoryState.toLowerCase().includes(searchLower)
        )
    })
    const toggleRowSelection = (item: TreeViewItem) => {
        setSelectRowName((prev) => {
            const exist = prev.some((row) => row.docId === item?.docid)
            return exist
                ? prev.filter((row) => row.docId !== item?.docid)
                : [
                      ...prev,
                      {
                          docId: item?.docid,
                          firstName: item?.firstName,
                          lastName: item?.lastName,
                      },
                  ]
        })
    }

    const toggleSelectAll = (isChecked: boolean) => {
        setSelectRowName(
            isChecked
                ? filteredData.map((item) => ({
                      docId: item?.docid,
                      firstName: item?.firstName,
                      lastName: item?.lastName,
                  }))
                : [],
        )
    }
    const columns = [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={
                        selectRowName.length === filteredData.length &&
                        filteredData.length > 0
                    }
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                />
            ),
            cell: (props) => (
                <input
                    type="checkbox"
                    checked={selectRowName.some(
                        (row) => row?.docId === props.row.original.docid,
                    )}
                    onChange={() => toggleRowSelection(props.row.original)}
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
    ]

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            {/* Search Box */}
            <div className="flex items-center justify-between mb-6">
                <h4>{headerConfig.title}</h4>
                <Input
                    placeholder={headerConfig.placeholderText}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[30%] bg-[#E5E5E5]"
                />
                <Button
                    size="sm"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF]"
                    onClick={headerConfig.buttonAction}
                >
                    {headerConfig.buttonText}
                </Button>
            </div>

            {/* Table with Pagination */}
            <PaginationHandler items={filteredData} itemsPerPage={10}>
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
        </Card>
    )
}

export default DownlineMembersTable
