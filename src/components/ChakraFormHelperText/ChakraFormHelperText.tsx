import React, { ReactNode } from 'react'
import {
  FormHelperText,
  FormHelperTextProps as ChakraFormHelperTextProps,
} from '@chakra-ui/react'
import { RiErrorWarningLine } from 'react-icons/ri'

interface CustomFormHelperTextProps extends ChakraFormHelperTextProps {
  children: ReactNode
}

function ChakraFormHelperText({
  children,
  ...props
}: CustomFormHelperTextProps) {
  return (
    <FormHelperText {...props}>
      <span className="text-aditional-red flex items-center gap-1">
        <RiErrorWarningLine />
        {children}
      </span>
    </FormHelperText>
  )
}

export default ChakraFormHelperText
