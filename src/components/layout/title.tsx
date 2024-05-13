import { Link as ChakraLink, HStack, Heading, Icon } from "@chakra-ui/react";
import type { RefineLayoutThemedTitleProps } from "@refinedev/chakra-ui";
import { useLink, useRouterContext, useRouterType } from "@refinedev/core";
import { BoxIcon } from "lucide-react";
import React from "react";

const defaultText = "Atma Kitchen";

const defaultIcon = <BoxIcon size={24} />;

export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  icon = defaultIcon,
  text = defaultText,
  wrapperStyles,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  return (
    <ChakraLink
      as={ActiveLink}
      to="/"
      fontSize="inherit"
      textDecoration="none"
      _hover={{
        textDecoration: "none",
      }}
    >
      <HStack
        spacing="8px"
        justifyContent="center"
        alignItems="center"
        fontSize="inherit"
        style={{
          ...wrapperStyles,
        }}
      >
        <Icon height="24px" width="24px" color="brand.500">
          {icon}
        </Icon>

        {!collapsed && (
          <Heading as="h6" fontWeight={700} fontSize="inherit">
            {text}
          </Heading>
        )}
      </HStack>
    </ChakraLink>
  );
};
