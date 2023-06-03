import {
  Box,
  ComponentDefaultProps,
  useStyleConfig
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface PanelContainerProps extends ComponentDefaultProps {
  variant?: string;
  children?: ReactNode;
}

function PanelContainer({
  variant,
  children,
  ...rest
}: PanelContainerProps) {
  const styles = useStyleConfig("PanelContainer", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}

export default PanelContainer;
