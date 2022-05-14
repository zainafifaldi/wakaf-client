import {
  IconButton,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { BiCopy } from 'react-icons/bi';

interface ButtonCopyProps {
  ariaLabel?: string;
  copyText: string | number;
}

export default function ButtonCopy({
  ariaLabel = 'Copy',
  copyText,
}: ButtonCopyProps) {
  const toast = useToast();

  function handleCopy() {
    try {
      navigator.clipboard.writeText(`${copyText}`);
      toast({
        description: 'Teks berhasil dicopy',
        status: 'success',
        duration: 1500,
      });
    } catch (error) {
      toast({
        description: 'Gagal mengcopy teks',
        status: 'error',
        duration: 1500,
      });
    }
  }

  return (
    <IconButton
      aria-label={ariaLabel}
      icon={<Icon as={BiCopy} w="5" h="5" />}
      bg="transparent"
      onClick={handleCopy}
    />
  )
}
