const host = "http://10.61.144.243";
const port = "23123";

const exp = {
  host,
  port
};


if (typeof require != "undefined") {
  module.exports = exp;
}
export default exp;
