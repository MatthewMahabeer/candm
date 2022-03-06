import React, { useState, useEffect, createContext } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  listRestaurants,
  listFoodItems,
  listRestaurantLists,
} from "../../src/graphql/queries";
import {
  createRestaurant,
  createFoodItem,
  updateRestaurant,
  createRestaurantList,
} from "../../src/graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsPending, setRestaurantsPending] = useState(false);
  const [addRestaurantPending, setAddRestaurantPending] = useState(false);
  const [addingFoodItem, setAddingFoodItem] = useState(false);
  const [fetchingFoodItems, setFetchingFoodItems] = useState(false);
  const [filteredFood, setFilteredFood] = useState([]);
  const [updatingRestaurant, setUpdatingRestaurant] = useState(false);
  const [restaurantsToVisit, setRestaurantsToVisit] = useState([]);

  const fetchRestaurants = async () => {
    try {
      setRestaurantsPending(true);

      const { data } = await API.graphql({
        query: listRestaurants,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      const restaurants = data.listRestaurants.items;
      setRestaurants(restaurants);
      setRestaurantsPending(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRestaurantsToVisit = async () => {
    try {
      setRestaurantsPending(true);
      const { data } = await API.graphql({
        query: listRestaurantLists,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      const restaurants = data.listRestaurantLists.items;
      setRestaurantsToVisit(restaurants);
      setRestaurantsPending(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveRestaurant = async (data) => {
    try {
      setAddRestaurantPending(true);
      await API.graphql({
        query: createRestaurant,
        variables: { input: data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (e) {
      console.error(e);
      setAddRestaurantPending(false);
    }
    setAddRestaurantPending(false);
  };

  const saveRestaurantToVisit = async (data) => {
    try {
      setAddRestaurantPending(true);
      await API.graphql({
        query: createRestaurantList,
        variables: { input: data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (e) {
      console.error(e);
      setAddRestaurantPending(false);
    }
    setAddRestaurantPending(false);
  };

  const saveFoodItem = async (data) => {
    try {
      setAddingFoodItem(true);
      await API.graphql({
        query: createFoodItem,
        variables: { input: data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (e) {
      console.error(e);
      setAddingFoodItem(false);
    }
    setAddingFoodItem(false);
  };

  const listFilteredFoodItems = async (id) => {
    try {
      if (!id) {
        console.warn("!ID");
        return;
      }
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

  const appendRestaurant = async (data) => {
    try {
      setUpdatingRestaurant(false);
      await API.graphql({
        query: updateRestaurant,
        variables: { input: data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (e) {
      console.error(e);
      setUpdatingRestaurant(false);
    }
    setUpdatingRestaurant(false);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        restaurantsPending,
        fetchRestaurants,
        addRestaurantPending,
        saveRestaurant,
        saveFoodItem,
        addingFoodItem,
        filteredFood,
        listFilteredFoodItems,
        fetchingFoodItems,
        appendRestaurant,
        updatingRestaurant,
        saveRestaurantToVisit,
        restaurantsToVisit,
        fetchRestaurantsToVisit,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export { RestaurantContext, RestaurantProvider };
