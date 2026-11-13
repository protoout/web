# デザイン・動作検証

final result: passed

2026-11-13。対象はローカルのAstro検証用コピーと、元サイトの代表9ページ。262ページすべての目視承認を意味しません。

## Findings

代表画面の比較で見つかったP1/P2は修正済みです。確認した範囲に未修正のP0/P1/P2はありません。残る外部サービス依存と未確認範囲は下記に分離しています。

## 比較条件と証拠

- 元サイト: https://protoout.studio/ 、/school、/biz、/posts、/posts_interview、/gallery、/2ed6077e488780dca32eda95afc5cc77、/43fb03d6ab1c4546a6d9010a518e7cb9、/552dbdc82141467e86e82802085a9b65。
- Source visual truth: `qa/source/` の元サイト9ページ・1440/390画像。撮影条件は `qa/source/README.md`。法人ページは今回も撮り直して原画像と同じ高さ13481pxを確認。
- Implementation: http://127.0.0.1:4321/ の同じルート。`qa/home-1440.jpg` 等9ページ×2画面。フルページ比較は `qa/compare-*.jpg`、読めるサイズの部分比較は `qa/focus-*.jpg`。
- CSS viewport: PC1440×1000、スマホ390×844。同一ブラウザ。画面ピクセル幅とCSS幅が1:1。比較画像は左右を同一倍率で縮小した閲覧用合成で、原画像を保持。表の高さは一致率の指標ではなく、寸法の確認に使用。
- Tablet: 768×1000でトップ・記事一覧・スクールの初期表示、ナビゲーション切替、横はみ出しを確認。`qa/*-768.jpg` は初期のフルページ撮影で、全遅延画像の読込を確認した証拠には用いない。
- State: メニュー/FAQを閉じた初期表示、記事一覧追加表示前。遅延画像の読込後に先頭へ戻して撮影。固定ヘッダー・CTAは元サイトと同様にviewport内に写る。
- 元画像と実装のピクセル寸法は `qa/final-screenshot-dimensions.json` に記録。

|ページ|PC 元→実装の高さ|スマホ 元→実装の高さ|全体比較|部分比較|
|---|---|---|---|---|
|home|4721→4721|6985→6985|[PC](qa/compare-home-1440.jpg) / [スマホ](qa/compare-home-390.jpg)|[詳細](qa/preview-desktop.jpg)|
|school|18690→18690|29041→29003|[PC](qa/compare-school-1440.jpg) / [スマホ](qa/compare-school-390.jpg)|[詳細](qa/focus-school-390.jpg)|
|biz|13481→13481|23587→23587|[PC](qa/compare-biz-1440.jpg) / [スマホ](qa/compare-biz-390.jpg)|[詳細](qa/focus-biz-390.jpg)|
|posts|2914→2914|5452→5452|[PC](qa/compare-posts-1440.jpg) / [スマホ](qa/compare-posts-390.jpg)|[詳細](qa/focus-posts-390.jpg)|
|interviews|4507→4507|4996→4996|[PC](qa/compare-interviews-1440.jpg) / [スマホ](qa/compare-interviews-390.jpg)|[詳細](qa/focus-interviews-390.jpg)|
|gallery|4340→4340|8371→8371|[PC](qa/compare-gallery-1440.jpg) / [スマホ](qa/compare-gallery-390.jpg)|[詳細](qa/focus-gallery-390.jpg)|
|article|7265→7265|8201→8203|[PC](qa/compare-article-1440.jpg) / [スマホ](qa/compare-article-390.jpg)|[詳細](qa/focus-article-390.jpg)|
|interview-detail|3103→3103|3744→3744|[PC](qa/compare-interview-detail-1440.jpg) / [スマホ](qa/compare-interview-detail-390.jpg)|[詳細](qa/focus-interview-detail-390.jpg)|
|work-detail|3379→3379|4375→4375|[PC](qa/compare-work-detail-1440.jpg) / [スマホ](qa/compare-work-detail-390.jpg)|[詳細](qa/focus-work-detail-390.jpg)|

## 比較・修正履歴

