import { CashierClient } from "@/components/cashier/cashier-client";
import { menuCategories } from "@/components/menu.ts";

export default function CashierPage() {
  return (
    <div>
      <CashierClient menu={menuCategories} />
    </div>
  );
}
