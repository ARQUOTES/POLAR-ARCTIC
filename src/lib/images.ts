import arcticFjord from "@/assets/arctic-fjord.jpg";
import aurora from "@/assets/aurora.jpg";
import blueIce from "@/assets/blue-ice.jpg";
import himalaya from "@/assets/himalaya.jpg";
import iceShelf from "@/assets/ice-shelf.jpg";
import shipDeck from "@/assets/ship-deck.jpg";
import southernOcean from "@/assets/southern-ocean.jpg";
import stationNight from "@/assets/station-night.jpg";

const imageMap: Record<string, string> = {
  "arctic-fjord": arcticFjord,
  aurora,
  "blue-ice": blueIce,
  himalaya,
  "ice-shelf": iceShelf,
  "ship-deck": shipDeck,
  "southern-ocean": southernOcean,
  "station-night": stationNight,
};

export function imageFor(key: string | null | undefined): string {
  return (key && imageMap[key]) || iceShelf;
}
