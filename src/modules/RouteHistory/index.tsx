import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Loading } from '../../components/Loading'

export interface HistoryItem {
  label?: string
  url: string
  isCurrentPage: boolean
}

interface Props {
  history: HistoryItem[]
}

export default function RouteHistory(props: Props) {
  const { history } = props

  return (
    <Breadcrumb>
      {history.map((h: HistoryItem, i: number) => {
        return (
          <BreadcrumbItem key={i}>
            {h.label ? (
              <BreadcrumbLink isCurrentPage={h.isCurrentPage} href={h.url}>
                {h.label}
              </BreadcrumbLink>
            ) : (
              <Loading />
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
