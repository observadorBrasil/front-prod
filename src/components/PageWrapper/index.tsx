import { Button, HStack, StackProps, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "@observatorio-brasil/atores/src/store/slices/user";
import { LeftOutlined } from "@ant-design/icons";
import Navbar from "../Navbar";
import theme from "../../theme/index";

interface Props {
  restricted?: boolean;
  children: ReactNode | ReactNode[];
  presentGoBack?: boolean;
  overrideGoBack?: () => void;
  containerProps?: StackProps;
}

const PageWrapper = (props: Props) => {
  const { children, restricted, presentGoBack, overrideGoBack } = props;

  const userState = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (restricted && !userState.user) {
      router.push("/login");
    }
  }, [restricted, userState.user, router]);
  return (
    <>
      {userState.user && <Navbar />}
      <VStack
        w={"full"}
        pl={{ base: 4, md: "10%" }}
        pr={{ base: 4, md: "10%" }}
        pt={"16px"}
        align={"center"}
        justify={"space-between"}
        {...props.containerProps}
      >
        {presentGoBack && (
          <HStack w={"full"} justify={"flex-start"} align={"center"}>
            <Button
              backgroundColor={"transparent"}
              color={"primary"}
              onClick={overrideGoBack ? overrideGoBack : router.back}
              pl={0}
            >
              <LeftOutlined
                style={{ color: theme.colors.primary, marginRight: 6 }}
              />
              voltar
            </Button>
          </HStack>
        )}
        {children}
      </VStack>
    </>
  );
};

export default PageWrapper;
