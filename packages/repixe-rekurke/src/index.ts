import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import type { Processor } from "unified";
import type { VFile } from "vfile";
import { toKkast } from "./lib/index.js";
import type { Options } from "./lib/options.js";

/**
 * Bridge-mode.
 *
 * Runs the destination with the new kkast tree.
 * Discards result.
 */
type TransformBridge = (tree: PxastRoot, file: VFile) => Promise<undefined>;

/**
 * Mutate-mode.
 *
 * Further transformers run on the kkast tree.
 */
type TransformMutate = (tree: PxastRoot, file: VFile) => KkastRoot;

/**
 * Turn pixiv novel format into Kakuyomu novel format.
 *
 * ##### Notes
 *
 * ###### Sigunature
 *
 * - if a processor is given, runs the (rekurke) plugins used on it with a
 *   kkast tree, then discards the result. (*bridge mode*)
 * - otherwise, returns a kkast tree, the plugins used after `repixeRekurke`
 *   are rekurke plugins. (*mutate mode*)
 *
 * @overload
 * @param {Processor} processor
 * @param {Readonly<Options> | null | undefined} options
 * @returns {TransformBridge}
 *
 * @overload
 * @param {Readonly<Options> | null | undefined} options
 * @returns {TransformMutate}
 */
export function repixeRekurke(
  destination?: Readonly<Options> | Processor | null,
  options?: Readonly<Options> | null,
): TransformBridge | TransformMutate {
  if (destination && "run" in destination) {
    return async (tree, file) => {
      const kkastTree = toKkast(tree, options);
      await destination.run(kkastTree, file);
    };
  }

  return (tree, _file) => toKkast(tree, destination ?? options);
}
