/* eslint-disable @typescript-eslint/no-explicit-any */
// components/DonutChart.js
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface DonutChartProps {
  series: any[]
  labels: any[]
}

const DonutChart = ({ series, labels }: DonutChartProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const options = {
    labels: labels || [],
    chart: {
      id: 'basic-pie',
    },
    legend: {
      position: 'bottom' as const,
    },
    // labels: ['Apples', 'Oranges', 'Bananas', 'Berries', 'Grapes'],
    // responsive: [
    //   {
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200,
    //       },
    //       legend: {
    //         position: 'bottom',
    //       },
    //     },
    //   },
    // ],
  }

  if (!mounted) return null

  return (
    <div className="w-full h-full flex items-center">
      <Chart
        options={options}
        series={series || []}
        type="donut"
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default DonutChart
