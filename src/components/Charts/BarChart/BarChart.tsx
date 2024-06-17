// components/MyChart.js
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const BarChart = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
  }

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ]

  if (!mounted) return null

  return (
    <div className="2xl:max-w-[96%] xxl:max-w-[99%] h-full md:min-h-[340px]">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={'100%'}
      />
    </div>
  )
}

export default BarChart
