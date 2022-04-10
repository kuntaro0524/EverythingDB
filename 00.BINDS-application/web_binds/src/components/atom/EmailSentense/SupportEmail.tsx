import { VFC } from "react";

type Props = {
  username: string;
  app_id: number;
  app_title: string;
  email: string;
};

export const SupportEmail: VFC<Props> = (props) => {
  const { username, app_id, app_title, email } = props;

  return (
    <p>
      BINDS進捗報告について
      {email} <br />
      {username} 先生 <br />
      <br />
      いつもお世話になっています。播磨理研の平田です。 さてBINDSの <br />
      課題番号　{app_id} <br />
      課題名 {app_title} <br />
      について進捗報告をしていただきたく存じます。 <br />
      進捗報告については９０日間ごとにBINDS事務局から先生方に連絡があったかと思います。
      <br />
      それとは別に私の担当課題についてBINDSの事務局に送っていただいている情報より少し詳しい情報をこちらで管理しています。
      <br />
      本課題の最新の進捗状況を以下のフォームから報告をお願いできますか？
      <br />
      リンク <br />
      https://docs.google.com/forms/d/e/1FAIpQLSddl--OT0OmkCiOYFSbnXTq4d7X4tzHwqhEnqZrTNh7ceKaNA/viewform
      <br />
      よろしくお願いいたします。
      <br />
      フォームは以前と同じなのですがこちらの手違いで７月末からこちらの進捗管理ができていない状態になっていました。
      <br />
      最新情報のみで結構です。登録をお願いいたします。 <br />
      <br />
      課題・担当者　平田
    </p>
  );
};
