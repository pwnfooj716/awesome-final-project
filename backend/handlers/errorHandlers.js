
module.exports.catchErrors = (fn) => {
    return function (request, response, next) {
    console.log(fn, 'fn')
    return fn(request, response, next).catch((e) => {
      if (e.response) {
        e.status = e.response.status
      }
      next(e)
    })
    }
  }