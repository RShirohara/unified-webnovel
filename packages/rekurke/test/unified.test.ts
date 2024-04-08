import { expect, test } from "vitest";
import { rekurke } from "~/index.js";

test("rekurke", async () => {
  const source = [
    "unified でカクヨム小説構文をレンダリングできるかのテスト。\r\n",
    "ここが二｜段落《だんらく》目。",
    "ここが二行目。\n\r\r",
    "ここから三段落《さんだんらく》目。",
    "《《強調》》も使える。\r\r\n\n",
  ].join("\n");
  const expected = [
    "unified でカクヨム小説構文をレンダリングできるかのテスト。\n",
    "ここが二|段落《だんらく》目。",
    "ここが二行目。\n\n",
    "ここから|三段落《さんだんらく》目。",
    "《《強調》》も使える。\n\n\n",
  ].join("\n");

  expect((await rekurke().process(source)).toString()).toEqual(expected);
});
