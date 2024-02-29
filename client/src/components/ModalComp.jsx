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
import { isEmpty } from "lodash";

//Recebe as propriedades:
//data(mostra os dados na tela), setData (atualiza os dados)
//dataEdit(dados a serem editados),
const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  //Utiliza o hook useState para gerenciar o estado do login, name...
  const [login, setLogin] = useState(dataEdit.login || "");
  const [name, setName] = useState(dataEdit.name || "");
  const [nickname, setNickname] = useState(dataEdit.nickname || "");
  const [date, setDate] = useState(dataEdit.date || "");
  const [nameError, setNameError] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameDirty, setNicknameDirty] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginDirty, setLoginDirty] = useState(false);
  const [dateError, setDateError] = useState("");
  const [dateDirty, setDateDirty] = useState(false);

  const handleSave = () => {
    console.log(dataEdit.iduser);

    if (isEmpty(login)) {
      setLoginError("Login is required.");
      setLoginDirty(true);
    } else {
      setLoginError("");
    }

    if (isEmpty(name)) {
      setNameError("Name is required.");
      setNameDirty(true);
    } else {
      setNameError("");
    }

    if (isEmpty(nickname)) {
      setNicknameError("Nickname is required.");
      setNicknameDirty(true);
    } else {
      setNicknameError("");
    }

    if (isEmpty(date)) {
      setDateError("Date is required.");
      setDateDirty(true);
    } else {
      setDateError("");
    }

    if (isEmpty(login) || isEmpty(name) || isEmpty(nickname) || isEmpty(date)) {
      return;
    }

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
          // setData(response.data);
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
                  borderColor={
                    loginDirty && isEmpty(login) ? "red" : "gray.300"
                  }
                />
                <Box color={loginDirty && isEmpty(login) ? "red" : "gray.700"}>
                  {loginError}
                </Box>
              </Box>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  borderColor={nameDirty && isEmpty(name) ? "red" : "gray.300"}
                />
                <Box color={nameDirty && isEmpty(name) ? "red" : "gray.700"}>
                  {nameError}
                </Box>
              </Box>
              <Box>
                <FormLabel>Apelido</FormLabel>
                <Input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                  borderColor={
                    nicknameDirty && isEmpty(nickname) ? "red" : "gray.300"
                  }
                />
                <Box
                  color={
                    nicknameDirty && isEmpty(nickname) ? "red" : "gray.700"
                  }
                >
                  {nicknameError}
                </Box>
              </Box>
              <Box>
                <FormLabel>Data</FormLabel>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  // onChange={handleDateChange}
                  borderColor={dateDirty && isEmpty(date) ? "red" : "gray.300"}
                />
                <Box color={dateDirty && isEmpty(date) ? "red" : "gray.700"}>
                  {dateError}
                </Box>
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

///////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////aqui

// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Box,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { isEmpty } from "lodash";

// //Recebe as propriedades:
// //data(mostra os dados na tela), setData (atualiza os dados)
// //dataEdit(dados a serem editados),
// const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
//   //Utiliza o hook useState para gerenciar o estado do login, name...
//   const [login, setLogin] = useState(dataEdit.login || "");
//   const [name, setName] = useState(dataEdit.name || "");
//   const [nickname, setNickname] = useState(dataEdit.nickname || "");
//   const [date, setDate] = useState(dataEdit.date || "");
//   // const [nameError, setNameError] = useState("");
//   // const [nameDirty, setNameDirty] = useState(false);
//   // const [nicknameError, setNicknameError] = useState("");
//   // const [nicknameDirty, setNicknameDirty] = useState(false);
//   const [userForm, setUserForm] = useState({
//     login: "",
//     name: "",
//     // nickname: "",
//     // date: "",
//   });

//   const [errors, setErrors] = useState({
//     login: null,
//     name: null,
//     // nickname: null,
//     // date: null,
//   });

//   const handleSave = () => {
//     let formIsValid = true;
//     console.log(dataEdit.iduser);

//     if (isEmpty(userForm.login)) {
//       setErrors((prev) => ({ ...prev, login: "Login is required." }));
//       formIsValid = false;
//     } else {
//       setErrors((prev) => ({ ...prev, login: null }));
//     }

//     if (isEmpty(userForm.name)) {
//       setErrors((prev) => ({ ...prev, name: "Name is required." }));
//       formIsValid = false;
//     } else {
//       setErrors((prev) => ({ ...prev, name: null }));
//     }

//     if (isEmpty(userForm.nickname)) {
//       setErrors((prev) => ({ ...prev, nickname: "Nickname is required." }));
//       formIsValid = false;
//     } else {
//       setErrors((prev) => ({ ...prev, nickname: null }));
//     }

//     if (isEmpty(userForm.date)) {
//       setErrors((prev) => ({ ...prev, date: "Date is required." }));
//       formIsValid = false;
//     } else {
//       setErrors((prev) => ({ ...prev, date: null }));
//     }

//     if (dataEdit.iduser) {
//       axios
//         .put("http://localhost:3001/edit/" + dataEdit.iduser, {
//           id: dataEdit.iduser,
//           name,
//           login,
//           nickname,
//           date,
//         })
//         .then((response) => {
//           toast.success("Usuário editado, com sucesso!");
//           console.log(response);
//           // setData(response.data);
//           onClose();
//         })
//         .catch((error) => {
//           toast.error("Erro ao editar usuário!");
//           console.error(error);
//         });
//     } else {
//       axios
//         .post("http://localhost:3001/register", { name, login, nickname, date })

//         .then((response) => {
//           toast.success("Usuário cadastrado, com sucesso!", {
//             theme: "dark",
//           });
//           console.log(response);
//           onClose();
//         })
//         .catch((error) => {
//           toast.error("Erro ao cadastrar usuário!", {
//             autoClose: 3000,
//             theme: "dark",
//           });
//           console.error(error);
//         });
//     }
//   };

//   // const handleDateChange = function (e) {
//   //   console.log(e.target.value);
//   // };

//   return (
//     <>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Cadastro de Clientes</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl display="flex" flexDir="column" gap={4}>
//               <Box>
//                 <FormLabel>Login</FormLabel>
//                 <Input
//                   type="text"
//                   required
//                   placeholder="Digite o login"
//                   value={userForm.login}
//                   onChange={(e) =>
//                     setLogin(e.target.value) &&
//                     setUserForm((prev) => ({ ...prev, login: e.target.value }))
//                   }
//                 />
//                 {errors?.login && (
//                   <p className="error-message">{errors?.login}</p>
//                 )}
//               </Box>
//               <Box>
//                 <FormLabel>Nome</FormLabel>
//                 <Input
//                   type="text"
//                   // onChange={(e) => setName(e.target.value)}
//                   required
//                   placeholder="Digite o nome"
//                   // value={userForm.name}
//                   value={userForm.name}
//                   onChange={(e) =>
//                     setName(e.target.value) &&
//                     setUserForm((prev) => ({ ...prev, name: e.target.value }))
//                   }
//                 />
//                 {errors?.name && (
//                   <p className="error-message">{errors?.name}</p>
//                 )}
//               </Box>
//               <Box>
//                 <FormLabel>Apelido</FormLabel>
//                 <Input
//                   type="text"
//                   value={nickname}
//                   onChange={(e) => setNickname(e.target.value)}
//                   required
//                   borderColor={
//                     nicknameDirty && isEmpty(nickname) ? "red" : "gray.300"
//                   }
//                 />
//                 <Box
//                   color={
//                     nicknameDirty && isEmpty(nickname) ? "red" : "gray.700"
//                   }
//                 >
//                   {nicknameError}
//                 </Box>
//               </Box>
//               <Box>
//                 <FormLabel>Data</FormLabel>
//                 <Input
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   required
//                   // onChange={handleDateChange}
//                 />
//               </Box>
//             </FormControl>
//           </ModalBody>

//           <ModalFooter justifyContent="end">
//             <Button colorScheme="green" mr={3} onClick={handleSave}>
//               SALVAR
//             </Button>
//             <Button colorScheme="red" onClick={onClose}>
//               CANCELAR
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default ModalComp;

// ///////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////aqui
