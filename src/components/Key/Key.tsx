import { FunctionComponent } from "react";
import { NoteType } from "../../domain/note";
import clsx from "clsx";
import styles from "./Key.module.css";

type PressCallback = () => void;

type KeyPros = {
  type: NoteType;
  label: string;
  disabled?: boolean;

  onUp: PressCallback;
  onDown: PressCallback;
};

export const Key: FunctionComponent<KeyPros> = ({
  type,
  label,
  onDown,
  onUp,
  ...rest
}) => {
  return (
    <button
      className={clsx(styles.key, styles[type])}
      onMouseDown={onDown}
      onMouseUp={onUp}
      type="button"
      {...rest}
    >
      {label}
    </button>
  );
};
