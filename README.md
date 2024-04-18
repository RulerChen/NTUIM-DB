# 112-1-Final-Project

## 專案說明

下課後的課餘時間、周末沒有特別安排，想做點什麼又懶得自己找人、想踏出家門卻不知道去哪裡
找樂子？心裡想嘗試辦活動，卻害怕成立社團流程繁複？如果你有這些想法，歡迎來「Join us」尋找、
舉辦適合你的活動，為生活增添樂趣！

大學是個自由開放的環境，學校內每天有數十場活動進行著，然而這些活動的資訊透過不同媒介
散播，有時不免覺得資訊過於分散，而難以有效率找到自己想參加的活動，比如社團活動多公告在 FB
粉專、校內活動有時以郵件通知，有時放在布告欄，有時則出現在台大活動報名系統。我們希望透過設
計一套名為「Join us」的活動整理系統，彙整資訊的來源，讓使用者可以透過分類器快速篩選，尋找自
己想參與的活動並進行報名。

## 簡易示例

主要示例請參考 demo 影片

- 註冊登入帳號 / OAuth 登入
- 可以瀏覽 / 追隨 / 參加 / 新增 / 評論活動
- 活動主持人可以踢人 / 結束活動
- 查看 / 更新個人資料
- 活動聊天室

## 開啟方式

1. git clone

```bash
git clone git@github.com:RulerChen/112-1-Database-Final.git
```

2. 安裝套件

需要有 node.js 和 npm，版本依照 `.nvmrc`

```bash
npm install

cd frontend && npm install

cd ../backend && npm install
```

3. 建立 .env 檔案

把 .env 檔案貼到 backend 資料夾裡面，

需要依據 `backend/.env.example` 的欄位寫到 `.env` 中，需要額外連接 [google](https://console.cloud.google.com/) 和 [facebook](https://developers.facebook.com/?locale=zh_TW) 的 api，
以及 linepay 的 api，

另外 google 和 facebook 的 api 需要設定 callback url，分別是 `http://localhost:8080/api/user/google/callback` 和 `http://localhost:8080/api/user/facebook/callback`。

4. 開啟檔案

需要開啟兩個 terminal 分別執行 backend 和 frontend
    
```bash
cd backend && npm run dev
```

```bash
cd frontend && npm run dev
```

同時使用 docker-compose 啟動 postgres

```bash
cd backend

docker compose up -d
```

5. 打開 `localhost:3000`，開始使用
