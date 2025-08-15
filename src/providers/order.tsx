"use client";
import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface OrderItemProps {
  id: string;
  amount: number;
  created_at: string;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    created_at: string;
    updated_at: string;
    category_id: string;
  };
  order: {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string | null;
    created_at: string;
    updated_at: string;
  };
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRequestOpen(order_id: string) {
    try {
      const token = await getCookieClient();
      const response = await api.get("/order/detail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          order_id: order_id,
        },
      });

      setOrder(response.data);
      console.log(order);
    } catch (err) {
      console.log(err);
      return;
    }
    console.log(order_id);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function finishOrder(order_id: string) {
    const token = await getCookieClient();
    const data = {
      order_id: order_id,
    };
    try {
      await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      toast.error("Falha ao finalizar o pedido!");
      return;
    }
    toast.success("Pedido finalizado com sucesso!");
    router.refresh()
  }
  return (
    <OrderContext.Provider
      value={{ isOpen, onRequestOpen, onRequestClose, order, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
