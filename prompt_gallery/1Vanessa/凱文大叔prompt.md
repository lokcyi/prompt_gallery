
凱文大叔prompt

除了請AI用繁體中文回覆外，你在使用AI Coding還會加上那些提示詞（Rules）
以下是我使用的

1. 開發環境為windows系統，終端機指令請使用PowerShell相容語法（例如使用 && 分隔指令）
2. 請勿直接產生專案架構目錄以及相關設定，需使用指令方式建立專案架構
3. 產生程式的同時都需要提供函式級註解
4. 規劃專案時須提供使用框架的分析建議，並由用戶選擇最終使用的框架
5. 協調者模式(迴旋標模式)最後需將所有子任務完成報告記錄在任務報告檔案中(report.md)
6. 架構模式完成後需產生規格文件(spec.md)以及任務清單(todolist.md)，規格文件須包含流程圖、循序圖、物件關聯圖等相關UML
7. Code模式需遵循 spec.md 開發，每次修改程式前都需確認 spec.md，任務完成後都需更新任務進度( todolist.md ) 
8. 最後完成專案需撰寫 readme.md，內容包含專案描述、檔案結構、使用技術、檔案清單，檔案簡短說明、安裝及執行方式
9. 每個重要任務完成後都需建立checkpoint，且須使用有意義的說明
