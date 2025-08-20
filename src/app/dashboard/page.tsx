import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { OrderProps } from "@/lib/orders.type";

//isso força esse layout e todas as páginas filhas a serem dinâmicas
export const dynamic = "force-dynamic";

async function getOrders():Promise<OrderProps[] | []>{
    try{
        const token = await getCookieServer()
        const response = await api.get("/orders", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data || []
    }catch(err){
        console.log(err)
        return[]
    }
}


export default async function Dashboard(){
    const orders = await getOrders()
    

    return(
       <>
       <Orders orders={orders}/>
       </>
    )
}