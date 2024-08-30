import { rekurkeStringify } from "@rshirohara/rekurke-stringify";
import { repixeParse } from "@rshirohara/repixe-parse";
import { repixeStringify } from "@rshirohara/repixe-stringify";
import { unified } from "unified";
import { describe, expect, test } from "vitest";
import { repixeRekurke } from "~/index.js";

describe("repixe-rekurke", () => {
  test("Bridge mode", async () => {
    const result = String(
      await unified()
        .use(repixeParse)
        .use(repixeRekurke, unified())
        .use(repixeStringify)
        .process("たとえば[[rb:私>わたし]]はこの文章を書く。"),
    );
    expect(result).toEqual("たとえば[[rb: 私 > わたし]]はこの文章を書く。");
  });

  test("Bridge mode with options", async () => {
    const result = String(
      await unified()
        .use(repixeParse)
        .use(repixeRekurke, unified(), { preserveUnmatchedSyntax: true })
        .use(repixeStringify)
        .process("たとえば[[rb:私>わたし]]はこの文章を書く。[newpage]"),
    );
    expect(result).toEqual(
      "たとえば[[rb: 私 > わたし]]はこの文章を書く。\n\n[newpage]",
    );
  });

  test("Mutate mode", async () => {
    const result = String(
      await unified()
        .use(repixeParse)
        .use(repixeRekurke)
        .use(rekurkeStringify)
        .process("たとえば[[rb:私>わたし]]はこの文章を書く。"),
    );
    expect(result).toEqual("たとえば|私《わたし》はこの文章を書く。");
  });

  test("Mutate mode with options", async () => {
    const result = String(
      await unified()
        .use(repixeParse)
        .use(repixeRekurke, { preserveUnmatchedSyntax: true })
        .use(rekurkeStringify)
        .process("たとえば[[rb:私>わたし]]はこの文章を書く。[newpage]"),
    );
    expect(result).toEqual(
      "[newpage]\n\nたとえば|私《わたし》はこの文章を書く。\n\n[newpage]",
    );
  });

  test("Mutate mode with `processor: undefined` and options", async () => {
    const result = String(
      await unified()
        .use(repixeParse)
        .use(repixeRekurke, undefined, { preserveUnmatchedSyntax: true })
        .use(rekurkeStringify)
        .process("たとえば[[rb:私>わたし]]はこの文章を書く。[newpage]"),
    );
    expect(result).toEqual(
      "[newpage]\n\nたとえば|私《わたし》はこの文章を書く。\n\n[newpage]",
    );
  });

  test("Understand bridge types", async () => {
    const treeIn = unified()
      .use(repixeParse)
      .parse("たとえば[[rb:私>わたし]]はこの文章を書く。");
    const treeOut = await unified().use(repixeRekurke, unified()).run(treeIn);
    // @ts-expect-error: Bridge mode による型の差異
    const doc = unified().use(repixeStringify).stringify(treeOut);
    expect(doc).toEqual("たとえば[[rb: 私 > わたし]]はこの文章を書く。");
  });

  test("Understand mutate types", async () => {
    const treeIn = unified()
      .use(repixeParse)
      .parse("たとえば[[rb:私>わたし]]はこの文章を書く。");
    const treeOut = await unified().use(repixeRekurke).run(treeIn);
    const doc = unified().use(rekurkeStringify).stringify(treeOut);
    expect(doc).toEqual("たとえば|私《わたし》はこの文章を書く。");
  });
});
