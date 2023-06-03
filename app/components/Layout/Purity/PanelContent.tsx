import {
  Box,
  ComponentDefaultProps,
  useStyleConfig
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface PanelContentProps extends ComponentDefaultProps {
  variant?: string;
  children?: ReactNode;
}

function PanelContent({
  variant,
  children,
  ...rest
}: PanelContentProps) {
  const styles = useStyleConfig("PanelContent", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default PanelContent;
