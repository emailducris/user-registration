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
  Icon,
  InputGroup,
  Tooltip,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationComp from "./components/PaginationComp";
import PaginationCompSetas from "./components/PaginationCompSetas";
import DeleteUser from "./components/DeleteUser";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDataCopy, setFilteredDataCopy] = useState(data);
  const [currentPage, setCurrentPage] = useState(1); //Pagina corrente, inicia na pagina 01
  const [itemsPerPage] = useState(10); //Itens por página
  const totalPages = Math.ceil(filteredDataCopy.length / itemsPerPage); // Logica do total de paginas. Math.ceil() função pra não dar numero quebrado.

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

  //Função recebe o parâmetro iduser,
  //Filtra o array data para encontrar o usuário com o iduser
  //O filter retorna um novo array com o usuario
  const handleOnClick = (iduser) => {
    const editUser = data.filter((d) => d.iduser === iduser);

    setDataEdit(editUser[0]); //É atribuido como elemento inicial do array editUser
    onOpen();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredDataCopy(filteredData);
    setCurrentPage(1);
  };

  const filteredData = filteredDataCopy.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage; // 10(si) = 1(cp) * 10(ipp)
  const endIndex = startIndex + itemsPerPage; //20(ei) = 10(si) + 10(ipp)
  const currentItems = filteredData.slice(startIndex, endIndex); //(10)ci = 10(si), 20(ei)
  //Cria um novo array, para ser renderizado na tela na tabela

  const handleDelete = (iduser) => {
    const newArray = data.filter((item) => item.iduser !== iduser);
    setData(newArray);
    setFilteredDataCopy(newArray);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        // fontFamily="poppins"
        font-family="poppins"
        // fontFamily="poppins, sans-serif"
        // fontFamily="Roboto, sans-serif"
        // fontFamily="Open Sans, sans-serif"
        // fontFamily="Lato"
        // fontFamily="Lato, sans-serif"
        // fontFamily="Noto Sans Khojki"
        // font-family="Noto Sans HK"
        // font-family="Oswald"
      >
        <Box
          padding={200}
          maxW={1100}
          w="100%"
          py={10}
          px={3}
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
              padding={6}
              marginStart={8}
              // fontSize={14}
              size="sm"
              colorScheme="blue"
              onClick={() => [setDataEdit({}), onOpen()]}
            >
              NOVO CADASTRO
            </Button>
            <FormControl>
              <Box>
                <InputGroup pr={5}>
                  <Input
                    maxWidth={300}
                    marginLeft={595}
                    type="text"
                    placeholder={"Pesquisar usuário"}
                    value={searchTerm}
                    onChange={handleSearch}
                    borderRadius="md"
                    paddingLeft="42px"
                  />
                  <Icon
                    maxWidth={300}
                    marginLeft={595}
                    as={SearchIcon}
                    position="absolute"
                    top="50%"
                    transform="translateY(-50%)"
                    left="12px"
                    color="gray.400"
                  />
                </InputGroup>
              </Box>
            </FormControl>
          </Box>
          <Spacer />
          <Box overflowY="auto" height="100%">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th ps={10} fontSize="21px">
                    Login
                  </Th>
                  {/* <Th fontSize="20px">Nome</Th>
                  <Th fontSize="20px">Apelido</Th>
                  <Th fontSize="20px">Data</Th> */}
                  <Th fontSize="21px">Nome</Th>
                  <Th fontSize="21px">Apelido</Th>
                  <Th fontSize="21px">Data</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((user) => (
                  <Tr
                    fontSize="18px"
                    ps={10}
                    key={user.iduser}
                    _hover={{ bg: "gray.100" }}
                  >
                    <Td ps={10}>{user.login}</Td>
                    <Td fontSize="18px">{user.name}</Td>
                    <Td>{user.nickname}</Td>
                    {/* Cria um novo objeto de data, passa para string e extrai os primeiros 10 digitos  */}
                    <Td>{new Date(user.date).toISOString().slice(0, 10)}</Td>
                    {/* <Td p={0}></Td>
                    <Td p={0}></Td> */}
                    <Td pe={1}>
                      <Tooltip label="Clique aqui para editar">
                        <EditIcon
                          onClick={() => handleOnClick(user.iduser)}
                          cursor="pointer"
                          _hover={{ color: "blue.500" }}
                        />
                      </Tooltip>
                    </Td>
                    <Td pe={2}>
                      <Tooltip label="Clique aqui para excluir">
                        <DeleteUser
                          iduser={user.iduser}
                          onDelete={handleDelete}
                        />
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <PaginationCompSetas
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
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
    </>
  );
};

export default App;
