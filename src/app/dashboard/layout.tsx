import React from "react";
import { Header } from "./components/header";
import { OrderProvider } from "@/providers/order";

//isso força esse layout e todas as páginas filhas a serem dinâmicas
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <OrderProvider>{children}</OrderProvider>
    </>
  );
}
