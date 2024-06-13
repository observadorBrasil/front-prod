import React from 'react'
import Select, {
  Props as SelectProps,
  GroupBase,
  CSSObjectWithLabel,
} from 'react-select'

interface Option {
  value: string
  label: string
}

interface DashboardSelectProps
  extends Omit<SelectProps<Option, false, GroupBase<Option>>, 'options'> {
  options: Option[]
  text: string
}

const DashboardSelect: React.FC<DashboardSelectProps> = ({
  options,
  text,
  ...props
}) => {
  const formattedOptions: Option[] = options.map((c) => ({
    value: c.value,
    label: c.label, // Corrigido para usar c.label
  }))

  return (
    <Select
      options={formattedOptions}
      placeholder={text}
      styles={{
        container: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
          ...provided,
          maxWidth: '300px',
          marginBottom: '1rem',
        }),
      }}
      {...props}
    />
  )
}

export default DashboardSelect
