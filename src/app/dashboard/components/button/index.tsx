"use client";

import { useFormStatus } from "react-dom";
import styles from "./styles.module.scss";

interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();
  return (
    <>
      <button className={styles.button} type="submit" disabled={pending}>
        {pending ? "Carregando..." : name}
      </button>
    </>
  );
}
