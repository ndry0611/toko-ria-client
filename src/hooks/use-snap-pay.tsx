import { useRouter } from "next/router";
import { SaleModel } from "../modules/admin/sales/components/type";
import { NavigationRoutes } from "../common/constants/route";
import notification from "../component/notification";

export default function useSnapPay() {
  const {replace} = useRouter();
  const onPay = (sale: SaleModel) => {
    (window as any).snap.pay(sale.snap_token, {
      onSuccess: function(result: any) {
        // Create page for success payment
        console.log(result, "masok");
      },
      onPending: function(result: any) {
        console.log(result);
        replace(`${NavigationRoutes.transaction}/${sale.id}`)
        
      },
      onError: function(result: any) {
        replace(`${NavigationRoutes.transaction}/${sale.id}`)

        notification.error({
          title: "Midtrans Error",
          message: result.message
        });
      },
      onClose: function() {
        replace(`${NavigationRoutes.transaction}/${sale.id}`)
      }
    })
  }
  return onPay;
}