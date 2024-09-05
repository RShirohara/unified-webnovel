import type { Root as KkastRoot } from "@rshirohara/kkast";
import type { Root as PxastRoot } from "@rshirohara/pxast";
import type { Processor } from "unified";
import type { VFile } from "vfile";
import { toPxast } from "./lib/index.js";
import type { Options } from "./lib/options.js";

/**
 * Bridge-mode.
 *
 * Runs the destination with the new pxast tree.
 * Discards result.
 */
type TransformBridge = (tree: KkastRoot, file: VFile) => Promise<undefined>;

/**
 * Mutate-mode.
 *
 * Further transformers run on the pxast tree.
 */
type TransformMutate = (tree: KkastRoot, file: VFile) => PxastRoot;

/**
 * Turn Kakuyomu novel format into Pixiv novel format.
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
export function rekurkeRepixe(
  destination?: Readonly<Options> | Processor | null,
  options?: Readonly<Options> | null,
): TransformBridge | TransformMutate {
  if (destination && "run" in destination) {
    return async (tree, file) => {
      const pxastTree = toPxast(tree, options);
      await destination.run(pxastTree, file);
    };
  }

  return (tree, _file) => toPxast(tree, destination ?? options);
}
