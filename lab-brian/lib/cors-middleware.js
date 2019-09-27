'use strict';

module.exports = function(req, res, next) {
  res.append('Access-Control-Allow-Origin', '*');
  // For requests without credentials, the server may specify "*" as a wildcard, thereby allowing a user to access the resource even though they are from a different domain, protocol or port.
  res.append('Access-Control-Allow-Headers', '*');
  // this header indicates, as part of the response to a preflight request, which header field names can be used during the actual request.
  next();
};