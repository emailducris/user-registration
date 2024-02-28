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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.success("Usuário editado, com sucesso!");
          console.log(response);
          onClose();
        })
        .catch((error) => {
          toast.error("Erro ao editar usuário!");
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:3001/register", { name, login, nickname, date })

        .then((response) => {
          toast.success("Usuário cadastrado, com sucesso!", {
            theme: "dark",
          });
          console.log(response);
          onClose();
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar usuário!", {
            autoClose: 3000,
            theme: "dark",
          });
          console.error(error);
        });
    }
  };

  // const handleDateChange = function (e) {
  //   console.log(e.target.value);
  // };

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
                  required
                />
              </Box>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>
              <Box>
                <FormLabel>Apelido</FormLabel>
                <Input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </Box>
              <Box>
                <FormLabel>Data</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  // onChange={handleDateChange}
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
