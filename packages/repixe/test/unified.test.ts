import { expect, test } from "vitest";

import { repixe } from "~/";

test("repixe", async () => {
  const source = [
    "unified で Pixiv 小説構文を処理できるかのテスト。\n",
    "ここが二[[rb:段落>だんらく]]目。",
    "ここが二行目。\n\n",
    "ここから三段落目。",
    "[[jumpuri:リンク>https://example.com]]も使える。",
    "[newpage]",
    "ここからページが変わる。",
    "[jump:01]ページへの参照。"
  ].join("\r\n");
  const expected = [
    "unified で Pixiv 小説構文を処理できるかのテスト。\n",
    "ここが二[[rb: 段落 > だんらく]]目。",
    "ここが二行目。\n",
    "ここから三段落目。",
    "[[jumpuri: リンク > https://example.com]]も使える。\n",
    "[newpage]\n",
    "ここからページが変わる。",
    "[jump:1]ページへの参照。"
  ].join("\n");

  expect((await repixe().process(source)).toString()).toEqual(expected);
});
