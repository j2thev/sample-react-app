const testMiddleware = store => next => action => {
  console.log('test');
  next(action);
};

export default testMiddleware;