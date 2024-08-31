import { rekurkeParse } from "@rshirohara/rekurke-parse";
import { rekurkeStringify } from "@rshirohara/rekurke-stringify";
import { repixeStringify } from "@rshirohara/repixe-stringify";
import { unified } from "unified";
import { describe, expect, test } from "vitest";
import { rekurkeRepixe } from "~/index.js";

describe("rekurke-repixe", () => {
  test("Bridge mode", async () => {
    const result = String(
      await unified()
        .use(rekurkeParse)
        .use(rekurkeRepixe, unified())
        .use(rekurkeStringify)
        .process("たとえば|私《わたし》はこの文章を書く。"),
    );
    expect(result).toEqual("たとえば|私《わたし》はこの文章を書く。");
  });

  test("Bridge mode with options", async () => {
    const result = String(
      await unified()
        .use(rekurkeParse)
        .use(rekurkeRepixe, unified(), { preserveUnmatchedSyntax: true })
        .use(rekurkeStringify)
        .process("たとえば|私《わたし》はこの《《文章》》を書く。"),
    );
    expect(result).toEqual("たとえば|私《わたし》はこの《《文章》》を書く。");
  });

  test("Mutate mode", async () => {
    const result = String(
      await unified()
        .use(rekurkeParse)
        .use(rekurkeRepixe)
        .use(repixeStringify)
        .process("たとえば|私《わたし》はこの《《文章》》を書く。"),
    );
    expect(result).toEqual("たとえば[[rb: 私 > わたし]]はこの文章を書く。");
  });

  test("Mutate mode with options", async () => {
    const result = String(
      await unified()
        .use(rekurkeParse)
        .use(rekurkeRepixe, { preserveUnmatchedSyntax: true })
        .use(repixeStringify)
        .process("たとえば|私《わたし》はこの《《文章》》を書く。"),
    );
    expect(result).toEqual(
      "たとえば[[rb: 私 > わたし]]はこの《《文章》》を書く。",
    );
  });

  test("Mutate mode with `processor: undefined` and options", async () => {
    const result = String(
      await unified()
        .use(rekurkeParse)
        .use(rekurkeRepixe, undefined, { preserveUnmatchedSyntax: true })
        .use(repixeStringify)
        .process("たとえば|私《わたし》はこの《《文章》》を書く。"),
    );
    expect(result).toEqual(
      "たとえば[[rb: 私 > わたし]]はこの《《文章》》を書く。",
    );
  });

  test("Understand bridge types", async () => {
    const treeIn = unified()
      .use(rekurkeParse)
      .parse("たとえば|私《わたし》はこの文章を書く。");
    const treeOut = await unified().use(rekurkeRepixe, unified).run(treeIn);
    // @ts-expect-error: Bridge mode による型の差異
    const doc = unified().use(rekurkeStringify).stringify(treeOut);
    expect(doc).toEqual("たとえば|私《わたし》はこの文章を書く。");
  });

  test("Understand mutate types", async () => {
    const treeIn = unified()
      .use(rekurkeParse)
      .parse("たとえば|私《わたし》はこの文章を書く。");
    const treeOut = await unified().use(rekurkeRepixe).run(treeIn);
    const doc = unified().use(repixeStringify).stringify(treeOut);
    expect(doc).toEqual("たとえば[[rb: 私 > わたし]]はこの文章を書く。");
  });
});
