import { userConstants } from '../Constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GET_BY_ID_REQUEST:
        return {
            loading: true
        };
    case userConstants.GET_BY_ID_SUCCESS:
        return {
            items: action.user
        };
    case userConstants.GET_BY_ID_FAILURE:
        return {
            error: action.error
        };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(item =>
            item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(item => item.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of user with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        })
      };
    default:
      return state
  }
}
