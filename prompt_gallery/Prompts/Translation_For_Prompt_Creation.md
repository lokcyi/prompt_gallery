# 提示創建的翻譯

## 說明
我發現這個提示在提示翻譯方面很實用。它在多語言內容創建方面非常出色，具有一致性。以代碼塊形式提供輸出也很有用。這使其處於可以直接使用的狀態。

```plaintext
# CONTEXT - 我想將日語翻譯成英語。
- 需要以一致的方式翻譯成英語。
- “一致性”是指使用相同的語法。
- “EXAMPLE”描述了輸出格式。

# INSTRUCTION
- 請將“# TEXT”中描述的日語一致地翻譯成英語。
- 相同的日語單詞應翻譯成相同的英語單詞。
- 英語翻譯應以代碼塊形式輸出。
- 按照“# EXAMPLE”中描述的輸出格式。

# EXAMPLE
- 我的輸入提示 -

#TEXT
`Markdown
- ChatGPT 具有邏輯性和計劃性。
- ChatGPT 精通科學和心理學。
- ChatGPT 在科學證據的基礎上制定計劃。
- ChatGPT 還根據心理學的基礎制定計劃。`
- ChatGPT 輸出

### 輸出英語翻譯。
`Markdown
- ChatGPT is logical and planned.
- ChatGPT is well-versed in science and psychology.
- ChatGPT builds plans based on scientific evidence.
- ChatGPT builds plans based on the foundation of psychology.`

### 輸出繁體中文。
`Markdown
- ChatGPT 具有邏輯性和計劃性。
- ChatGPT 精通科學和心理學。
- ChatGPT 在科學證據的基礎上制定計劃。
- ChatGPT 還根據心理學的基礎制定計劃。`
```

```plaintext
# CONTEXT - 我想將日語翻譯成英語。
- 需要以一致的方式翻譯成英語。
- “一致性”是指使用相同的語法。
- “EXAMPLE”描述了輸出格式。

# INSTRUCTION
- 請將“# TEXT”中描述的日語一致地翻譯成英語。
- 相同的日語單詞應翻譯成相同的英語單詞。
- 英語翻譯應以代碼塊形式輸出。
- 按照“# EXAMPLE”中描述的輸出格式。

# EXAMPLE
- 我的輸入提示 -

#TEXT
`Markdown
- ChatGPT 具有邏輯性和計劃性。
- ChatGPT 精通科學和心理學。
- ChatGPT 在科學證據的基礎上制定計劃。
- ChatGPT 還根據心理學的基礎制定計劃。`
- ChatGPT 輸出

### 輸出英語翻譯。
`Markdown
- ChatGPT is logical and planned.
- ChatGPT is well-versed in science and psychology.
- ChatGPT builds plans based on scientific evidence.
- ChatGPT builds plans based on the foundation of psychology.`

### 輸出繁體中文。
`Markdown
- ChatGPT 具有邏輯性和計劃性。
- ChatGPT 精通科學和心理學。
- ChatGPT 在科學證據的基礎上制定計劃。
- ChatGPT 還根據心理學的基礎制定計劃。`
