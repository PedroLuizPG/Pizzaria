"use client";

import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { toast } from "sonner";

import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";

export default function Category() {
  async function handleRegisterCategory(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");

    if (name === "") return;

    const data = { name: name };
    const token = await getCookieClient();

    try {
      await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Categoria cadastrada com sucesso!");
      toast.success("Categoria cadastrada com sucesso!");
    } catch (err) {
      console.log("ERROR " + err);
      toast.error("Erro ao cadastrar categoria!");
      return;
    }
  }

  return (
    <main className={styles.container}>
      <h1>Nova categoria</h1>

      <form onSubmit={handleRegisterCategory} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder='Nome da categoria, ex: "Pizza"'
          required
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
