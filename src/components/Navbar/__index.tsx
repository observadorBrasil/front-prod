/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  HStack,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  UpOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";

import Image from "next/image";
import theme from "../../theme/index";
import { useAppSelector } from "../../store/hooks";
import routes, { NavItem } from "./routes";
import { selectUser } from "../../../src/store/slices/user";
import Link from "../Link";
import { selectNotification } from "../../../src/store/slices/notification";

export default function Navbar() {
  const user = useAppSelector(selectUser);
  const { hasNotifications } = useAppSelector(selectNotification);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={theme.colors.primary}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={"space-between"}
        backgroundColor={"white"}
      >
        <div
          style={{
            width: "1350px",
          }}
        >
          <Image
            width={135}
            height={135 / 3.132}
            src={"/images/observatorio_brasil_logo.png"}
            alt="Logo"
          />
        </div>
        {user && (
          <Stack
            flex={{ base: 1, md: 0 }}
            display={{ base: "none", md: "flex" }}
            justify={"flex-end"}
            align={"center"}
            direction={"row"}
            spacing={6}
          >
            <Link href="/">
              <Button
                variant="ghost"
                colorScheme="primary"
                size="sm"
                fontWeight="semibold"
                fontSize="sm"
                px={2}
                py={1}
                mr={2}
              >
                <Avatar
                  bg="none"
                  size="sm"
                  showBorder={false}
                  icon={
                    <BellOutlined
                      style={{
                        fontSize: 22,
                        color: useColorModeValue(
                          theme.colors.primary,
                          "gray.800"
                        ),
                      }}
                    />
                  }
                >
                  {hasNotifications && (
                    <AvatarBadge boxSize="1.25em" bg="red.500" />
                  )}
                </Avatar>
              </Button>
            </Link>
            <Link href="/logout">
              <Button
                variant="ghost"
                colorScheme="primary"
                size="sm"
                fontWeight="semibold"
                fontSize="sm"
                px={2}
                py={1}
                mr={2}
              >
                <LogoutOutlined
                  style={{
                    fontSize: 22,
                    color: useColorModeValue("primary", "gray.800"),
                  }}
                />
              </Button>
            </Link>
          </Stack>
        )}
      </Flex>
      <Flex
        bg={theme.colors.primary}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseOutlined width={3} height={3} />
              ) : (
                <MenuOutlined width={5} height={5} />
              )
            }
            variant={"ghost"}
            color="white"
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center" }}
          display={{ base: "none", md: "flex" }}
          alignItems={"center"}
        >
          <DesktopNav />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = theme.colors.secondary;
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} marginTop={1}>
      {routes.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={UpOutlined} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {routes.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <HStack w={"full"} align={"center"} justify={"space-between"}>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Flex>
        {children && (
          <Icon
            as={DownOutlined}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </HStack>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) =>
              child.href && child.href.endsWith("busca-avancada") ? null : (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              )
            )}
        </Stack>
      </Collapse>
    </Stack>
  );
};
