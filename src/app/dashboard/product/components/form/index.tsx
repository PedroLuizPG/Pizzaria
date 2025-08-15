"use client";

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import {UploadCloud } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/dashboard/components/button";
import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { toast } from "sonner";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const router = useRouter()

  async function handleRegisterProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!name || !categoryIndex || !price || !description || !image) {
      toast.warning("Preencha todos os campos!")
      return;
    }

    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("file", image);

    const token = await getCookieClient();

    try {
      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setPreviewImage("");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao cadastrar o produto!")
      return;
    }
    toast.success("Produto cadastrado com suceeso!")
    router.push('/dashboard')
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.warning("Formato não permitido!")
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>
      <form className={styles.form} action={handleRegisterProduct}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={30} color="#fff" />
          </span>

          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category">
          {categories.map((category, index) => (
            <option value={index} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />

        <input
          type="text"
          name="price"
          placeholder="Digite o preço do produto"
          required
          className={styles.input}
        />

        <textarea
          name="description"
          className={styles.input}
          placeholder="Descreva o produto"
          required
        />

        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
