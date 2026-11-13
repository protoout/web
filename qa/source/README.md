# スクリーンショット一覧

2026-11-13、in-appブラウザ。CSS viewportはPC1440×1000、タブレット768×1000、スマートフォン390×844。JPEG原画像を保持。実機撮影ではない。

|ページ|1440px|768px|390px|
|---|---|---|---|
|トップ|[1440px](01-home-1440.jpg)|[768px](02-home-768.jpg)|[390px](03-home-390.jpg)|
|記事一覧|[1440px](05-posts-1440.jpg)|[768px](06-posts-768.jpg)|[390px](07-posts-390.jpg)|
|記事詳細|[1440px](08-article-1440.jpg)|[768px](09-article-768.jpg)|[390px](10-article-390.jpg)|
|個人スクール|[1440px](11-school-1440.jpg)|[768px](12-school-768.jpg)|[390px](13-school-390.jpg)|
|法人研修|[1440px](14-biz-1440.jpg)|[768px](15-biz-768.jpg)|[390px](16-biz-390.jpg)|
|インタビュー一覧|[1440px](18-interviews-1440.jpg)|[768px](19-interviews-768.jpg)|[390px](20-interviews-390.jpg)|
|制作物一覧|[1440px](21-gallery-1440.jpg)|[768px](22-gallery-768.jpg)|[390px](23-gallery-390.jpg)|
|インタビュー詳細|[1440px](24-interview-detail-1440.jpg)|[768px](25-interview-detail-768.jpg)|[390px](26-interview-detail-390.jpg)|
|制作物詳細|[1440px](27-work-detail-1440.jpg)|[768px](28-work-detail-768.jpg)|[390px](29-work-detail-390.jpg)|

追加状態：[モバイルメニュー開](04-home-390-menu-open.jpg)、[biz FAQ開](17-biz-390-faq-open.jpg)。URL・保存日時JST・寸法・SHA256は [manifest.csv](manifest.csv)。日時は最終保存時刻。上書き再撮影あり。

[overview-mobile.png](overview-mobile.png) は原画像の先頭を切り出して並べた閲覧用プレビュー。原画像の代替証拠ではない。

![主要9ページの390px先頭](overview-mobile.png)

## 画像を見るときの制約

- フルページ画像内の固定ヘッダー/CTAは撮影viewportに固定された場所に写る。文書中段に挿入されている意味ではない。
- 画像の遅延読込を促すためスクロールして再撮影した。撮影間にページ全高が変化し、measurement JSONのheight/yと画像が一致しない場合がある。値ごとの取得状態を優先する。
- 代表記事のYouTubeはDOMにプレーヤーを確認したが画像内は空白。schoolのYouTubeではサムネイルを表示できた。X投稿領域は空白のまま。これらは表示制約付き記録で、空白を完成した元デザインの指定と解釈しない。
- 動画再生、全画像の本体取得、全外部サービスの動作は確認していない。長いschool/biz画像は拡大または分割して確認する。
