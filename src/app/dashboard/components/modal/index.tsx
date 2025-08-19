import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { use } from "react";
import { OrderContext } from "@/providers/order";
import { calculateOrder } from "@/lib/helper";
import Image from "next/image";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext);

  async function handleFinishOrder(order_id: string) {
    await finishOrder(order_id);
    onRequestClose();
  }
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack} onClick={onRequestClose}>
          <X size={40} color="#FF3f4b" />
        </button>

        <article className={styles.container}>
          <h2>Detalhes dos pedido</h2>

          <span className={styles.table}>
            Mesa - <b>{order[0].order.table}</b>
          </span>

          {order[0].order.name && (
            <span className={styles.name}>
              Garçon - <b>{order[0].order.name}</b>
            </span>
          )}

          {order.map((item) => (
            <section className={styles.item} key={item.id}>
              <Image src={item.product.banner} alt="#" width={120} height={120} />
              <span>
                Qtd {item.amount} - <b>{item.product.name}</b> - R${" "}
                {parseFloat(item.product.price) * item.amount}
              </span>
              <span className={styles.description}>
                {item.product.description}
              </span>
            </section>
          ))}

          <h3 className={styles.total}>
            Total da conta: R$ {calculateOrder(order)}
          </h3>

          <button
            className={styles.buttonOrder}
            onClick={() => handleFinishOrder(order[0].order_id)}
          >
            Concluir pedido
          </button>
        </article>
      </section>
    </dialog>
  );
}
