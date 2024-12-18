import { FunctionComponent } from "react";
import { NoteType } from "../../domain/note";
import clsx from "clsx";
import styles from "./Key.module.css";

type KeyPros = {
  type: NoteType;
  label: string;
  disabled?: boolean;
};

export const Key: FunctionComponent<KeyPros> = (pros) => {
  const { type, label, ...rest } = pros;

  return (
    <button className={clsx(styles.key, styles[type])} type="button" {...rest}>
      {label}
    </button>
  );
};
