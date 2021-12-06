import { ChangeEvent, memo, ReactNode, useEffect, useState, VFC } from "react";

import {
  Stack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

type Props = {
  target_user: {};
  isOpen: boolean;
  onClose: () => void;
};

export const MakeEmailModal: VFC<Props> = memo((props) => {
  const { target_user, isOpen, onClose } = props;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent pb={6}>
          <ModalHeader> BINDSからのお知らせ </ModalHeader>
          <ModalCloseButton />
          {/* マージンを調整 */}
          <ModalBody mx={4}>
            {/* 項目を並べるためにStackは入れておこう（配列調整がしやすい） これは */}
            <Stack>
              <FormControl>
                <FormLabel>名前</FormLabel>
                <Input
                  // useState()で管理している値になった
                  value={target_user.username}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>課題名</FormLabel>
                <Input value={target_user.apptitle} isReadOnly />
              </FormControl>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
});
