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

import { AppInfo } from "./components/types/api/AppInfo";
import { SupportEmail } from "./components/atom/EmailSentense/SupportEmail";

type Props = {
  user: AppInfo | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const MakeEmailModal: VFC<Props> = memo((props) => {
  const { user, isOpen, onOpen, onClose } = props;
  console.log(user);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
        size="full"
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
                  value={user?.username}
                  //   value="UNKOSHITA"
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>課題名</FormLabel>
                <Input value={user?.title} isReadOnly />
              </FormControl>
              {user !== null && user.username !== undefined && (
                <FormControl>
                  <SupportEmail
                    username={user?.username}
                    email={user?.email}
                    app_id={user?.id}
                    app_title={user?.title}
                  />
                </FormControl>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
});
