export default (store: any) => (next: any) => (action: any) => {
  if (action.meta && action.meta.sure) {
    const confirmed = confirm(action.meta.sure);

    next(action);

    return confirmed;
  }

  return next(action);
};
