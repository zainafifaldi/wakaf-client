import { Box, ComponentDefaultProps, useStyleConfig } from "@chakra-ui/react";
import { ReactNode } from "react";

interface MainPanelProps extends ComponentDefaultProps {
  variant?: string;
  children?: ReactNode;
}

export default function MainPanel({
  variant,
  children,
  ...rest
}: MainPanelProps) {
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
