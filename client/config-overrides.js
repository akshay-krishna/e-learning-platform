const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@api": "src/api",
    "@context": "src/context",
  })(config);

  return config;
};
