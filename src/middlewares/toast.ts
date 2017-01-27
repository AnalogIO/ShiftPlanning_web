// This middleware will just show an alert if _any_ error occurs. It is sort of
// a global error trap.
//
// It could in the future be made prettier with a custom alert modal but this
// will do for now.

export default (store: any) => (next: any) => (action: any) => {
  if (action.error && action.payload && action.payload.error) {
    alert(action.payload.error);
  }

  return next(action);
};
