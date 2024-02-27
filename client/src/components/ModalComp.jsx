import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

//Recebe as propriedades:
//data(mostra os dados na tela), setData (atualiza os dados)
//dataEdit(dados a serem editados),
const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  //Utiliza o hook useState para gerenciar o estado do login, name...
  const [login, setLogin] = useState(dataEdit.login || "");
  const [name, setName] = useState(dataEdit.name || "");
  const [nickname, setNickname] = useState(dataEdit.nickname || "");
  const [date, setDate] = useState(dataEdit.date || "");

  const handleSave = () => {
    console.log(dataEdit.iduser);

    if (dataEdit.iduser) {
      axios
        .put("http://localhost:3001/edit/" + dataEdit.iduser, {
          id: dataEdit.iduser,
          name,
          login,
          nickname,
          date,
        })
        .then((response) => {
          console.log(response);
          alert("Editado com sucesso");
          onClose();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3001/register", { name, login, nickname, date })
        .then((response) => {
          console.log(response);
          onClose();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Login</FormLabel>
                <Input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Apelido</FormLabel>
                <Input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Data</FormLabel>
                <Input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="end">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
