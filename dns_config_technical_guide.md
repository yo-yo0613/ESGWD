# 工程師操作指南：網域解析（DNS）與 Vercel 託管配置

本文件提供開發人員與網管工程師將公司既有網域（已使用三年以上）安全對接至 Vercel 託管服務的具體操作流程，並確保現有電子郵件（MX 記錄）服務完全不受影響。

---

## 一、 DNS 對接核心參數

在您將網域新增至 Vercel 專案後，請於您的網域註冊商（Registrar，如 GoDaddy, Namecheap, Hinet, 中華電信等）之 DNS 管理控制台，進行以下記錄配置。

### 1. 根網域（Apex Domain，例如 `yourdomain.org`）配置
建議將根網域指向 Vercel 的 Anycast A 記錄：
* **記錄類型 (Type)**：`A`
* **主機記錄 (Host/Name)**：`@`
* **指向目標 (Value/IP)**：`76.76.21.21`
* **TTL**：`600` 或 `3600`（建議在轉移期間調小，如 `300`，轉移完成後再恢復）

*註：如果網域註冊商支援 `ALIAS` 或 `ANAME` 記錄，亦可將 `@` 指向 `cname.vercel-dns.com`，這在 CDN 動態路由上表現更佳。*

### 2. 子網域（Subdomain，例如 `www.yourdomain.org`）配置
將子網域透過 CNAME 進行規範化命名指向：
* **記錄類型 (Type)**：`CNAME`
* **主機記錄 (Host/Name)**：`www`
* **指向目標 (Value/Target)**：`cname.vercel-dns.com.` (注意尾端的半形點號，部分平台會自動補上)
* **TTL**：`3600`

---

## 二、 生產環境 SSL 證書配置與驗證

1. **憑證自動核發 (Let's Encrypt SSL)**：
   * 當 DNS 記錄指向完成後，Vercel 伺服器會自動透過 ACME 協議向 Let's Encrypt 申請 SSL/TLS 憑證並自動配置。您不需要手動申請或上傳 `.pem` / `.key` 檔案。
2. **驗證 DNS 傳播狀態**：
   * 在終端機中使用 `dig` 命令或 `nslookup` 查詢是否已指向成功：
     ```bash
     # 查詢根網域 A 記錄
     dig yourdomain.org A
     
     # 查詢子網域 CNAME 記錄
     dig www.yourdomain.org CNAME
     ```
   * 亦可使用線上工具（如 [DNS Checker](https://dnschecker.org/)）確認全球 DNS 節點的更新狀態。

---

## 三、 資安與 Email 服務共存防護（不可觸碰之記錄）

**極度重要：** 在調整 DNS 記錄時，**千萬不可刪除或修改現有的 Email 相關記錄**，以確保公司日常電子郵件收發 100% 正常。

請確保以下記錄**維持原狀**：
1. **MX 記錄 (Mail Exchanger)**：例如指向 `msoxd.lync.com` 或 `mx.zoho.com`。這是確保信件流向原有 Microsoft 365 或其他郵件伺服器的關鍵。
2. **TXT 記錄 (SPF 防垃圾信協定)**：例如包含 `v=spf1 include:spf.protection.outlook.com -all`。修改它會導致公司寄出的信件被判定為垃圾郵件。
3. **CNAME 記錄 (郵件服務專用)**：例如 `autodiscover.yourdomain.org`，這是 Outlook 或其他郵件客戶端自動偵測連線設定所需的，請勿更動。
