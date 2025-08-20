import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { toast } from "sonner";

import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use client";
    const name = formData.get("name");

    if (name === "") return;

    const data = { name: name };
    const token = await getCookieServer();

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

      <form action={handleRegisterCategory} className={styles.form}>
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
