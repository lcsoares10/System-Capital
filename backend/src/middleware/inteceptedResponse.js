//https://medium.com/@selvaganesh93/how-node-js-middleware-works-d8e02a936113

/** Interceptando o response */
module.exports = (req, res, next) => {
  let oldSend = res.send
  res.send = function(data) {
      data = JSON.parse(data);
      const result = {
        sucess: (res.statusCode !== 200) ? false : true,
        ...data
      }
      res.send = oldSend // set function back to avoid the 'double-send'
      return res.send(result) // just call as normal with data
  }
  next();
}
