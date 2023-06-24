const getUsername = (arg) => {
  const reg = /^--username/gm;
  const argum = filterArg(arg);
  if (reg.test(argum)) {
    return argum.split("=")[1];
  }
};

const filterArg = (arg) => {
  return [...arg].splice(2, arg.length)[0];
};

export { getUsername };
