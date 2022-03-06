import React from "react";
import { Text } from "@fluentui/react";
import { format } from "date-fns";

export default function RVListTile({ restaurant }) {
  function parseDate(input) {
    let parts = input.split("-");

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
  }
  return (
    <div style={{ maxWidth: "60%", marginTop: "2.5rem", marginLeft: ".5rem" }}>
      <div className="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30">
        <div className="flex p-3 border-l-8 border-blue-600">
          <div className="space-y-1 border-r-2 pr-3">
            <div className="text-sm leading-5 font-semibold">
              <span className="text-xs leading-4 font-normal text-gray-500">
                {" "}
                Restaurant:
              </span>{" "}
              <Text>{restaurant.name}</Text>
            </div>
          </div>
          <div className="flex-1">
            <div className="ml-3 space-y-1 border-r-2 pr-3">
              <div className="text-sm leading-4 font-normal">
                <span className="text-xs leading-4 font-normal text-gray-500">
                  {" "}
                  Created At:
                </span>{" "}
                {restaurant.createdAt
                  ? format(Date.parse(restaurant.createdAt), "MMM-dd-yy")
                  : ""}
              </div>
            </div>
          </div>
          <div className="border-r-2 pr-3 mr-2 ml-2">
            <div>
              <div className=" text-sm leading-4 font-normal">
                <span className="text-xs leading-4 font-normal text-gray-500">
                  {" "}
                  Created By:
                </span>{" "}
                <Text>{restaurant.createdBy.split(" ")[0]}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
