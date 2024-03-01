import React from "react";
import { Box, Button } from "@chakra-ui/react";

const PaginationComp = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt="10"
      me={10}
      ms={10}
    >
      {currentPage > 0 && (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </Button>
      )}
      {/* <Text>{currentPage}</Text> */}
      <Box>
        {Array.from(Array(totalPages), (item, index) => {
          return (
            <Button
              margin={1}
              style={index === currentPage ? { backgroundColor: "gray" } : null}
              value={index}
              onClick={(e) => setCurrentPage(Number(e.target.value))}
            >
              {index + 1}
            </Button>
          );
        })}
      </Box>
      {currentPage + 1 < totalPages && (
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Próxima
        </Button>
      )}
    </Box>
  );
};

export default PaginationComp;
