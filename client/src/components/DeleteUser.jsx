import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteUser = ({ iduser, onDelete }) => {
  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/delete/${iduser}`
      );

      if (response.status === 200) {
        onDelete(iduser);
        toast.success("Usuário deletado, com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao deletar usuário!");
      console.error(error);
    }
  };

  return (
    <DeleteIcon
      onClick={() => handleRemove()}
      cursor="pointer"
      title="Clique aqui para deletar o usuário"
      _hover={{ color: "red.500" }}
    />
  );
};

export default DeleteUser;
// //NO APP
// const App = () => {
// const handleDelete = (iduser) => {
//   const newArray = data.filter((item) => item.iduser !== iduser);
//   setData(newArray);
//   setFilteredDataCopy(newArray);
// };

// return (
//   <Td pe={2}>
//     <DeleteUser iduser={user.iduser} onDelete={handleDelete} />
//   </Td>
// );
// };

// // A FUNÇÃO ANTES DE VIRAR COMPONENTE

// const handleRemove = async (iduser) => {
//   try {
//     const response = await axios.delete(
//       `http://localhost:3001/delete/${iduser}`
//     );

//     if (response.status === 200) {
//       const newArray = data.filter((item) => item.iduser !== iduser);
//       setData(newArray);
//       setFilteredDataCopy(newArray);
//       toast.success("Usuário deletado, com sucesso!");
//       toast.warning("Usuário deletado, com sucesso!");
//     }
//   } catch (error) {
//     toast.error("Erro ao deletar usuário!");
//     console.error(error);
//   }
// };
// return (
//   <Td pe={6}>
//     <DeleteIcon
//       onClick={() => handleRemove(user.iduser)}
//       cursor="pointer"
//       title="Clique aqui para deletar o usuário"
//       _hover={{ color: "red.500" }}
//     />
//   </Td>
// );
// export default App;
