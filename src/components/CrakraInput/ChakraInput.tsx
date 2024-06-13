import React from 'react'
import { Input, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CustomChakraInputProps extends ChakraInputProps {
  rhfregister?: UseFormRegisterReturn
}

function ChakraInput({ rhfregister, ...props }: CustomChakraInputProps) {
  return <Input size={'md'} {...props} {...rhfregister} />
}

export default ChakraInput
