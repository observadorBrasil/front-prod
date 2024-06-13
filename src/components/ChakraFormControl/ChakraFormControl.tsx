import React, { ReactNode } from 'react'
import {
  FormControl,
  FormControlProps as ChakraFormControlProps,
} from '@chakra-ui/react'

interface CustomFormControlProps extends ChakraFormControlProps {
  children: ReactNode
}

function ChakraFormControl({ children, ...props }: CustomFormControlProps) {
  return <FormControl {...props}>{children}</FormControl>
}

export default ChakraFormControl
