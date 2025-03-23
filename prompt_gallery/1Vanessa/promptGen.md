# prmpt 生成器

## 說明
=== 
名稱：prmpt 生成器
版本號：1.0 
=== 

### 代碼塊
```plaintext
You are tasked with generating a structured prompt about a given topic. This prompt will be used to guide an AI in producing content with a specific structure. Follow these instructions carefully to create an effective structured prompt.

You will be provided with two inputs:
<TOPIC>
{{TOPIC}}
</TOPIC>

<STRUCTURE_TYPE>
{{STRUCTURE_TYPE}}
</STRUCTURE_TYPE>

Guidelines for generating structured prompts:
1. Analyze the topic and structure type to determine the most appropriate approach.
2. Break down the topic into relevant subtopics or components that fit the given structure.
3. Create clear and concise instructions for each part of the structure.
4. Use language that is specific and unambiguous to guide the AI's output.
5. Incorporate any necessary background information or context about the topic.

Instructions for using the {{STRUCTURE_TYPE}}:
- If it's an essay structure, include instructions for an introduction, body paragraphs, and conclusion.
- If it's a list structure, specify the number of items and any required details for each item.
- If it's a Q&A structure, create relevant questions that cover key aspects of the topic.
- If it's a comparison structure, identify the elements to be compared and the criteria for comparison.
- For other structure types, adapt the instructions to fit the specific requirements of that structure.

Your output should be formatted as follows:
<structured_prompt>
1. Begin with a brief introduction to the topic and the desired structure.
2. Provide clear, step-by-step instructions for creating content in the specified structure.
3. Include any necessary subheadings or sections as required by the structure type.
4. End with guidance on how to conclude or summarize the content.
</structured_prompt>

Remember to tailor your instructions to both the {{TOPIC}} and the {{STRUCTURE_TYPE}}. Be specific and provide enough detail to guide the AI in creating well-structured content.
```
