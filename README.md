# Join Us 2.0

## 專案背景

此專案為 112-2 系統分析與設計之專案，延續自 112-1 資料庫管理實作之簡易活動報名系統，並將其擴充為一個多功能的活動資訊媒合平台，同時整合社群登入、金流等功能，以期提供一站式的校園活動媒合服務。

## 專案說明

下課後的課餘時間、周末沒有特別安排，想做點什麼又懶得自己找人、想踏出家門卻不知道去哪裡
找樂子？心裡想嘗試辦活動，卻害怕成立社團流程繁複？希望可以成為工人參與社團活動卻找不到適合的社團？如果你有這些想法，歡迎來「Join us」尋找、舉辦適合你的活動，為生活增添樂趣！

大學是個自由開放的環境，學校內每天有數十場活動進行著，然而這些活動的資訊透過不同媒介
散播，有時不免覺得資訊過於分散，而難以有效率找到自己想參加的活動，比如社團活動多公告在 FB
粉專、校內活動有時以郵件通知，有時放在布告欄，有時則出現在台大活動報名系統。

我們希望透過設計一套名為「Join us」的活動整理系統，彙整資訊的來源，將活動舉辦者、潛在的工作人員以及活動參與者串連，讓每一個類型的使用者都能在這個平台上找到適合自己的活動，透過這個平台，活動舉辦者能夠更有效率地找到工作人員，工作人員能夠更容易找到工作人員招募資訊，活動參與者能夠更容易找到適合自己的活動。

## 開啟方式

1. 環境配置

檢查以下軟體是否安裝
a. node.js
b. npm
c. docker
d. docker-compose
e. 本地端之 postgresql

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

Cloudinary 的 api 也需要設定，用來存放圖片。

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

5. 打開 `localhost:3000`，開始使用，由於此版本為 demo 版本，因此每次重新啟動都會初始化資料庫，使資料庫回到初始狀態。
