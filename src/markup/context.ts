import {transcriber} from "./transcriber";
import {urlBuilder} from "./url-builder";
import {renderer} from "./renderer";

export type DlContext<OutputT, TExtra> = {
  transcriber: transcriber;
  urlBuilder: urlBuilder;
  renderer: renderer<OutputT, TExtra>;
}
