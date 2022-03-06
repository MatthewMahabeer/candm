import React, { useState, useContext, useEffect } from "react";
import { Text } from "@fluentui/react";
import { ComboBox } from "@fluentui/react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import { format } from "date-fns";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@mui/material";
import { RestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import RestaurantListTile from "./RestaurantListTile";
import { useUser } from "../../context/AuthContext";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const options = [
  {
    key: "ratingsHeader",
    text: "Rating",
    itemType: DropdownMenuItemType.Header,
  },
  { key: "1", text: "1" },
  { key: "2", text: "2" },
  { key: "3", text: "3" },
  { key: "4", text: "4" },
  { key: "5", text: "5" },
  { key: "6", text: "6" },
  { key: "7", text: "7" },
  { key: "8", text: "8" },
  { key: "9", text: "9" },
  { key: "10", text: "10" },
];

export default function RestaurantHome() {
  const { user } = useUser();
  const [value, setValue] = useState(Date.now());
  const [cbValue, setCBValue] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const onChange = (event, item) => {
    setSelectedItem(item);
  };

  const [addRestaurant, setAddRestaurant] = useState(false);
  const {
    restaurants,
    restaurantsPending,
    fetchRestaurants,
    saveRestaurant,
    addRestaurantPending,
  } = useContext(RestaurantContext);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(selectedItem);
    data.rating = parseInt(selectedItem.text);
    data.createdBy = user.attributes.name;
    data.dateVisited = format(value, "yyyy-MM-dd");
    saveRestaurant(data);
    fetchRestaurants();
    cancel();
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  /** restaurants.map((m) => {
    console.log(Date.parse(m.dateVisited));
  });
**/
  function cancel() {
    reset({
      name: "",
    });
    setSelectedItem(undefined);
    setAddRestaurant(!addRestaurant);
  }
  if (addRestaurantPending) {
    return (
      <div>
        <Spinner label="Adding restaurant <3" size={SpinnerSize.small} />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-4 ml-2">
        {!addRestaurant && (
          <DefaultButton onClick={() => setAddRestaurant(!addRestaurant)}>
            Add Restaurant
          </DefaultButton>
        )}
        {addRestaurant && (
          <div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TextField
                    className="mt-8"
                    variant="standard"
                    error={errors.name ? true : false}
                    helperText={errors.name ? errors.name.message : null}
                    label="Name of Restaurant"
                    placeholder="Name"
                    id="name"
                    {...register("name", {
                      required: { value: true, message: "Name required." },
                    })}
                    style={{ maxWidth: "25%" }}
                  />
                  <div className="ml-8">
                    <DesktopDatePicker
                      label="Date visited"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                      )}
                    />
                  </div>
                </LocalizationProvider>
              </div>
              <div className="mt-4">
                <Dropdown
                  label="Rate restaurant"
                  selectedKey={selectedItem ? selectedItem.key : undefined}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={onChange}
                  placeholder="Rating"
                  options={options}
                  style={{ maxWidth: "6rem" }}
                />
              </div>
            </div>
            <div className="mt-[1.5rem]">
              <DefaultButton onClick={handleSubmit(onSubmit)}>
                Save
              </DefaultButton>
            </div>
            <div className="mt-[1.5rem]">
              <DefaultButton onClick={() => cancel()}>Cancel</DefaultButton>
            </div>
          </div>
        )}
      </div>
      <div>
        {!restaurantsPending && !isEmpty(restaurants) ? (
          restaurants.map((r) => {
            return (
              <div key={r.id}>
                <RestaurantListTile restaurant={r} />
              </div>
            );
          })
        ) : !restaurantsPending && isEmpty(restaurants) ? (
          <div className="ml-2 mt-12 text-center">
            <Text>No restaurants. Add one!</Text>
          </div>
        ) : restaurantsPending ? (
          <div>
            <Spinner label="Fetching restaurants <3" size={SpinnerSize.small} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
