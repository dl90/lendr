export const initialState = {
  user: null,
  targetUser: null
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'Login':
      return {
        ...state,
        user: action.user
      }
    case 'TargetOtherUser':
      return {
        ...state,
        targetUser: action.targetUser
      }
    default:
      return state
  }
}
