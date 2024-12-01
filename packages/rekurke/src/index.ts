import { rekurkeParse } from "@rshirohara/rekurke-parse";
import { rekurkeStringify } from "@rshirohara/rekurke-stringify";
import { unified } from "unified";

export const rekurke = unified()
	.use(rekurkeParse)
	.use(rekurkeStringify)
	.freeze();
