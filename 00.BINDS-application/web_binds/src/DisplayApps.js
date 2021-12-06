// import axios from "axios";
// import { useState } from "react";

import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Table, TableCaption, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { useCallback } from "react";

export const DisplayApps = (props) => {
    const { apps } = props;
    console.log("DisplayApps");
    /* chakra UI modal hooks*/
    const {isOpen, onOpen, onClose} = useDisclosure();
    
    const onClickTest = useCallback(()=>onOpen(),[]);

    const selectFunc=(app)=>{
        return(app.status==="支援中");
    }

    return (
        <div>
            <Table variant="striped" colorScheme="teal">
                <TableCaption> BINDS application list </TableCaption>
                <Tbody>
                {apps.filter(app => app.status.includes("支援中")).map((app) => (
                    <Tr key={app._id}>
                          <Checkbox size="md" colorScheme="green" defaultIsChecked />
                        <Td>
                            {app.id}
                        </Td>
                        <Td>
                            {app.username}
                        </Td>
                        <Td>
                            {app.status}
                        </Td>
                        <Td>
                            {app.main_staff}
                        </Td>
                        <Td>
                        <Button onClick={onClickTest} colorScheme="blue"> Modify </Button>
                        </Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <p> test </p>
                </ModalContent>
            </Modal>
        </div>
    );
};
