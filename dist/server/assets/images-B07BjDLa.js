//#endregion
//#region src/lib/images.ts
var imageMap = {
	"arctic-fjord": "/assets/arctic-fjord-Cjqwltjb.jpg",
	aurora: "/assets/aurora-BKkQ0jrB.jpg",
	"blue-ice": "/assets/blue-ice-DoZxXpoV.jpg",
	himalaya: "/assets/himalaya-nH8TJ59t.jpg",
	"ice-shelf": "/assets/ice-shelf-BlDpcU11.jpg",
	"ship-deck": "/assets/ship-deck-TV6BSWuE.jpg",
	"southern-ocean": "/assets/southern-ocean-COqDa3xH.jpg",
	"station-night": "/assets/station-night-CTz169wT.jpg"
};
function imageFor(key) {
	return key && imageMap[key] || "/assets/ice-shelf-BlDpcU11.jpg";
}
//#endregion
export { imageFor as t };
