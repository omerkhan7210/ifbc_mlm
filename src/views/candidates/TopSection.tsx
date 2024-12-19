import { useAuth } from '@/auth'
import { CSVLink } from 'react-csv'
import Select from 'react-select'

export const TopButtonsSection = ({
    handle,
    setSwitchFormat,
    stepOptions,
    handleStepFilterChange,
    switchFormat,
    filteredCandidates,
    setShowTable,
    showTable,
    setGetAllConsultantsFilterData,
    handleConsultantsFilter,
}) => {
    const { user } = useAuth()
    const buttonClass =
        'flex items-center justify-center w-full bg-[#001136] rounded-sm py-2 px-4 text-sm bg-custom-heading-color text-white '
    return (
        <div className="grid p-3 max-md:grid-cols-1 md:grid-cols-5 left-0 gap-2 z-20">
            <button onClick={handle.enter} className={buttonClass}>
                Enter Full Screen
            </button>

            <button
                onClick={() =>
                    setSwitchFormat(switchFormat === 'graph' ? 'grid' : 'graph')
                }
                className={buttonClass}
            >
                {switchFormat === 'graph'
                    ? 'Switch to Grid'
                    : 'Switch to Graph'}
            </button>

            <ExportButtons
                candidates={filteredCandidates}
                switchFormat={switchFormat}
            />
            <Select
                isMulti
                options={stepOptions}
                onChange={handleStepFilterChange}
            />
            {user?.email === 'info@ifbc.co' && (
                <Select
                    isMulti
                    options={setGetAllConsultantsFilterData}
                    onChange={handleConsultantsFilter}
                />
            )}
        </div>
    )
}

const ExportButtons = ({ candidates, switchFormat }) => {
    const exportAsPNG = () => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
            const context = canvas.getContext('2d')
            context.globalCompositeOperation = 'destination-over'
            context.fillStyle = '#ffffff' // Set white background
            context.fillRect(0, 0, canvas.width, canvas.height)

            const link = document.createElement('a')
            link.href = canvas.toDataURL('image/png')
            link.download = 'candidates.png'
            link.click()
        }
    }

    const csvData = candidates.map((cand) => ({
        firstName: cand.firstName,
        lastName: cand.lastName,
        email: cand.email,
        phone: cand.phone,
        pipelineStep: cand.pipelineStep,
    }))

    return (
        <>
            {switchFormat == 'graph' && (
                <div className="flex items-center bg-[#001136]">
                    <button
                        onClick={exportAsPNG}
                        className=" py-2 px-4 text-sm w-full bg-custom-heading-color text-white rounded "
                    >
                        Export as PNG
                    </button>
                </div>
            )}
            <div className="flex items-center bg-[#001136]">
                <CSVLink
                    data={csvData}
                    filename={`candidates_${new Date().toLocaleDateString()}.csv`}
                    className=" py-2 px-4 text-center text-sm w-full bg-custom-heading-color text-white rounded"
                >
                    Export as CSV
                </CSVLink>
            </div>
        </>
    )
}
