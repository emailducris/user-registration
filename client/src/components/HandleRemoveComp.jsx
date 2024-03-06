// import React from "react";
// import { DeleteIcon } from "@chakra-ui/icons";
// import axios from "axios";
// import { Td } from "@chakra-ui/react";

// const HandleRemoveComp = ({ userId, user, onSuccess, onError }) => {
//   const handleRemove = async () => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:3001/delete/${userId}`
//       );

//       if (response.status === 200) {
//         const newArray = data.filter((item) => item.userId !== userId);
//         setData(newArray);
//         setFilteredDataCopy(newArray);
//         toast.success("Usuário deletado, com sucesso!");
//         toast.warning("Usuário deletado, com sucesso!");

//         onSuccess();
//       }
//     } catch (error) {
//       toast.error("Erro ao deletar usuário!");
//       onError(error);
//     }
//   };

//   return (
//     <Td pe={2}>
//       <DeleteIcon
//         onClick={() => handleRemove(user.iduser)}
//         cursor="pointer"
//         title="Clique aqui para deletar o usuário"
//         _hover={{ color: "red.500" }}
//       />
//     </Td>
//   );
// };

// export default HandleRemoveComp;
