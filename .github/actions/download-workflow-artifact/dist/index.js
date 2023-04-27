/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 943:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 879:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(943);
const github = __nccwpck_require__(879);
const fs = __nccwpck_require__(147);

async function run() {
  try {
    const allArtifacts = await github.rest.actions.listWorkflowRunArtifacts({
      owner: context.repo.owner,
      repo: context.repo.repo,
      run_id: context.payload.workflow_run.id,
    });
    const matchArtifact = allArtifacts.data.artifacts.filter((artifact) => {
      return artifact.name === core.getInput('artifact-name')
    })[0];
    if (!matchArtifact) throw new Error(`No artifact with name '${core.getInput('artifact-name')}' found`);
  
    const download = await github.rest.actions.downloadArtifact({
      owner: context.repo.owner,
      repo: context.repo.repo,
      artifact_id: matchArtifact.id,
      archive_format: 'zip',
    });
   
   fs.writeFileSync(`${process.env.GITHUB_WORKSPACE}/${core.getInput('save-as')}`, Buffer.from(download.data));
  
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
})();

module.exports = __webpack_exports__;
/******/ })()
;