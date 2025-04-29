document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const contentSection = document.getElementById('content');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    const contentMap = {
        'tea-health': `
            <div class="health-content">
                <h2>茶与养生</h2>
                <div class="benefit-card">
                    <h3><span class="icon">🍃</span> 抗氧化 & 延缓衰老</h3>
                    <ul>
                        <li><strong>核心成分：</strong>高含量茶多酚（尤其是儿茶素EGCG）、维生素C</li>
                        <li><strong>作用：</strong>清除自由基，减少细胞氧化损伤，帮助延缓皮肤和机体衰老</li>
                        <li><strong>研究支持：</strong>绿茶抗氧化能力显著，长期饮用可能降低慢性病风险</li>
                    </ul>
                </div>
    
                <div class="benefit-card">
                    <h3><span class="icon">💡</span> 提神醒脑 & 增强专注力</h3>
                    <ul>
                        <li><strong>咖啡因 + 茶氨酸：</strong>温和刺激中枢神经，提高警觉性和工作效率</li>
                        <li><strong>特殊效果：</strong>茶氨酸缓解焦虑，带来"清醒而放松"的状态</li>
                        <li><strong>适合人群：</strong>脑力劳动者、学生（避免睡前饮用）</li>
                    </ul>
                </div>
    
                <div class="benefit-card">
                    <h3><span class="icon">❄️</span> 清热解毒 & 消暑生津</h3>
                    <ul>
                        <li><strong>绿茶属性：</strong>性微寒，适合春夏饮用，缓解口干舌燥、内热上火</li>
                        <li><strong>传统应用：</strong>井冈山当地民间用其辅助解暑、缓解轻度咽喉不适</li>
                    </ul>
                </div>
    
                <div class="benefit-cards-container">
                    <div class="small-benefit-card">
                        <h4><span class="icon">⚖️</span> 辅助代谢</h4>
                        <p>儿茶素（EGCG）促进脂肪氧化，轻微提升代谢率（需配合运动）</p>
                    </div>
                    <div class="small-benefit-card">
                        <h4><span class="icon">❤️</span> 心血管健康</h4>
                        <p>茶多酚有助于降低低密度脂蛋白胆固醇，维护血管弹性</p>
                    </div>
                    <div class="small-benefit-card">
                        <h4><span class="icon">🦷</span> 口腔健康</h4>
                        <p>对致龋齿菌有抑制效果，清新口气（注意浓茶可能染色牙釉质）</p>
                    </div>
                </div>
            </div>
            <img src="./images/1.png" alt="茶与养生详情" class="content-img">
        `,
        'tea-remedy': `
            <div class="remedy-content">
                <h2>茶疗方剂</h2>
                
                <div class="remedy-category">
                    <h3 class="category-title">🌿 清热解毒类（适合上火、暑热）</h3>
                    <div class="remedy-card">
                        <h4>金银花茶</h4>
                        <div class="formula">
                            <span class="label">配方：</span>
                            <span class="ingredients">井冈翠绿3g + 金银花2g + 冰糖少许</span>
                        </div>
                        <div class="effect">
                            <span class="label">作用：</span>
                            <span>抗菌消炎，缓解咽喉肿痛</span>
                        </div>
                        <div class="note">
                            <span class="label">注意：</span>
                            <span class="warning">脾胃虚寒者少饮，连续不超过3天</span>
                        </div>
                    </div>
                </div>
    
                <div class="remedy-category">
                    <h3 class="category-title">🍵 消食化滞类（适合饮食油腻后）</h3>
                    <div class="remedy-card">
                        <h4>陈皮消食茶</h4>
                        <div class="formula">
                            <span class="label">配方：</span>
                            <span class="ingredients">井冈翠绿3g + 陈皮2g（三年以上）</span>
                        </div>
                        <div class="effect">
                            <span class="label">作用：</span>
                            <span>理气健脾，化解腹胀积食</span>
                        </div>
                    </div>
                </div>
    
                <div class="remedy-tips">
                    <h3>💡 茶疗小贴士</h3>
                    <ol>
                        <li>体质虚寒者可加红枣、姜片调和寒性</li>
                        <li>避免与含铁剂、抗生素同服，间隔2小时以上</li>
                        <li>空腹不饮浓茶，术后或贫血者控制饮用量</li>
                    </ol>
                </div>
            </div>
            <img src="./images/2.png" alt="茶疗方剂详情" class="content-img">
        `,
        'tea-food': `
            <div class="food-content">
                <h2>茶食搭配</h2>
                
                <div class="pairing-section">
                    <h3>🍡 经典茶点搭配</h3>
                    <div class="pairing-card">
                        <h4>江南风味糕点</h4>
                        <ul>
                            <li><strong>绿豆糕：</strong>清甜细腻，化解绿茶微涩</li>
                            <li><strong>桂花米糕：</strong>桂花香与茶香相得益彰</li>
                        </ul>
                    </div>
                </div>
    
                <div class="pairing-section">
                    <h3>🍽️ 创意茶餐</h3>
                    <div class="pairing-card">
                        <h4>井冈翠绿茶泡饭</h4>
                        <p>用冷却的淡茶汤代替水泡饭，佐以梅干、海苔碎</p>
                        <p class="highlight">特色：清爽开胃，适合夏季</p>
                    </div>
                </div>
    
                <div class="pairing-tips">
                    <h3>⚠️ 搭配禁忌</h3>
                    <ul class="warning-list">
                        <li>避免重口味食物（如火锅、烧烤）</li>
                        <li>慎配高糖甜点（易引发苦涩感）</li>
                        <li>乳制品可能抑制茶多酚吸收</li>
                    </ul>
                </div>
            </div>
            <img src="./images/3.png" alt="茶食搭配详情" class="content-img">
        `
    };

    // 点击选项加载内容
    options.forEach(option => {
        option.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                const id = this.id;
                contentSection.innerHTML = contentMap[id];
                
                // 添加内容显示动画
                contentSection.classList.add('swing');
                setTimeout(() => contentSection.classList.remove('swing'), 1000);
                
                // 平滑滚动到内容区域顶部
                contentSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 200);
        });
    });

    // 搜索功能：跳转到AI对话页面
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `ai-chat.html?query=${encodeURIComponent(query)}`;
        } else {
            alert('请输入你的问题');
        }
    });

    // 添加加载动画移除
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.querySelector('.loader');
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    });

    // 添加键盘事件支持
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});