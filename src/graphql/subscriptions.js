/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant($owner: String) {
    onCreateRestaurant(owner: $owner) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant($owner: String) {
    onUpdateRestaurant(owner: $owner) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant($owner: String) {
    onDeleteRestaurant(owner: $owner) {
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
export const onCreateRestaurantList = /* GraphQL */ `
  subscription OnCreateRestaurantList($owner: String) {
    onCreateRestaurantList(owner: $owner) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateRestaurantList = /* GraphQL */ `
  subscription OnUpdateRestaurantList($owner: String) {
    onUpdateRestaurantList(owner: $owner) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteRestaurantList = /* GraphQL */ `
  subscription OnDeleteRestaurantList($owner: String) {
    onDeleteRestaurantList(owner: $owner) {
      id
      name
      createdBy
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFoodItem = /* GraphQL */ `
  subscription OnCreateFoodItem($owner: String) {
    onCreateFoodItem(owner: $owner) {
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
export const onUpdateFoodItem = /* GraphQL */ `
  subscription OnUpdateFoodItem($owner: String) {
    onUpdateFoodItem(owner: $owner) {
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
export const onDeleteFoodItem = /* GraphQL */ `
  subscription OnDeleteFoodItem($owner: String) {
    onDeleteFoodItem(owner: $owner) {
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
