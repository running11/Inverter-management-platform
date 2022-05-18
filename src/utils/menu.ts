const routeListKey = "routeList";

export function getRouteList() {
  return localStorage.getItem(routeListKey);
}

export function setRouteLIst(list: any) {
  return localStorage.setItem(routeListKey, JSON.stringify(list));
}

export function clearRouteList(){
  return localStorage.removeItem(routeListKey);
}