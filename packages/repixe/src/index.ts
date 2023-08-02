import { repixeParse } from "@rshirohara/repixe-parse";
import { repixeStringify } from "@rshirohara/repixe-stringify";
import { unified } from "unified";

export const repixe = unified().use(repixeParse).use(repixeStringify).freeze();
