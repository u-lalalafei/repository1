document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    // 后端API配置
    const API_BASE_URL = 'http://localhost:8080';
    const STREAM_API_ENDPOINT = '/stream';
    const DEFAULT_MODEL = 'deepseek-r1:1.5b';

    // 获取URL中的搜索内容
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    // 如果存在搜索内容，自动发送
    if (query) {
        sendMessage(query);
    }

    // 添加消息到聊天框
    function addMessage(role, content) {
        const messageElement = document.createElement('div');
        messageElement.className = `${role}-message`;
        messageElement.innerHTML = `${role === 'user'? '你' : '灵茶小助手'}：${content}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;

        // 添加动画
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        setTimeout(() => {
            messageElement.style.transition = 'all 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);
    }

    // 调用AI后端API
    // function callAIBackend(message) {
    //     return new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         const url = `${API_BASE_URL}${STREAM_API_ENDPOINT}?model=${DEFAULT_MODEL}&message=${encodeURIComponent(message)}`;
    //         xhr.open('GET', url, true);
    
    //         xhr.onload = function() {
    //             if (xhr.status === 200) {
    //                 try {
    //                     const data = JSON.parse(xhr.responseText);
    //                     if (data.status === "success") {
    //                         resolve(data.reply); // 返回AI的回答内容
    //                     } else {
    //                         reject(new Error(data.message || "未知错误"));
    //                     }
    //                 } catch (error) {
    //                     reject(new Error("解析响应失败"));
    //                 }
    //             } else {
    //                 reject(new Error(`请求失败: ${xhr.status}`));
    //             }
    //         };
    
    //         xhr.onerror = function() {
    //             reject(new Error("网络错误"));
    //         };
    
    //         xhr.send();
    //     });
    // }
    function callAIBackend(message) {
        return new Promise((resolve, reject) => {
          let aiResponse = '';
          const url = `${API_BASE_URL}${STREAM_API_ENDPOINT}?model=${DEFAULT_MODEL}&message=${encodeURIComponent(message)}`;
          const eventSource = new EventSource(url);
      
          eventSource.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.content === '[DONE]') {
                eventSource.close();
                resolve(aiResponse); // 最终返回完整响应
              } else {
                aiResponse += data.content; // 实时拼接内容
                // 实时更新界面（可选）
                const lastMessage = chatBox.querySelector('.ai-message:last-child');
                if (lastMessage) lastMessage.innerHTML = `灵茶小助手：${aiResponse}`;
              }
            } catch (e) {
              reject(new Error('解析事件流失败'));
            }
          };
      
          eventSource.onerror = (error) => {
            eventSource.close();
            reject(new Error('SSE 连接错误'));
          };
        });
      }
    // // 发送消息处理
    // async function sendMessage(message) {
    //     if (!message) return;
    //     // 添加用户消息
    //     addMessage('user', message);
    //     chatInput.value = '';

    //     // 显示"正在输入"提示
    //     const typingIndicator = document.createElement('div');
    //     typingIndicator.className = 'ai-message';
    //     typingIndicator.innerHTML = '灵茶小助手正在输入...';
    //     typingIndicator.style.opacity = '0.7';
    //     typingIndicator.style.fontStyle = 'italic';
    //     chatBox.appendChild(typingIndicator);
    //     chatBox.scrollTop = chatBox.scrollHeight;

    //     try {
    //         // 调用AI后端获取回复
    //         const aiResponse = await callAIBackend(message);

    //         // 移除"正在输入"提示并添加AI回复
    //         chatBox.removeChild(typingIndicator);
    //         addMessage('ai', aiResponse);

    //     } catch (error) {
    //         console.error('发送消息出错:', error);
    //         chatBox.removeChild(typingIndicator);
    //         addMessage('ai', "网络出现了一些问题，请稍后再试。");
    //     }
    // }
    async function sendMessage(message) {
        if (!message) return;
        addMessage('user', message);
        chatInput.value = '';
      
        // 显示"正在输入"提示
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-message';
        typingIndicator.innerHTML = '灵茶小助手正在输入...';
        chatBox.appendChild(typingIndicator);
        chatBox.scrollTop = chatBox.scrollHeight;
      
        try {
          // 调用 AI 后端并实时更新响应
          const aiResponse = await callAIBackend(message);
          chatBox.removeChild(typingIndicator);
          addMessage('ai', aiResponse);
        } catch (error) {
          console.error('发送消息出错:', error);
          chatBox.removeChild(typingIndicator);
          addMessage('ai', '网络出现了一些问题，请稍后再试。');
        }
      }
    // 点击发送按钮
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        sendMessage(message);
    });

    // 按Enter键发送
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            sendMessage(message);
        }
    });

    // 输入框动画效果
    chatInput.addEventListener('focus', function () {
        this.style.boxShadow = '0 0 10px rgba(120, 146, 98, 0.5)';
    });

    chatInput.addEventListener('blur', function () {
        this.style.boxShadow = 'none';
    });
});