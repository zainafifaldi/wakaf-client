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
  isDisabled = false,
  isInvalid = false,
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
    isDisabled,
    isInvalid,
    step: 1,
    precision: 0,
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
        isInvalid={isInvalid}
        {...input}
      />
      <Button size={size} {...inc}>
        +
      </Button>
    </HStack>
  )
}