1. **P1: トップの画像枠・ロゴ配置・CTA背景の相違。** 初回は全高4476px、元サイト4721px。CSSの `>` が抽出時の文字参照 `&gt;` のままになっていました。ページCSSを復号し、元の子セレクター・ロゴ枠・背景オーバーレイを復元。修正後 `compare-home-1440.jpg` / `compare-home-390.jpg` で左右比較、全高4721/6985pxを確認。
2. **P2: フォントとスマホの比較条件。** Noto Sans JPを元の400/700指定でローカル化。スマホviewportを元撮影と同じ844px高に統一。`focus-school-390.jpg` で見出しの太さ・折返し・本文行間を再比較。PCスクールは元と同じ18690px。スマホに残る38pxの差はX埋め込みの応答・表示高さに依存し、固定の空白で帳尻を合わせていません。
3. **P2: 法人ページに読み込み中の余白が残存。** 保存した表示途中のspinnerが一覧グリッドに残り254px高い状態でした。静的コピーに不要なspinnerだけ除去。法人ページを再撮影し、13481px/23587pxで元と一致。`compare-biz-1440.jpg` / `compare-biz-390.jpg`。
4. **P2: スマホ記事の動画枠がPCの高さで固定。** 動画コンテナにPC計測のpadding-bottom432pxが残存。YouTube埋め込みを実際の16:9比率に追従させました。スマホ記事9356px→8203px、元8201px。`compare-article-390.jpg` / `focus-article-390.jpg` で再比較。残る2pxは丸めの範囲として許容。
5. **P2: 固定CTAの文字・高さの相違。** 本文外に置いたCTAが別のフォント・18.4px行間を継承。元サイトと同じNoto Sans JP・24px行間に修正。最終 `focus-posts-390.jpg` で両ボタンの位置・高さ・文言を比較し一致を確認。他ページの固定CTAは同一共通部品です。一部の他ページ比較写真は、この共通CTAの最終修正前のものです。

## 5つの必須比較面

- **文字組み:** 元と同じNoto Sans JPおよびフォールバック、サイズ・ウェイト・行間・字間を維持。見出しと本文、カードの省略、タグの小文字を部分比較。日本語の折返しを確認。別フォントへの近似置換は行っていない。
- **余白・配置:** 共通幅、ヒーロー、段組み、セクション間、角丸、影、モバイルの縦積みを比較。9ページの1440/390で横はみ出しなし。動画とローディング余白の不一致は修正済み。
- **色:** 元CSSの背景・文字・グラデーション・CTA・タグ色を維持。トップ背景の白オーバーレイも復元。ブランド刷新の色変更なし。
- **画像:** 元の画像ファイルを取得し、ロゴ・写真・図・サムネイル・切り抜き位置を維持。手描きSVGやプレースホルダーによる置換なし。代表画面で取得失敗画像なし。未取得CSS画像3URLは別記。
- **本文:** 元HTMLの見出し、本文、日付、タグ、CTA、カード文言を保持。書き換え・要約なし。内部リンクの公開先パスのみ変更。対象外リンクは正式サイトを参照。

## 動作と生成物の検証

- スマホメニューを開く/閉じる: aria-expandedと表示を確認。`qa/home-menu-390.jpg`。
- 法人FAQを開く: 回答本文が表示。`qa/biz-faq-390.jpg`。
- 記事一覧「さらに読み込む」: 非表示59カード→0、追加表示ボタン消去を確認。
- 制作物一覧「さらに読み込む」: 非表示カード0、一覧の103 collection-cardを確認（クラウドファンディング等別形式のカードを除く）。
- 記事カードからコピー側の詳細ページへ遷移することを確認。
- ブラウザコンソール: 代表操作中に収集されたerrorなし。全ページ・全外部埋め込みのエラー不在を保証する検査ではない。
- 全262ルート＋404をビルド。全HTMLのnoindex、ローカル画像・CSS資産、リンクの公開先パス、元計測スクリプトの除去を検査。
- `/` および `/protoout-preview/` の2設定でビルド検証。`migration/build-verification.json` / `migration/build-verification-subpath.json`。

## 未確認・許容する差

- NotionプロキシのCSS画像3URLは取得失敗し元参照を維持。既知の未取得を検査の例外に限定し、別の未解決CSS参照は検査エラーにする。
- XやYouTubeなど外部埋め込みは応答により高さ・表示可否が変わる。学校ページの小さな高さ差はこの範囲として扱う。全動画再生、外部フォーム送信、外部アプリの業務操作は未確認。
- 代表9ページ以外の253ページは静的検査のみ。画面の完全一致は未承認。
- 元の計測スクリプト除去、検索除外、コピー外のリンクを正式サイトへ残すことは検証用コピーの意図的な仕様。

## Implementation Checklist

- [x] 比較で見つかったP1/P2を修正し、同じ画面幅で再比較
- [x] PC・スマホと主要タブレット表示を確認
- [x] メニュー・FAQ・追加表示・記事遷移を確認
- [x] 全ページ検索除外とGitHub Pages用パスを検証
- [x] 制約・公開方法・出典対応表をREADMEに記録

公開は未実施。ソース・静的出力・証拠をローカルで引き渡す。
