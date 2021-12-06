// import axios from "axios";
import { useState } from "react";

import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Table, TableCaption, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { useCallback } from "react";
import { MakeEmailModal } from "./MakeEmailModal";

export const DisplayApps = (props) => {
  const { apps } = props;
  console.log("DisplayApps");
  /* chakra UI modal hooks*/
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [target_user, setTargetUser] = useState();

  const onClickTest = useCallback((e) => {
    const button_id = parseInt(e.target.id);
    const targetUser = apps.find((app) => app.id === button_id);
    setTargetUser(targetUser);
    console.log(targetUser);
    onOpen();
  }, []);

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <TableCaption> BINDS application list </TableCaption>
        <Tbody>
          {apps
            .filter((app) => app.status.includes("支援中"))
            .filter((app) => app.main_staff.includes("平田　邦生"))
            .map((app) => (
              <Tr key={app._id}>
                <Checkbox size="md" colorScheme="green" defaultIsChecked />
                <Td>{app.id}</Td>
                <Td>{app.username}</Td>
                <Td>{app.status}</Td>
                <Td>{app.main_staff}</Td>
                <Td>
                  <Button id={app.id} onClick={onClickTest} colorScheme="blue">
                    Generate E-mail
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <MakeEmailModal
        user={target_user}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </div>
  );
};
