export default (e: any, code: number) => {
  if (e.response && e.response.data && e.response.data.message) {
    return e.response.data.message;
  }

  // if (e.message) {
  //   return e.message;
  // }

  return `An unknown error has occured (code E${code}).`;
};
