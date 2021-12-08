import axios from "axios";
import { useState } from "react";

import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Table, TableCaption, Tbody, Tr, Th, Td } from "@chakra-ui/table";
import { useCallback, VFC } from "react";
import { MakeEmailModal } from "./MakeEmailModal";
import { AppInfo } from "./components/types/api/AppInfo";
import userEvent from "@testing-library/user-event";

type Props = {
  apps: AppInfo[] | null;
};

export const DisplayApps: VFC<Props> = (props) => {
  const { apps } = props;
  console.log("DisplayApps");
  /* chakra UI modal hooks*/
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [target_user, setTargetUser] = useState<AppInfo>();

  // イベントを受け取ってそのパラメータを取得するという方法がなぜかうまくいかなかった。
  // 理解はできないけど、メイン側のコンポーネントの関数設定の中でイベントとパラメータを渡す
  // という方法が実装できるようだったので詳細がわかるまではこの方法で実装を進める。
  // ここではボタンを押したときのonClickに対して、eventとそれぞれの課題のIDを渡している。
  const onClickTest = useCallback((e, _id) => {
    if (apps != null) {
      const targetUser = apps.find((app) => app._id === _id);
      console.log(targetUser);
      if (targetUser != null) {
        setTargetUser(targetUser);
      }
    }
    onOpen();
    // preventDefault();
  }, []);

  //   アップデートボタンが押されたときの挙動を定義する
  const onClickUpdate = useCallback((e, _id) => {
    console.log("before axios=" + _id);
    //   axiosを利用してPATCHを当てるという機能を実装してみる
    // server側ではPATCHで受け取ったオブジェクトにあるパラメタだけを変更することができる
    // 今回の場合にはDBに新しいフィールドを追加して、管理情報を付与していくことにするので
    // 実際にはPATCHでパラメタをいじるということはなさそうだが・・・
    axios
      .patch(
        `http://localhost:4649/apps/${_id}`,
        { pdis: "CHINKO" },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log("UNKO done");
      })
      .catch(function (error) {
        console.log("ERROR?");
        console.log(error.config);
        for (let key of Object.keys(error)) {
          console.log(key);
          console.log(error[key]);
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  return (
    <div>
      <Table variant="striped" colorScheme="teal">
        <TableCaption> BINDS application list </TableCaption>
        <Tbody>
          {apps !== null &&
            apps
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
                    {/* ボタンの関数の定義については現時点でこのスタイルしか知らない */}
                    <Button
                      onClick={(e) => {
                        onClickTest(e, app._id);
                      }}
                      colorScheme="blue"
                    >
                      Generate E-mail
                    </Button>
                    {/* ボタンの関数の定義については現時点でこのスタイルしか知らない */}
                    <Button
                      onClick={(e) => {
                        onClickUpdate(e, app._id);
                      }}
                    >
                      Update information
                    </Button>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
      {target_user !== undefined && (
        <MakeEmailModal
          user={target_user}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
};
