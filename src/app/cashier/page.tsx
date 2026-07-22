import { CashierClient } from "@/components/cashier/cashier-client";
import { menuCategories } from "@/components/menu-data";

export default function CashierPage() {
  return (
    <div>
      <CashierClient menu={menuCategories} />
    </div>
  );
}
