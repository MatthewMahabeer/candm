import React, { useState, useEffect, useContext } from "react";
import { Text } from "@fluentui/react";
import { format } from "date-fns";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { useBoolean } from "@fluentui/react-hooks";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Dropdown, DropdownMenuItemType } from "@fluentui/react/lib/Dropdown";
import { RestaurantContext } from "../../context/RestaurantContext/RestaurantContext";
import { isEmpty } from "lodash";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { listFoodItems } from "../../src/graphql/queries";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { API } from "aws-amplify";
import { TextareaAutosize } from "@mui/base";

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

export default function RestaurantListTile({ restaurant }) {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [hideCommentDialog, { toggle: toggleHideCommentDialog }] = useBoolean(
    true
  );

  const [selectedItem, setSelectedItem] = useState();
  const {
    saveFoodItem,
    addingFoodItem,
    appendRestaurant,
    updatingRestaurant,
  } = useContext(RestaurantContext);
  const [fetchingFoodItems, setFetchingFoodItems] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);
  const [finalRating, setFinalRating] = useState("");

  const listFilteredFoodItems = async (id) => {
    try {
      setFetchingFoodItems(true);
      const { data } = await API.graphql({
        query: listFoodItems,
        variables: {
          filter: {
            restaurantID: {
              eq: id,
            },
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      const filteredFoodItems = data.listFoodItems.items;
      setFilteredFood(filteredFoodItems);
    } catch (e) {
      console.error(e);
      setFetchingFoodItems(false);
    }
    setFetchingFoodItems(false);
  };

  const onChange = (event, item) => {
    setSelectedItem(item);
  };

  useEffect(() => {
    listFilteredFoodItems(restaurant.id);
  }, [restaurant.id]);

  console.log(filteredFood);

  function parseDate(input) {
    let parts = input.split("-");

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
  }
  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 600 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: "Add Food Item",
    subText: "Food item ratings will affect the overall rating",
  };
  const dialogCommentProps = {
    type: DialogType.largeHeader,
    title: "Add Comment",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const {
    register: registerComment,
    formState: { errors: commentError },
    handleSubmit: handleCommentSubmit,
    reset: resetComment,
  } = useForm();

  const onSubmit = async (data) => {
    data.rating = selectedItem.text;
    data.restaurantID = restaurant.id;
    saveFoodItem(data).then(() => listFilteredFoodItems(restaurant.id));
    reset({
      name: "",
    });
    setSelectedItem(undefined);
    toggleHideDialog();
  };

  const onSubmitComment = async (data) => {
    data.id = restaurant.id;
    appendRestaurant(data);

    restaurant.comment = data.comment;
    toggleHideCommentDialog();
  };

  return (
    <div style={{ maxWidth: "80%", marginTop: "2.5rem", marginLeft: ".5rem" }}>
      <div className="bg-gray-50 mx-auto border-gray-200 border rounded-xl text-gray-700 mb-0.5 h-30">
        <div
          className={`flex p-3 border-l-8 border-yellow-600 ${
            restaurant.rating < 4
              ? "border-red-600"
              : restaurant.rating >= 4 && restaurant.rating < 8
              ? "border-yellow-600"
              : "border-green-600"
          }`}
        >
          <div className="space-y-1 border-r-2 pr-3">
            <div className="text-sm leading-5 font-semibold">
              <span className="text-xs leading-4 font-normal text-gray-500">
                {" "}
                <Text> {restaurant?.name}</Text>
              </span>{" "}
            </div>
            <div className="text-sm leading-5 font-semibold">
              <span className="text-xs leading-4 font-normal text-gray-500 pr">
                {" "}
                {restaurant.dateVisited
                  ? format(parseDate(restaurant.dateVisited), "MMM-dd-yy")
                  : ""}
              </span>{" "}
            </div>
            <div className="text-sm leading-5 font-semibold">
              <Text>Rating: </Text> {restaurant.rating}
            </div>
          </div>
          <div className="flex-1">
            <div className="ml-3 space-y-1 border-r-2 pr-3">
              {!restaurant.comment && (
                <div
                  onClick={toggleHideCommentDialog}
                  className="text-sm leading-4 font-normal"
                >
                  <span className="text-xs leading-4 font-normal text-indigo-500 underline cursor-pointer">
                    {" "}
                    Add Comment
                  </span>{" "}
                </div>
              )}
              {restaurant.comment && (
                <div className="text-sm leading-4 font-normal">
                  <span className="text-xs leading-4 font-normal text-gray-500">
                    {" "}
                    Comment:
                  </span>{" "}
                  <Text>{restaurant.comment}</Text>{" "}
                  <span
                    onClick={toggleHideCommentDialog}
                    className="ml-2 text-xs leading-4 font-normal text-indigo-500 cursor-pointer"
                  >
                    Edit
                  </span>
                </div>
              )}
              <div>
                {!fetchingFoodItems && !isEmpty(filteredFood) ? (
                  <div className="mt-4 col-span-12 lg:col-span-8">
                    {filteredFood.map((i) => {
                      return (
                        <div
                          className="inline-flex rounded-full text-white divide-x divide-gray-200
                            bg-indigo-500 
                            text-xs font-bold 
                            mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1"
                          key={i.id}
                        >
                          <div className="">
                            <Text
                              style={{
                                color: "white",
                                fontSize: 12.5,
                                marginRight: 10,
                              }}
                            >
                              {i.name}
                            </Text>
                          </div>
                          <div className="">
                            <Text
                              style={{
                                color: "white",
                                fontSize: 12.5,
                                marginLeft: 10,
                              }}
                            >
                              {i.rating}
                            </Text>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : !fetchingFoodItems && isEmpty(filteredFood) ? (
                  <div className="mt-4">
                    <Text>No food items. Add one!</Text>
                  </div>
                ) : fetchingFoodItems ? (
                  <div>
                    <Spinner
                      label="Fetching food items <3"
                      size={SpinnerSize.small}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/*    <div className="text-sm leading-4 font-normal">
                <span className="text-xs leading-4 font-normal text-gray-500">
                  {" "}
                  Destination
                </span>{" "}
                WestRock Jacksonville - 9469 Eastport Rd, Jacksonville, FL 32218
              </div>
                */}
            </div>
          </div>
          <div className="border-r-2 pr-3">
            <div>
              <div className="ml-3 my-3 border-gray-200 border-2 bg-gray- p-1">
                <div className="text-xs leading-4 font-medium">Logged by</div>
                <div className="text-center text-sm leading-4 font-light text-gray-800">
                  {restaurant.createdBy.split(" ")[0]}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <button className="ml-3 my-5 bg-white p-1 w-20 rounded-sm border border-blue-500">
              <div
                onClick={toggleHideDialog}
                className="uppercase text-xs leading-4 font-semibold text-center text-blue-600"
              >
                <Text
                  style={{ fontSize: 12, fontWeight: "bold", color: "#2563eb" }}
                >
                  Add Item
                </Text>
              </div>
            </button>
          </div>
          {/*   <div>
            <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
*/}
        </div>
      </div>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <div>
          <TextField
            className="mt-8"
            variant="standard"
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : null}
            label="Food Item "
            placeholder="Name"
            id="name"
            {...register("name", {
              required: { value: true, message: "Name required." },
            })}
            style={{ maxWidth: "100%" }}
          />
          <div className="mt-4">
            <Dropdown
              label="Rate item"
              selectedKey={selectedItem ? selectedItem.key : undefined}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={onChange}
              placeholder="Rating"
              options={options}
              style={{
                maxWidth: "6rem",
                marginBottom: "2rem",
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DefaultButton onClick={handleSubmit(onSubmit)} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>

      <Dialog
        hidden={hideCommentDialog}
        onDismiss={toggleHideCommentDialog}
        dialogContentProps={dialogCommentProps}
        modalProps={modelProps}
      >
        <div className="mt-2 mb-4">
          <TextareaAutosize
            defaultValue={restaurant.comment ? restaurant.comment : ""}
            style={{ width: 300, padding: "1rem" }}
            minRows={5}
            {...registerComment("comment")}
          />
        </div>
        <DialogFooter>
          <DefaultButton
            onClick={handleCommentSubmit(onSubmitComment)}
            text="Save"
          />
          <DefaultButton onClick={toggleHideCommentDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
}
