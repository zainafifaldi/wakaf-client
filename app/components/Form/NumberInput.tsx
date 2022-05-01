import {
  HStack,
  Button,
  Input,
  useNumberInput,
} from '@chakra-ui/react';

export default function NumberInput({
  defaultValue = 0,
  min,
  max,
  disabled = false,
  onChange = (value) => {},
}) {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } = useNumberInput({
    defaultValue,
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
      <Button {...dec}>
        -
      </Button>
      <Input textAlign='center' {...input} />
      <Button {...inc}>
        +
      </Button>
    </HStack>
  )
}
