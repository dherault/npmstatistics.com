function packages(state = {}, action) {

  switch (action.type) {
    case 'CREATE_PACKAGE':
      return {
        ...state,
        [action.payload.id]: action.payload,
      }

    default:
      return state
  }
}

export default packages
