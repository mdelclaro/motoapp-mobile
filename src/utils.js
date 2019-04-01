import { Platform, PixelRatio } from "react-native";
import { FETCH_TIMEOUT } from "./config";

export function getPixelSize(pixels) {
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels)
  });
}

export function timeout(promise, ms = FETCH_TIMEOUT) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("Erro de conexão (timeout)"));
    }, ms);
    promise.then(resolve, reject);
  });
}
