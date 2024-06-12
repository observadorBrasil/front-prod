import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Button from "../Button";

interface Props {
  title?: string | ReactNode;
  subtitle?: string;
  actions?: ReactNode | ReactNode[];
  children?: ReactNode | ReactNode[];
  collapsable?: boolean;
  initialCollapsed?: boolean;
}

const ContentBox = ({
  title,
  subtitle,
  actions,
  children,
  collapsable,
  initialCollapsed = false,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);
  return (
    <Box
      w={"full"}
      display={"flex"}
      alignContent={"flex-start"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      boxShadow={"0px 0px 6px 2px rgba(0, 0, 0, 0.25)"}
      borderRadius={10}
      p={6}
    >
      <HStack w={"full"} align={"center"} justify={"flex-start"}>
        {title && typeof title === "string" && (
          <Text fontSize={"xl"} fontWeight={"semibold"} flex={1}>
            {title}
          </Text>
        )}
        {title && typeof title !== "string" && <>{title}</>}
        {collapsable && (
          <Box
            display={"flex"}
            flex={1}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              border={"none"}
              variant="secondary"
            >
              Ver {isCollapsed ? "mais" : "menos"}
              <DownOutlined
                style={{
                  fontSize: 18,
                  rotate: isCollapsed ? "0deg" : "180deg",
                  marginLeft: 8,
                }}
              />
            </Button>
          </Box>
        )}
      </HStack>
      {subtitle && <Text fontSize={"md"}>{subtitle}</Text>}
      {!isCollapsed && (
        <VStack w={"full"} align={"flex-start"} justify={"flex-start"}>
          {children}
        </VStack>
      )}
      {actions && (
        <HStack pt={5} w={"full"} justify={"flex-end"}>
          {actions}
        </HStack>
      )}
    </Box>
  );
};

export default ContentBox;
