import React, { useState, useContext, useEffect } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@mui/material";
import { Text } from "@fluentui/react";
import { useUser } from "../../context/AuthContext";
import RVListTile from "./RVListTile";
import { useForm } from "react-hook-form";
import { RestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { isEmpty } from "lodash";

export default function RestaurantList() {
  const { user } = useUser();

  const [addRestaurant, setAddRestaurant] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const {
    saveRestaurantToVisit,
    restaurantsToVisit,
    fetchRestaurantsToVisit,
    restaurantsPending,
  } = useContext(RestaurantContext);

  useEffect(() => {
    fetchRestaurantsToVisit();
  }, []);

  function cancel() {
    reset({
      name: "",
    });
    setAddRestaurant(!addRestaurant);
  }
  const onSubmit = async (data) => {
    data.createdBy = user.attributes.name;
    saveRestaurantToVisit(data);
    fetchRestaurantsToVisit();
    cancel();
  };

  console.log(restaurantsToVisit);

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
        {!restaurantsPending && !isEmpty(restaurantsToVisit) ? (
          restaurantsToVisit.map((r) => {
            return (
              <div key={r.id}>
                <RVListTile restaurant={r} />
              </div>
            );
          })
        ) : !restaurantsPending && isEmpty(restaurantsToVisit) ? (
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
