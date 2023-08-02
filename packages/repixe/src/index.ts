import { unified } from "unified";

import { repixeParse } from "@rshirohara/repixe-parse";
import { repixeStringify } from "@rshirohara/repixe-stringify";

export const repixe = unified().use(repixeParse).use(repixeStringify).freeze();
