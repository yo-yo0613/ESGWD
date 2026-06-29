# 世界公民基金會 官方網站 (World Citizen Foundation Website)

本專案為世界公民基金會的官方入口網站，採用現代化 **React + TypeScript + Vite + Tailwind CSS** 技術建置，並整合 **Supabase 雲端資料庫** 與 **Cloudinary 雲端圖床**，提供全視覺化的網站後台管理系統（CMS）。

---

## 🛠️ 技術架喚 (Technical Stack)

*   **前端網頁框架**：React 19 + TypeScript
*   **建置與打包工具**：Vite 8 (Rolldown 編譯引擎)
*   **樣式處理**：Tailwind CSS (響應式排版，完美支援手機與桌機)
*   **動畫效果**：Framer Motion (流暢的轉場與微互動)
*   **後端與資料庫**：Supabase (提供 Serverless 雲端 PostgreSQL 資料庫，負責儲存網頁文字與最新消息)
*   **雲端圖床**：Cloudinary (負責儲存後台所有上傳的橫幅相片、電子書封面與合作夥伴 Logo)

---

## 📂 專案目錄結構 (Project Structure)

```text
├── src/
│   ├── components/       # 共用 React 元件 (Navbar, Footer, 後台管理等)
│   ├── pages/            # 各分頁元件 (關於我們、服務專案、出版品等)
│   ├── data/             # 初始靜態資料與範本
│   ├── utils/            # 雲端客戶端工具 (Supabase 連線設定等)
│   ├── App.tsx           # 主路由設定 (React Router)
│   ├── main.tsx          # 進入點
│   └── index.css         # 全域樣式設定
├── public/               # 靜態資源 (圖示、檔案)
├── package.json          # 套件依賴與腳本設定
├── Dockerfile            # Docker 建置設定檔
├── nginx.conf            # Nginx 網頁伺服器路由設定檔
└── README.md             # 本說明文件
```

---

## 💻 本地端開發與啟動指南 (Local Development)

若要在您的個人電腦（本機端）跑起這個專案，請遵循以下步驟：

### 1. 環境準備
請確認您的電腦已安裝 **Node.js** (建議 LTS 版本，例如 Node.js 20+)。
*   [Node.js 官方下載連結](https://nodejs.org/)

### 2. 下載並進入專案目錄
如果您使用 Git，請複製儲存庫：
```bash
git clone https://github.com/yo-yo0613/ESGWD.git
cd ESGWD
```
或者直接解壓縮專案壓縮檔並使用終端機進入該資料夾。

### 3. 安裝依賴套件
在專案根目錄下執行以下指令安裝所有必備套件：
```bash
npm install
```

### 4. 啟動本地開發伺服器
安裝完成後，執行以下指令啟動開發模式：
```bash
npm run dev
```
啟動後，控制台會顯示本地連結（通常是 `http://localhost:5173/`）。打開瀏覽器輸入該網址即可預覽並進行開發。

### 5. 專案編譯與打包 (Production Build)
若要生成用於部署的正式版網頁檔案，請執行：
```bash
npm run build
```
編譯完成後，會在根目錄產生一個 `dist` 資料夾，裡面即是打包好的 HTML、CSS 與 JavaScript 靜態檔案。

---

## 🐳 Docker 容器化部署指南 (Docker Deployment)

本專案已配置好 `Dockerfile` 與 `nginx.conf`，支援使用 Docker 容器化運行，確保跨平台環境一致。

### 1. 建置 Docker 映像檔
在專案根目錄下，執行以下指令建立 Docker Image：
```bash
docker build -t esgwd-web .
```

### 2. 啟動 Docker 容器
建置完成後，將映像檔運行在本地的 `8080` 連接埠上：
```bash
docker run -d -p 8080:80 --name esgwd-site esgwd-web
```
啟動後，直接在瀏覽器開啟 `http://localhost:8080/` 即可瀏覽網站。

### 3. 停止與刪除容器
```bash
docker stop esgwd-site
docker rm esgwd-site
```
