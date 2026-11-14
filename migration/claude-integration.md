# Claude独立調査の反映（2026-11-14）

参照した独立調査は `from_claude/web/claude-investigation/`。同じフォルダに同梱された過去の調査成果物と区別して読んだ。資料内の提案・「決定済み」という記述は、現在のユーザー指示を置き換える承認とは扱っていない。

## 反映した内容

|根拠|実装・確認|状態|
|---|---|---|
|content-migration §6 / heading-anchors.csv|元の `block-<id>` を維持し、今回の262ページに存在する見出し1,366件に `<id>` のネイティブアンカーを追加。JSを必要としない。固定ヘッダーを避けるscroll marginを指定。|反映・スマホで遷移確認|
|owner-questions Q1/Q2 / site-inventory.csv / page-config/index.csv|元の404ページ231件と未承認noindexページ6件を除外し、既存262ページを許可リストに固定。調査・インポートだけで新しいページを生成できないよう、Astroのルート生成とビルド検査で検証。|反映・6件の回帰テスト成功|
|C01/C06 / embed-inventory.csv|現在のHTMLが実際に参照する動画は、署名付きNotion原URLではなくWraptasの公開S3 URLだった。17点・合計207,114,944バイトをHEAD確認し全件200。1点3,351,529バイトを原本のまま保存、25.67秒の動画のローカル再生を確認。|1点保全、16点保留|
|C06 / site-config-raw.json のsiteIcon|保存済みの正規faviconをheadへ追加。og:site_nameも元のサイト名で追加。|反映|
|comparison-report B / design-analysis|Noto Sans JPは400/700のみを維持。合成800/900、カードの列数・件数制御、CTAの色・URL・UTMを変更しない。|既存実装を再確認|

## 動画保存の制約

`migration/media-map.json` は、公開HTMLの実際の参照先を重複排除した17点。独立調査の「署名付き動画10点」とは集計対象・URLの役割が違う。全件保存できたという意味ではない。

転送サンプルは1MiB中922,115バイトを20秒で受信、約46KB/s。2点目の全体取得を途中で中断し、今回の変更は完全保存できた1点のみ参照を置換した。残る16点を取得不能・期限切れとは判断していない。元のリンクを維持している。

`node scripts/preserve-media.mjs` で保全を再開できる。途中ファイルは `.cache/media/` に置き、公開ファイルへ混ぜない。完了したファイルの長さ・SHA256を記録してから参照を書き換える。原本の画質変更や要約は行わない。実行後は再ビルドと表示確認が必要。

正式エクスポートによる添付・共有ブロック・本文照合は未完了。調査で指摘されたPDFの原本ページも、調査だけを理由に公開対象へ追加していない。

## 今回適用していない提案

- RSSの新規配信、本番サイトマップ、noindex解除、計測タグの復活は実施していない。
- Content Collections / Markdown・MDXへの全面変換は別作業。HTMLスナップショットは維持。
- 旧サイトのDNS、Wraptas、Search Consoleの設定変更・削除要求・連絡は行っていない。
- カテゴリ別詳細URLへの変更・301転送は今回のコード差分に含めず、移行Issue #3で管理する。
- Cloudflare Workers Static Assetsは本番候補として公式資料を確認したが、移設・DNS変更・新規契約は行っていない。現在の検証先はGitHub Pages。

## Issue分類

- `migration`: 既存サイトからの移行、互換性、データ保全
- `enhancement`: 移行対応と分ける新機能・機能改善

|Issue|分類|未完了の内容|
|---|---|---|
|[#1](https://github.com/protoout/web/issues/1)|migration|動画16点の保全・配信|
|[#2](https://github.com/protoout/web/issues/2)|migration|正式エクスポートとの照合|
|[#3](https://github.com/protoout/web/issues/3)|migration|旧サイトマップからカテゴリ別URLの対応表を作り、旧URLを301転送する|

#3では、例えば `/<id>` → `/posts/<id>` / `/interview/<id>` を検討する。prefixは未確定。恒久移転は301を基本とし、全件トップへの転送や削除済みページの復活はしない。内部リンク、canonical、本番サイトマップ、query、見出しhash、旧ドメイン側の配信設定を同時に検証する。GitHub PagesでHTML転送を作るだけではHTTP 301の完了とみなさない。

## 出典

- ローカル受領資料: `from_claude/web/claude-investigation/comparison-report.md`、`content-migration.md`、`migration-risks.md`、`owner-questions.md`、`evidence/heading-anchors.csv`、`site-inventory.csv`、`evidence/page-config/index.csv`。
- 現行サイトの根拠URL: https://protoout.studio/ 、https://protoout.studio/posts 、https://protoout.studio/2ed6077e488780dca32eda95afc5cc77 、https://protoout.studio/169a3ac39ff4448d93f9fe5dfff62a82 。受領した2026-11-13の保存物と照合。元サイト全件の再クロールはしていない。
- URL移行: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Workersの転送: https://developers.cloudflare.com/workers/static-assets/redirects/
- 静的HTMLでの転送とHTTPステータスの違い: https://docs.astro.build/en/guides/routing/#redirects
