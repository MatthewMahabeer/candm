/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRestaurant = /* GraphQL */ `
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
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
export const listRestaurants = /* GraphQL */ `
  query ListRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getRestaurantList = /* GraphQL */ `
  query GetRestaurantList($id: ID!) {
    getRestaurantList(id: $id) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRestaurantLists = /* GraphQL */ `
  query ListRestaurantLists(
    $filter: ModelRestaurantListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurantLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdBy
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getFoodItem = /* GraphQL */ `
  query GetFoodItem($id: ID!) {
    getFoodItem(id: $id) {
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
export const listFoodItems = /* GraphQL */ `
  query ListFoodItems(
    $filter: ModelFoodItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
