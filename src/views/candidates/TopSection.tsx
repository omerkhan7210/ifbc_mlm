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
}) => {
    return (
        <div className="grid p-3 max-md:grid-cols-1 md:grid-cols-5 sticky top-0 left-0 gap-2  z-999">
            <div className="flex items-center justify-center w-full bg-[#001136] rounded-sm">
                <button
                    onClick={handle.enter}
                    className=" py-2 px-4 text-sm  w-full bg-custom-heading-color text-white rounded"
                >
                    Enter Full Screen
                </button>
            </div>
            <div className="flex items-center justify-center w-full bg-[#001136] rounded-sm">
                <button
                    onClick={() => setSwitchFormat(!switchFormat)}
                    className=" py-2 px-4 text-sm  w-full bg-custom-heading-color text-white rounded"
                >
                    {switchFormat ? 'Switch to Grid' : 'Switch to Graph'}
                </button>
            </div>{' '}
            <ExportButtons
                candidates={filteredCandidates}
                switchFormat={switchFormat}
            />
            <Select
                isMulti
                options={stepOptions}
                className="z-[99999999]"
                onChange={handleStepFilterChange}
            />
            <div className="flex items-center bg-[#001136]">
                <button
                    onClick={() => setShowTable(true)}
                    className=" py-2 px-4 text-center text-sm w-full bg-custom-heading-color text-white rounded"
                >
                    {!showTable ? 'Show In table Form' : 'Hide In table Form'}
                </button>
            </div>
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
            {switchFormat && (
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
