import {
  HStack,
  Button,
  Input,
  useNumberInput,
} from '@chakra-ui/react';

export default function NumberInput({
  value = 0,
  min,
  max,
  size = 'md',
  disabled = false,
  onChange = (value) => {},
}) {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } = useNumberInput({
    defaultValue: value,
    min,
    max,
    step: 1,
    precision: 0,
    isDisabled: disabled,
    onChange: (_, value) => onChange(value),
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW='320px'>
      <Button size={size} {...dec}>
        -
      </Button>
      <Input
        size={size}
        textAlign='center'
        {...input}
      />
      <Button size={size} {...inc}>
        +
      </Button>
    </HStack>
  )
}
