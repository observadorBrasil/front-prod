/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import Select from 'react-select'
import DonutChart from '../../Charts/DonutChart/DonutChart'
import { Spinner } from '@chakra-ui/react'
import { Search } from '@prisma/client'

interface SelectFolderType {
  id: number
  data: any[]
  label: string
}

interface DonutAreaProps {
  handleGetPl: (id: number, label: string) => void
  selectedFolder: SelectFolderType
  searches: Search[]
  actionLoading: boolean
}

type StatusCount = {
  [key: string]: number
}

export default function DonutArea({
  handleGetPl,
  selectedFolder,
  searches,
  actionLoading,
}: DonutAreaProps) {
  return (
    <div className="mt-5 mb-5 relative">
      <Select
        onChange={(e) => handleGetPl(e!.value, e!.label)}
        options={searches.map((s) => {
          return { value: s.id, label: s.name }
        })}
        className="max-w-[300px]"
        placeholder="Selecione um filtro"
      ></Select>
      <span className="text-aditional-black-blue font-bold text-xs">
        {selectedFolder.label}
      </span>
      {useMemo(() => {
        if (
          !selectedFolder ||
          !selectedFolder.data ||
          selectedFolder.data.length === 0
        ) {
          return <DonutChart series={[100]} labels={['vazio']}></DonutChart>
        }

        const statusCounts: StatusCount =
          selectedFolder.data.reduce<StatusCount>((acc, item) => {
            const status = item.searchResultStatus.description

            if (acc[status]) {
              acc[status] += 1
            } else {
              acc[status] = 1
            }
            return acc
          }, {})

        const series = Object.values(statusCounts)
        const labels = Object.keys(statusCounts)

        return (
          <>
            {actionLoading ? (
              <div className="absolute top-28 left-32">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            ) : (
              <DonutChart series={series} labels={labels}></DonutChart>
            )}
          </>
        )
      }, [selectedFolder, actionLoading])}
    </div>
  )
}
