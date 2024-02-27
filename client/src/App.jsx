import { EditIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Spacer,
  Input,
  FormControl,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import axios from "axios";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDataCopy, setFilteredDataCopy] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const totalPages = Math.ceil(filteredDataCopy.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/get/");
        setData(response.data);
        setFilteredDataCopy(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data, setData, dataEdit]);

  const handleRemove = async (login) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/delete/${login}`
      );

      if (response.status === 200) {
        const newArray = data.filter((item) => item.login !== login);
        setData(newArray);
        setFilteredDataCopy(newArray);
        alert("Usuário excluido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
    }
  };

  const handleOnClick = (iduser) => {
    const editUser = data.filter((d) => d.iduser === iduser);

    setDataEdit(editUser[0]);
    onOpen();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const filteredData = data.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDataCopy(filteredData);
    setCurrentPage(1);
  };

  const filteredData = filteredDataCopy.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box
        padding={200}
        maxW={1100}
        w="100%"
        py={10}
        px={2}
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="4"
        >
          <Button
            padding={5}
            marginStart={5}
            fontSize={12}
            colorScheme="blue"
            onClick={() => [setDataEdit({}), onOpen()]}
          >
            NOVO CADASTRO
          </Button>
          <FormControl>
            <Box>
              <Input
                maxWidth={300}
                marginLeft={600}
                type="text"
                placeholder={"Pesquisar usuário"}
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
          </FormControl>
        </Box>
        <Spacer />
        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th ps={10} fontSize="20px">
                  Login
                </Th>
                <Th fontSize="20px">Nome</Th>
                <Th fontSize="20px">Apelido</Th>
                <Th fontSize="20px">Data</Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentItems.map((user) => (
                <Tr ps={10} key={user.iduser}>
                  <Td ps={10}>{user.login}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.nickname}</Td>
                  <Td>{user.date}</Td>
                  <Td p={0}></Td>
                  <Td p={0}></Td>
                  <Td pe={1}>
                    <EditIcon
                      onClick={() => handleOnClick(user.iduser)}
                      cursor="pointer"
                    />
                  </Td>
                  <Td pe={6}>
                    <DeleteIcon
                      onClick={() => handleRemove(user.login)}
                      cursor="pointer"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="4"
            me={10}
            ms={10}
          >
            {currentPage > 1 && (
              <Button
                colorScheme="blue"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Anterior
              </Button>
            )}
            <Text>{currentPage}</Text>
            {currentPage < totalPages && (
              <Button
                colorScheme="blue"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Próxima
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;