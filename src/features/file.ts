import { store } from "../../src/store";
import { loadCanvas } from "./canvas";

export const download = (jsonFile: string, exportName: string) => {
  const dataStr = "data:text/json;charset=utf-8," + jsonFile;
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const upload = (file: File, callback?: (data: string) => void) => {
  const fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = () => {
    store.dispatch(loadCanvas(JSON.parse(fileReader.result as string)));
    if (callback) callback(fileReader.result as string);
  };
  fileReader.onerror = () => {
    console.error(fileReader.error);
  };
};
