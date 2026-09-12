//#region \0%23tanstack-start-server-fn-resolver
var manifest = { "f0a3a5ccbdb22f40ebaaba1816791b4b43b0fa7c01a1b69a1d3ba82387dd442c": {
	functionName: "generateOutreach_createServerFn_handler",
	importer: () => import("./outreach.functions-BsO2Ik-P.js")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
