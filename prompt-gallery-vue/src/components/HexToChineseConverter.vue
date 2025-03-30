<script setup lang="ts">
import { ref } from 'vue';

const hexInput = ref('');
const chineseOutput = ref('');

const convertHexToChinese = () => {
  try {
    // 移除空格和其他非十六進制字符
    const cleanHex = hexInput.value.replace(/[^0-9A-Fa-f]/g, '');
    
    // 將十六進制字符串分成兩個字符一組
    const hexArray = cleanHex.match(/.{1,2}/g) || [];
    
    // 將十六進制轉換為字節數組
    const bytes = new Uint8Array(hexArray.map(hex => parseInt(hex, 16)));
    
    // 使用TextDecoder將字節數組轉換為中文字符串
    const decoder = new TextDecoder('utf-8');
    chineseOutput.value = decoder.decode(bytes);
  } catch (error) {
    chineseOutput.value = '轉換錯誤，請確保輸入的是有效的UTF-8十六進制值';
    console.error('Conversion error:', error);
  }
};
</script>

<template>
  <div class="hex-converter">
    <h2>十六進制轉中文</h2>
    <div class="converter-container">
      <div class="input-group">
        <label for="hexInput">請輸入十六進制值：</label>
        <textarea
          id="hexInput"
          v-model="hexInput"
          @input="convertHexToChinese"
          placeholder="例如：E4 B8 AD E6 96 87"
          rows="4"
        ></textarea>
      </div>
      <div class="output-group">
        <label>轉換結果：</label>
        <div class="output-box">{{ chineseOutput }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hex-converter {
  padding: 20px;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  margin: 20px 0;
}

.converter-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group, .output-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
  color: var(--color-heading);
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: monospace;
  resize: vertical;
}

.output-box {
  min-height: 50px;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-background);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>