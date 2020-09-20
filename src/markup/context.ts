import {transcriber} from "./transcriber";
import {urlBuilder} from "./url-builder";

export type DlContext = {
  transcriber: transcriber;
  urlBuilder: urlBuilder;
}