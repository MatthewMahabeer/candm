import { Label, Pivot, PivotItem } from "@fluentui/react";
import RestaurantHome from "./RestaurantHome";
import RestaurantList from "./RestaurantList";

export default function RestaurantPivot() {
  return (
    <div className="mt-8">
      <Pivot>
        <PivotItem headerText="Restaurants Visited">
          <RestaurantHome />
        </PivotItem>
        <PivotItem headerText="Restaurants to Visit">
          <RestaurantList />
        </PivotItem>
      </Pivot>
    </div>
  );
}
