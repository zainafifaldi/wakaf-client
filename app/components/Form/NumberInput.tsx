import {
  HStack,
  Button,
  Input,
  useNumberInput,
} from '@chakra-ui/react';

interface NumberInputProps {
  value: number;
  min: number;
  max: number;
  size?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: Function;
}

export default function NumberInput({
  min,
  max,
  value = 0,
  size = 'md',
  isDisabled = false,
  isInvalid = false,
  onChange = (value) => {},
}: NumberInputProps) {
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
