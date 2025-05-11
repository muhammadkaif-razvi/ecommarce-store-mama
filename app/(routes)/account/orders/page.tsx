import getCustomer from "@/actions/getdatafromAdmin/get-customer"
import { currentUser } from "@/lib/auth"



const OrderPage = async () => {
  const user = await currentUser();
  const customer = await getCustomer(user.id);
  console.log(customer);
  return (
    <div className='mt-20'>OrderPage</div>
  )
}

export default OrderPage