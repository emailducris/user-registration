import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const PaginationCompSetas = ({ totalPages, currentPage, setCurrentPage }) => {
  const disabledStyle = {
    pointerEvents: "none",
    color: "gray.200",
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      //   justifyContent="end"
      alignItems="center"
      mt="10"
      gap={20}
      color={"gray.600"}
    >
      {currentPage > 1 && (
        <ArrowLeftIcon
          cursor="pointer"
          title="Anterior"
          _hover={{ color: "blue.500" }}
          style={currentPage === 1 ? disabledStyle : {}}
          onClick={() => setCurrentPage(currentPage - 1)}
          //   disabled={currentPage === 1}
        />
      )}
      <Text>
        {currentPage}
        {/* {currentPage}-{totalPages} */}
      </Text>
      {currentPage < totalPages && (
        <ArrowRightIcon
          cursor="pointer"
          title="Próxima"
          _hover={{ color: "blue.500" }}
          onClick={() => setCurrentPage(currentPage + 1)}
          style={currentPage === totalPages ? disabledStyle : {}}
          //   opacity={currentPage === totalPages ? 0.5 : 1}
          //   disabled={currentPage === totalPages}
        />
      )}
    </Box>
  );
};

export default PaginationCompSetas;
