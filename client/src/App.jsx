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
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationComp from "./components/PaginationComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDataCopy, setFilteredDataCopy] = useState(data);
  const [currentPage, setCurrentPage] = useState(0); //Pagina corrente, inicia na pagina 01
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // const filteredData = data.filter((user) =>
    //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    setFilteredDataCopy(filteredData);
    setCurrentPage(1);
  };
  //Verificar essa função que está duplicada
  const filteredData = filteredDataCopy.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fatiar o array de itens
  const startIndex = currentPage * itemsPerPage; // 10(si) = 1(cp) * 10(ipp)
  const endIndex = startIndex + itemsPerPage; //20(ei) = 10(si) + 10(ipp)
  const currentItems = filteredData.slice(startIndex, endIndex);

  // const handleRemove = async (login) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3001/delete/${login}`
  //     );

  //     if (response.status === 200) {
  //       const newArray = data.filter((item) => item.login !== login);
  //       setData(newArray);
  //       setFilteredDataCopy(newArray);
  //       alert("Usuário excluido com sucesso!");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao remover cliente:", error);
  //   }
  // };

  const handleRemove = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/delete/${userId}`
      );

      if (response.status === 200) {
        const newArray = data.filter((item) => item.userId !== userId);
        setData(newArray);
        setFilteredDataCopy(newArray);
        toast.success("Usuário deletado, com sucesso!");
        toast.warning("Usuário deletado, com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao deletar usuário!");
      console.error(error);
    }
  };

  const handleOnClick = (iduser) => {
    const editUser = data.filter((d) => d.iduser === iduser);

    setDataEdit(editUser[0]);
    onOpen();
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
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
                <InputGroup>
                  <Input
                    maxWidth={300}
                    marginLeft={600}
                    type="text"
                    placeholder={"Pesquisar usuário"}
                    value={searchTerm}
                    onChange={handleSearch}
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
                  <Tr ps={10} key={user.iduser} _hover={{ bg: "gray.100" }}>
                    <Td ps={10}>{user.login}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.nickname}</Td>
                    {/* Cria um novo objeto de data, passa para string e extrai os primeiros 10 digitos  */}
                    <Td>{new Date(user.date).toISOString().slice(0, 10)}</Td>
                    <Td p={0}></Td>
                    <Td p={0}></Td>
                    <Td pe={1}>
                      <EditIcon
                        onClick={() => handleOnClick(user.iduser)}
                        cursor="pointer"
                        title="Clique aqui para editar o usuário"
                        _hover={{ color: "blue.500" }}
                      />
                    </Td>
                    <Td pe={6}>
                      <DeleteIcon
                        onClick={() => handleRemove(user.iduser)}
                        cursor="pointer"
                        title="Clique aqui para deletar o usuário"
                        _hover={{ color: "red.500" }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <PaginationComp
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////aqui////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/////////////////////aqui//////////////////////////////////////////////
