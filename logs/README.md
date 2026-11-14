# protoout.studio 移行ログ

記録整理日：2026-11-15。日時は特記なければ日本時間（Asia/Tokyo）。既存資料・Git履歴・このチャットのユーザー指示・GitHubの取得結果を照合して後から整理したログです。時刻が記録されていない作業は日付のみとし、実施時刻を推測していません。

## 現在地

- 元サイト：[protoout.studio](https://protoout.studio/)（Wraptas／Notion）。移行プレビュー：[GitHub Pages](https://protoout.github.io/web/)。本番ドメイン・DNSは未切替。
- 最新のサイト変更コミットは [`0241078`](https://github.com/protoout/web/commit/02410788f9112880989b1020e5a89da90bdc9cd0)。262ページ＋404を静的生成。HTMLスナップショット方式で、Content Collections／MDXへの全面移行は未実施。
- 全ページのmeta noindexを維持。robots.txt／llms.txtも設定済み。検索公開は未実施。
- 指定コピーライト `© 2019-2026 プロトアウトスタジオ / dotstudio inc.` は262本文ページへ反映済み。
- 調査で発見した動画・新着／人気記事・フッター等の差はIssue化済み、未修正。connpassの定期同期もIssue登録のみ。
- このログの追加はドキュメント整理。サイト実装・公開対象・デプロイ設定は変更しない。

## 日付別の記録

| 日付 | 内容 |
|---|---|
| [2026-11-13](2026-11-13.md) | 既存サイトの調査、デザイン仕様・移行資料、初回コピー作成作業 |
| [2026-11-14](2026-11-14.md) | 初回コミット、独立調査の反映、Issue分類、URL方針、比較調査、コピーライト公開 |
| [2026-11-15](2026-11-15.md) | connpass連携の機能追加Issue、移行ログの整理 |

初回作成作業は11/13から継続していますが、初回Gitコミットの日時は11/14 00:01:38 JSTです。作業日とコミット日を分けています。

## 課題のスナップショット

2026-11-15にGitHubから取得。状態の最新情報は[GitHub Issues](https://github.com/protoout/web/issues)が正です。優先度未設定のものへ独自のラベルは付けていません。

| Issue | 内容 | 分類 | 優先度ラベル | 取得時の状態 |
|---|---|---|---|---|
| [#1](https://github.com/protoout/web/issues/1) | Wraptas依存の動画16点を保全してローカル配信へ切り替える | 移行 | 未設定 | OPEN |
| [#2](https://github.com/protoout/web/issues/2) | Notion正式エクスポートと照合し、本文・共有ブロック・添付の欠落を確認する | 移行 | 未設定 | OPEN |
| [#3](https://github.com/protoout/web/issues/3) | 旧サイトマップからカテゴリ別の新URL対応表を作り、旧URLを301転送する | 移行 | 未設定 | OPEN |
| [#4](https://github.com/protoout/web/issues/4) | 記事本文のYouTube埋め込みが空のコンテナになっているページを確認・対応する | 移行 | high | OPEN |
| [#5](https://github.com/protoout/web/issues/5) | 一部の記事詳細で新着・人気記事のカードが欠落している | 移行 | medium | OPEN |
| [#6](https://github.com/protoout/web/issues/6) | 共通フッターの運営情報・リンクを移行先でどう残すか決める | 移行 | medium | OPEN |
| [#7](https://github.com/protoout/web/issues/7) | 記事一覧のNotionビュー切替UIを廃止・置換するか判断する | 移行 | low | OPEN |
| [#8](https://github.com/protoout/web/issues/8) | Notionブックマークのプレビュー画像を移行先で維持するか判断する | 移行 | low | OPEN |
| [#9](https://github.com/protoout/web/issues/9) | 日本語フォントの配信容量を測定しWOFF2・サブセット化を検討する | 機能追加・改善 | low | OPEN |
| [#10](https://github.com/protoout/web/issues/10) | connpassのイベント情報をGitHub Actionsで定期取得しサイトへ自動反映する | 機能追加・改善 | medium | OPEN |

`migration`は移行・互換性・保全、`enhancement`は機能追加・任意改善。`needs-decision`は採否や仕様の判断が必要な項目です。Issue登録や提案は実装済みを意味しません。

## 根拠資料の入口

- [プロジェクトREADME](../README.md)：構成、起動、公開手順、検索除外、制約。
- [初回デザイン検証](../design-qa.md)：初回実装時の比較・修正と検証範囲。
- [Claude独立調査の反映表](../migration/claude-integration.md)：採用・保留と原本照合の限界。
- [2026-11-14比較調査](../qa/comparison-audit-2026-11-14/report.md)：追加比較、再現URL、比較画像、静的候補と実確認の区別。
- [公開処理の記録](deployment-2026-11-14.json)：コピーライト反映時のコミットとActions結果。
- [Issueの記録](issues-2026-11-15.json)：取得時のタイトル・状態・ラベル・作成／更新日時。
- 初回調査・デザインシステムはリポジトリの親フォルダに受領資料として保存：`../investigation-summary.md`、`../design-system/`、`../from_claude/web/claude-investigation/`（この3パスはリポジトリルート基準。GitHubには同梱されていない）。原本をこのログへ複製していません。

## 今後の追記方法

作業した日の `YYYY-MM-DD.md` に、依頼・確定事項、実施した変更、検証結果、未実施／制約、Issue・コミット・根拠へのリンクを追記します。同じ日なら同じファイルへ追記。過去の「未実施」を完了したように書き換えず、後日の完了記録から参照します。日時はJSTで統一し、観測事実・ユーザー決定・提案を分けます。機密情報、認証情報、非公開Notion原本は記録しません。
