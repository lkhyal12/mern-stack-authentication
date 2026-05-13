const requestMap = {};
const maxRequests = 5;
const timeWindow = 5 * 60 * 1000;
setInterval(() => {
  const entries = Object.entries(requestMap);
  entries.forEach((el, index) => {
    const [ip, value] = el;
    const currentTime = Date.now();
    if (currentTime - value.startTime > timeWindow) {
      delete requestMap[ip];
    }
  });
}, 60 * 1000);
export const limiter = async (req, res, next) => {
  const currentTime = Date.now();
  const ip = `${req.ip}:${req.path}`;
  const currentRequest = requestMap[ip];
  if (!currentRequest) {
    requestMap[ip] = {
      count: 1,
      startTime: currentTime,
    };
    return next();
  }
  if (currentTime - currentRequest.startTime > timeWindow) {
    requestMap[ip] = {
      count: 1,
      startTime: currentTime,
    };
    return next();
  }
  if (requestMap[ip].count >= maxRequests) {
    return res
      .status(429)
      .json({ message: "Too many requests", success: false });
  }
  requestMap[ip] = {
    ...currentRequest,
    count: currentRequest.count + 1,
  };
  next();
};
