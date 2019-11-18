const host = "http://127.0.0.1";
const port = "23123";

const exp = {
  host,
  port
};


if (typeof require != "undefined") {
  module.exports = exp;
}
export default exp;
