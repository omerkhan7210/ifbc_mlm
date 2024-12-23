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
// import { FormatRawDate } from '@/utils/FormatRawDate.js'
// import { FormatRawDate } from '../../../utils/FormatRawDate.js'
const { Tr, Td, TBody, THead, Th } = Table

type TreeViewItem = {
    docId: number
    firstName: string
    lastName: string
    email: string
    phone: string
    pipelineStep: string
    refferralId: number
    localDocDate: string | null
    territoryCity: string
    territoryState: string
    updateDt: string | null
    profileImage: string
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
            email: string
            firstName: string
            lastName: string
        }[]
    >([])

    useEffect(() => {
        handleGetValue(selectRowName)
    }, [selectRowName])
    // Filter logic: Search across all fields
    const safeToLower = (value: string | null | undefined) => {
        return value ? value.toLowerCase() : ''
    }

    const filteredData = data?.filter((item) => {
        const searchLower = searchQuery?.toLowerCase()

        return (
            safeToLower(item.firstName).includes(searchLower) ||
            safeToLower(item.lastName).includes(searchLower) ||
            safeToLower(item.email).includes(searchLower) ||
            safeToLower(item.phone).includes(searchLower) ||
            safeToLower(item.pipelineStep).includes(searchLower) ||
            safeToLower(item.territoryCity).includes(searchLower) ||
            safeToLower(item.territoryState).includes(searchLower)
        )
    })
    const toggleRowSelection = (item: TreeViewItem) => {
        setSelectRowName((prev) => {
            const exist = prev.some((row) => row.docId === item?.docId)
            return exist
                ? prev.filter((row) => row.docId !== item?.docId)
                : [
                      ...prev,
                      {
                          docId: item?.docId,
                          email: item?.email,
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
                      docId: item?.docId,
                      email: item?.email,
                      firstName: item?.firstName,
                      lastName: item?.lastName,
                  }))
                : [],
        )
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return ''

        const date = new Date(dateString)

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }

    const capitalizeFirstLetter = (name: string) => {
        if (!name) return ''
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
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
                        (row) => row?.docId === props.row.original.docId,
                    )}
                    onChange={() => toggleRowSelection(props.row.original)}
                />
            ),
        }),
        columnHelper.accessor('docId', {
            header: 'ID',
            cell: (props) => <span>{props.row.original.docId}</span>,
        }),
        columnHelper.accessor('profileImage', {
            header: 'Profile Image',
            cell: (props) => (
                <span>
                    <img
                        src={
                            props.row.original.profileImage ||
                            'https://ifbc.co/images/consultant-placeholer.jpg'
                        }
                        alt={props.row.original.firstName}
                        style={{
                            width: '70px',
                            height: '70px',
                            objectFit: 'contain',
                        }}
                    />
                </span>
            ),
        }),
        columnHelper.accessor('firstName', {
            header: 'First Name',
            cell: (props) => (
                <span>
                    {capitalizeFirstLetter(props.row.original.firstName)}
                </span>
            ),
        }),
        columnHelper.accessor('lastName', {
            header: 'Last Name',
            cell: (props) => (
                <span>
                    {capitalizeFirstLetter(props.row.original.lastName)}
                </span>
            ),
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: (props) => <span>{props.row.original.email}</span>,
        }),
        columnHelper.accessor('phone', {
            header: 'Phone',
            cell: (props) => <span>{props.row.original.phone}</span>,
        }),
        columnHelper.accessor('refferralId', {
            header: 'refferral Id',
            cell: (props) => <span>{props.row.original.refferralId}</span>,
        }),
        // columnHelper.accessor('territoryCity', {
        //     header: 'Territory City',
        //     cell: (props) => <span>{props.row.original.territoryCity}</span>,
        // }),
        // columnHelper.accessor('territoryState', {
        //     header: 'Territory State',
        //     cell: (props) => <span>{props.row.original.territoryState}</span>,
        // }),
        // columnHelper.accessor('localDocDate', {
        //     header: 'Date & Time',
        //     cell: (props) => (
        //         <span>{FormatRawDate(props.row.original.localDocDate)}</span>
        //     ),
        // }),
        columnHelper.accessor('localDocDate', {
            header: 'Date & Time',
            cell: (props) => (
                <span>{formatDate(props.row.original.localDocDate)}</span>
            ),
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
                    className="w-[45%] md:w-[30%] bg-[#E5E5E5]"
                />
                <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-400 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center text-white inline-flex items-center"
                    onClick={() => headerConfig.buttonAction('invitation')}
                    disabled={selectRowName.length === 0} // Disable if no rows selected
                >
                    Send Invitation
                </Button>
                <Button
                    size="sm"
                    className={`text-white inline-flex items-center ${
                        selectRowName.length > 10
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-400 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300'
                    } font-medium rounded-lg text-center`}
                    onClick={() => headerConfig.buttonAction('newEmail')}
                    disabled={
                        selectRowName.length === 0 || selectRowName.length > 10
                    }

                    // Disable the button if more than 10 emails are selected
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
