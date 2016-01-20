import { Color } from "./color";

export interface ColorFunc {
	(color: Color): void;
}
