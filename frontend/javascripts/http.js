import popsicle from "popsicle";
import popsicleStatus from "popsicle-status";

function makeRequest(...args) {
  return popsicle(...args)
    .use(popsicle.plugins.parse)
    .use(popsicleStatus());
}

export default { makeRequest };
