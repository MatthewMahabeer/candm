/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRestaurant = /* GraphQL */ `
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
      id
      name
      rating
      comment
      foodItem {
        items {
          id
          name
          rating
          comment
          restaurantID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdBy
      dateVisited
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateRestaurant = /* GraphQL */ `
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
      id
      name
      rating
      comment
      foodItem {
        items {
          id
          name
          rating
          comment
          restaurantID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdBy
      dateVisited
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
      id
      name
      rating
      comment
      foodItem {
        items {
          id
          name
          rating
          comment
          restaurantID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdBy
      dateVisited
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createRestaurantList = /* GraphQL */ `
  mutation CreateRestaurantList(
    $input: CreateRestaurantListInput!
    $condition: ModelRestaurantListConditionInput
  ) {
    createRestaurantList(input: $input, condition: $condition) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateRestaurantList = /* GraphQL */ `
  mutation UpdateRestaurantList(
    $input: UpdateRestaurantListInput!
    $condition: ModelRestaurantListConditionInput
  ) {
    updateRestaurantList(input: $input, condition: $condition) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteRestaurantList = /* GraphQL */ `
  mutation DeleteRestaurantList(
    $input: DeleteRestaurantListInput!
    $condition: ModelRestaurantListConditionInput
  ) {
    deleteRestaurantList(input: $input, condition: $condition) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createFoodItem = /* GraphQL */ `
  mutation CreateFoodItem(
    $input: CreateFoodItemInput!
    $condition: ModelFoodItemConditionInput
  ) {
    createFoodItem(input: $input, condition: $condition) {
      id
      name
      rating
      comment
      restaurantID
      restaurant {
        id
        name
        rating
        comment
        foodItem {
          nextToken
        }
        createdBy
        dateVisited
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateFoodItem = /* GraphQL */ `
  mutation UpdateFoodItem(
    $input: UpdateFoodItemInput!
    $condition: ModelFoodItemConditionInput
  ) {
    updateFoodItem(input: $input, condition: $condition) {
      id
      name
      rating
      comment
      restaurantID
      restaurant {
        id
        name
        rating
        comment
        foodItem {
          nextToken
        }
        createdBy
        dateVisited
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteFoodItem = /* GraphQL */ `
  mutation DeleteFoodItem(
    $input: DeleteFoodItemInput!
    $condition: ModelFoodItemConditionInput
  ) {
    deleteFoodItem(input: $input, condition: $condition) {
      id
      name
      rating
      comment
      restaurantID
      restaurant {
        id
        name
        rating
        comment
        foodItem {
          nextToken
        }
        createdBy
        dateVisited
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
