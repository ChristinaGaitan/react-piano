import { FunctionComponent } from "react";
import { NoteType } from "../../domain/note";
import clsx from "clsx";
import styles from "./Key.module.css";
import { usePressObserver } from "../PressObserver";

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
  const pressed = usePressObserver({
    watchKey: label,
    onStartPress: onDown,
    onFinishPress: onUp,
  });

  return (
    <button
      className={clsx(
        styles.key,
        styles[type],
        pressed && styles["is-pressed"],
      )}
      onMouseDown={onDown}
      onMouseUp={onUp}
      type="button"
      {...rest}
    >
      {label}
    </button>
  );
};
