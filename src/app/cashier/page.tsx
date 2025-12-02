import { CashierClient } from "@/components/cashier/cashier-client";
import { menuCategories } from "@/components/menu";

export default function CashierPage() {
  return (
    <div>
      <CashierClient menu={menuCategories} />
    </div>
  );
}
