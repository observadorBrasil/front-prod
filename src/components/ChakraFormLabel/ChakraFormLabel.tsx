import React, { ReactNode } from 'react'
import {
  FormLabel,
  FormLabelProps as ChakraFormLabelProps,
} from '@chakra-ui/react'

interface CustomFormLabelProps extends ChakraFormLabelProps {
  children: ReactNode
}

function ChakraFormLabel({ children, ...props }: CustomFormLabelProps) {
  return <FormLabel {...props}>{children}</FormLabel>
}

export default ChakraFormLabel
