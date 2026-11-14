# protoout.studio Astro 検証用コピー

元サイト https://protoout.studio/ の公開情報から作成した、GitHub Pages向けの静的なコピーサイトです。2026-11-13の調査データを使用しています。デザイン刷新や本文の要約は行っていません。公開先リポジトリは https://github.com/protoout/web 、GitHub PagesのURLは https://protoout.github.io/web/ です。検索除外設定を維持した検証用サイトとして公開します。

## 開く

Node.js 24推奨。プロジェクトのフォルダで実行してください。

```sh
npm ci
npm run dev
```

表示先は起動時に表示されるURLです（通常 http://localhost:4321/ ）。

```sh
npm run build
npm run verify
npm run preview
```

`dist/` が公開用のファイルです。サーバー処理やNotionへのログインは必要ありません。

## 作成範囲

- 262ページ＋404ページ。トップ、個人スクール、法人研修、ブログ一覧、インタビュー一覧、制作物一覧、公開設定Yesの225記事、活動情報、表示対象の講師プロフィール、コミュニティ等の固定ページを収録。
- 主要9ページをPC1440×1000・スマホ390×844で比較。トップ・記事一覧・スクールは768×1000も確認。実機試験ではありません。
- スマホメニュー、FAQの開閉、記事・制作物の「さらに読み込む」、ハッシュリンクを静的サイト用に実装。
- 画像・フォント・保存済み動画等1275ファイル、約518MBをローカル保存。最大の単独画像は約9.2MB。画質を勝手に変更せず保持しています。
- Notionの開発タスク等、サイト本文と判断できない175ページは対象外。公開設定Noの記事も対象外。`migration/excluded-pages.json` に除外理由を記録。
- コピー対象内のリンクをローカルURLに変更。対象外20URLへのリンクは元サイトに残しています。`migration/origin-links.json` を参照。
- 元のGoogle Analytics/GTM/Metaの計測コード、Next.js/Wraptasの実行コードは引き継いでいません。

## 検索・AI向けの指定

すべてのHTML（404を含む）に `noindex, nofollow, noarchive, noimageindex` を指定しています。公開ワークフローでも、この指定が抜けると検証が失敗します。サイトマップやフィードは生成していません。

`public/robots.txt` は通常の検索クローラーがHTMLのnoindexを読めるように巡回を許可し、GPTBot・ClaudeBot・Google-Extended等にはDisallowを指定しています。検索エンジン向けに `Disallow: /` だけを使う方法ではURLのインデックスを防げないため、この構成にしています。[Googleの説明](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

`public/llms.txt` に検証用コピーであることと正式サイトを案内しています。このファイル自体に強制力はありません。robots.txtも対応するクローラーへの要請であり、認証や閲覧制限ではありません。

**GitHub Pagesのプロジェクトサイトでは注意:** `https://USER.github.io/REPO/robots.txt` はホスト全体のrobots.txtとして扱われません。ホストルート `/robots.txt` の設置にはルートサイト側の管理が必要です。今回の全ページのmeta noindexは、サブディレクトリ公開でも有効です。

## GitHub Pagesで公開するとき

1. このプロジェクトフォルダの中身を公開先リポジトリのルートに配置します。
2. リポジトリの Settings → Pages → Source で **GitHub Actions** を選びます。
3. Actionsの **Publish preview to GitHub Pages** を手動実行します。

公開処理は `workflow_dispatch` の手動実行のみです。pushだけで自動公開する設定にはしていません。ワークフローが所有者・リポジトリ名から `site` と `base` を設定します。`USER.github.io` リポジトリは `/`、プロジェクトリポジトリは `/REPO/` です。

カスタムドメインを使う場合は、ワークフローのURL設定を変更してください。ローカルでサブディレクトリ公開を検証する例:

```sh
PAGES_SITE=https://example.github.io PAGES_BASE=/protoout-preview/ npm run build
PAGES_BASE=/protoout-preview/ npm run verify
```

[Astro公式のGitHub Pages手順](https://docs.astro.build/en/guides/deploy/github/)

## ファイルの読み方・編集

```text
src/components/SnapshotPage.astro   共通HTML・検索除外・メニュー等
src/pages/[...slug].astro           262ページの静的ルート
src/pages/404.astro                 未収録URLの表示
src/data/pages.json                ページごとの本文HTML・CSS・タイトル・元URL
src/data/styles.json               共通CSS（元サイト由来）
src/data/font-styles.json          ローカルのNoto Sans JP定義
src/data/article-styles.json       記事の固定CTAのスタイル
public/assets/                     画像・フォント等
public/robots.txt                   クローラー向け指定
public/llms.txt                     検証用コピーの説明
scripts/verify-build.mjs            検索除外・URL・画像等の検証
migration/                         出典と対応表・未解決事項
qa/                                実装スクリーンショットと比較画像
.github/workflows/deploy.yml        GitHub Pagesへの手動公開
```

初回の忠実な再現を優先し、本文はサニタイズした公開HTMLのスナップショットをJSONに保持しています。Content Collections/MDXへの分解はまだ行っていません。`__PROTOOUT_BASE__` は共通コンポーネントが公開先のパスに置換します。本文やCSSを書き換える場合は `npm run build && npm run verify` と画面比較を行ってください。外部から任意の未検証HTMLをこの仕組みに投入しないでください。

## 残る制約

- Notionの画像プロキシを参照するCSS画像3URLは取得時400、クエリの文字参照を直した再取得でも403でした。元の参照を残し、`asset-map.json` と検証結果に例外として記録。未取得を代替画像で埋めていません。
- YouTube、X、Notion埋め込み、外部アプリ、動画ファイルは外部サービスへの依存が残ります。X埋め込みには公式widgets.jsを使っています。表示高さや可否はサービスの応答に左右され、完全オフラインのコピーではありません。動画17点のうち1点は原本保存とローカル再生を確認し、残る16点は未保存。`migration/media-map.json` と [Issue #1](https://github.com/protoout/web/issues/1) を参照。動画の全再生試験は未実施。
- フォーム・予約・資料請求は元サイトと同じ外部サービスへのリンクです。実際の送信は試験していません。
- 262ページを生成・静的検査しましたが、目視比較は代表9ページです。全ページのデザイン一致を保証するものではありません。
- 「さらに読み込む」は保存済みカードをまとめて表示する静的な実装です。Notion側で追加された記事は自動同期しません。
- 元サイト由来のタグ・テキスト・日付・画像を保持しています。将来の本番移行時には、収録範囲、リンク先、埋め込み、正式エクスポートの要否を別途確認してください。

検証内容は `design-qa.md`、ビルド結果は `migration/build-verification*.json` に記録しています。


## 独立調査からの追加反映

2026-11-14にClaudeの独立調査と照合し、公開対象の検査、1,366件のネイティブ見出しアンカー、favicon、動画保全の台帳・再開用スクリプトを追加しました。[反映表](migration/claude-integration.md)に事実・採用・保留を分けて記録しています。

ページ追加時は `src/data/pages.json` だけでなく `src/data/publication-policy.json` の許可リストも更新します。旧サイトの404ページや未承認ページは生成時点で拒否します。`npm test` と `npm run verify` を実行してください。カテゴリ別URLと旧URLの301転送は [Issue #3](https://github.com/protoout/web/issues/3) に分けており、まだ切り替えていません。

Issueは `migration`（移行・互換性・保全）と `enhancement`（機能追加・改善）で分類します。GitHub上のIssue作成テンプレートも2種類に分け、選んだ種類のラベルが自動で付くようにしています。
