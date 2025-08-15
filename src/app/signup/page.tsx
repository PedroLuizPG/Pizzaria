import styles from "../page.module.scss";
import Image from "next/image";
import logoIMG from "../../../public/logo.svg";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/services/api";

export default function Signup() {

  async function handleRegister(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(name, email, password);

    if (name === "" || email === "" || password === "") {
      console.log("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password,
      });
      console.log("usuário cadastrado com sucesso!");
      
    } catch (err) {
      console.log("error fela");
      console.log(err);
    }

    redirect('/')
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image alt="Logo da pizzaria" src={logoIMG} />

        <section className={styles.login}>
          <h1>Crie sua conta</h1>
          <form action={handleRegister}>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome..."
              className={styles.input}
            />

            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email..."
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="************"
              className={styles.input}
            />

            <button>Cadastrar</button>
          </form>

          <span className={styles.cadastro}>
            Já possui conta?
            <Link href={"/"}>Entrar com sua conta</Link>
          </span>
        </section>
      </div>
    </>
  );
}
