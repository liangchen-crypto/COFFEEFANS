// Data Models
let state = {
    vp: 2450,
    verifiedPoints: 0,
    hasVoted: false,
    votePercent: 72
};

const orders = [
    { id: 'ORD-2026-981', date: '2026-04-01', item: '南洋挂耳咖啡 x2', pts: 120 },
    { id: 'ORD-2026-902', date: '2026-03-25', item: '手冲器具套装', pts: 450 }
];

const logs = [
    { time: '10:32:11', msg: 'Block verified: User VP updated.' },
    { time: '09:14:05', msg: 'New Proposal #009 Created.' },
    { time: '08:01:22', msg: 'System node sync complete.' }
];

const SVG_BELIEVER = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-believer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="glow-believer" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g filter="url(#glow-believer)">
    <path d="M25 35 H75 V65 C75 76 66 85 55 85 H45 C34 85 25 76 25 65 Z" stroke="url(#grad-believer)" stroke-width="6" stroke-linecap="round"/>
    <path d="M75 45 H85 C90.5 45 95 49.5 95 55 C95 60.5 90.5 65 85 65 H75" stroke="url(#grad-believer)" stroke-width="6" stroke-linecap="round"/>
    <path d="M40 25 C40 15 35 20 35 10" stroke="url(#grad-believer)" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 25 C50 15 45 20 45 10" stroke="url(#grad-believer)" stroke-width="5" stroke-linecap="round"/>
    <path d="M60 25 C60 15 55 20 55 10" stroke="url(#grad-believer)" stroke-width="5" stroke-linecap="round"/>
  </g>
</svg>
`;

const SVG_GUARDIAN = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-guardian" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60a5fa" />
      <stop offset="100%" stop-color="#2563eb" />
    </linearGradient>
    <filter id="glow-guardian" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g filter="url(#glow-guardian)">
    <path d="M50 15 L85 25 V45 C85 65 65 80 50 90 C35 80 15 65 15 45 V25 L50 15 Z" stroke="url(#grad-guardian)" stroke-width="6" stroke-linejoin="round"/>
    <path d="M40 45 L50 35 L60 45 V65 H40 Z" stroke="url(#grad-guardian)" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="50" cy="55" r="4" fill="url(#grad-guardian)"/>
  </g>
</svg>
`;

const SVG_ELDER = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-elder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="glow-elder" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <g filter="url(#glow-elder)">
    <path d="M15 75 L20 30 L40 50 L50 20 L60 50 L80 30 L85 75 Z" stroke="url(#grad-elder)" stroke-width="6" stroke-linejoin="round"/>
    <circle cx="20" cy="30" r="5" fill="url(#grad-elder)"/>
    <circle cx="50" cy="20" r="5" fill="url(#grad-elder)"/>
    <circle cx="80" cy="30" r="5" fill="url(#grad-elder)"/>
    <path d="M25 85 H75" stroke="url(#grad-elder)" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>
`;

const ranksDef = [
    { name: '南洋信徒', reqVP: 0, reqStr: '0 VP', svg: SVG_BELIEVER, color: '#10b981', desc: '设计语言：一杯拉花咖啡升腾着代表生机的蒸气，通体萦绕着翠绿色 (Emerald) 的霓虹光效。代表品牌的初识与溯源。' },
    { name: '狮城守卫', reqVP: 2000, reqStr: '2,000 VP', svg: SVG_GUARDIAN, color: '#3b82f6', desc: '设计语言：一面流线型的坚固盾牌，中心镶嵌着抽象的核心阵列，通体散发着蔚蓝色 (Blue) 的科技辉光。代表中坚用户的参与和守护。' },
    { name: '治理元老', reqVP: 10000, reqStr: '10,000 VP', svg: SVG_ELDER, color: '#fbbf24', desc: '设计语言：一顶象征着绝对权力的几何皇冠，底座有象征去中心化网络的重要节点分布，通体爆发出耀眼的琥珀金色 (Amber / Gold)。代表社区里最高的话语权与 DAO 的规则制定者。' }
];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    renderOrders();
    renderLogs();
    renderRanks();
});

function getCurrentRank() {
    let current = ranksDef[0];
    for(let r of ranksDef) {
        if(state.vp >= r.reqVP) {
            current = r;
        }
    }
    return current;
}

// UI Updates
function updateDisplay() {
    document.getElementById('my-vp').innerText = state.vp.toLocaleString();
    document.getElementById('total-verified').innerText = state.verifiedPoints.toLocaleString();
    
    // Dynamic Rank Update
    const rank = getCurrentRank();
    const rankNameEl = document.getElementById('rank-name');
    rankNameEl.innerText = rank.name;
    rankNameEl.style.color = rank.color;
    rankNameEl.style.textShadow = `0 0 8px ${rank.color}80`;
    
    const iconContainer = document.getElementById('user-rank-icon');
    iconContainer.innerHTML = rank.svg;
    iconContainer.style.boxShadow = `0 0 20px ${rank.color}40`;
}

function showSection(sectionId) {
    // Nav tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

    // Sections
    document.querySelectorAll('.dao-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Interactions
function copyInvite() {
    const code = document.getElementById('code-text').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.btn-copy');
        btn.innerText = '已复制!';
        btn.style.background = 'var(--accent)';
        setTimeout(() => {
            btn.innerText = '复制';
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 2000);
    });
}

function castVote(isSupport) {
    if (state.hasVoted) {
        alert("您已经对此提案投过票！");
        return;
    }
    
    state.hasVoted = true;
    if (isSupport) {
        state.votePercent = Math.min(100, state.votePercent + 2);
    } else {
        state.votePercent = Math.max(0, state.votePercent - 2);
    }
    
    document.getElementById('vote-progress').style.width = state.votePercent + '%';
    document.getElementById('vote-percent').innerText = state.votePercent;
    
    addLog(`Voted on Proposal #009: ${isSupport ? 'SUPPORT' : 'AGAINST'}, Weights: ${state.vp} VP`);
    alert(`投票成功！您已投入 ${state.vp} VP 权重。`);
}

// Modal Logic
function toggleRankModal() {
    const modal = document.getElementById('rank-modal');
    modal.classList.toggle('active');
}

function startSimulatedScan() {
    const modal = document.getElementById('scan-modal');
    modal.classList.add('active');
    
    const preview = document.getElementById('scan-view');
    preview.classList.add('scanning');
    
    // Simulate scan delay
    setTimeout(() => {
        preview.classList.remove('scanning');
        preview.innerHTML = '<span style="color: var(--accent); font-size: 20px; font-weight: bold;">✅ 防伪码验证成功！</span>';
        document.getElementById('phone-input-area').style.display = 'block';
    }, 2000);
}

function closeScan() {
    document.getElementById('scan-modal').classList.remove('active');
    // Reset scan UI state
    setTimeout(() => {
        document.getElementById('scan-view').innerHTML = `
            <div class="scan-line"></div>
            <p class="scan-text">正在验证水源二叔唯一防伪码...</p>
        `;
        document.getElementById('phone-input-area').style.display = 'none';
        document.getElementById('user-phone').value = '';
    }, 300);
}

function processValidation() {
    const phone = document.getElementById('user-phone').value;
    if (phone.length < 11) {
        alert("请输入有效的11位手机号");
        return;
    }
    
    // Simulate API call for sync
    const btn = document.querySelector('.confirm-btn');
    btn.innerText = "正在上链...";
    
    setTimeout(() => {
        const bonusPts = 150;
        state.vp += bonusPts;
        state.verifiedPoints += bonusPts;
        
        // Render state updates
        updateDisplay();
        renderRanks(); // Re-render rank list in case of level up
        
        addLog(`Item verified [Phone: ${phone.slice(0,3)}****${phone.slice(-4)}]. +${bonusPts} VP Minted.`);
        
        orders.unshift({
            id: `ORD-2026-${Math.floor(Math.random()*900+100)}`,
            date: new Date().toISOString().split('T')[0],
            item: '水源二叔甄选咖啡豆',
            pts: bonusPts
        });
        renderOrders();
        
        closeScan();
        alert(`核销成功！您的积分增加了 ${bonusPts} VP。`);
        btn.innerText = "确认核销并同步";
    }, 1500);
}

// Render Functions
function renderOrders() {
    const container = document.getElementById('order-history-list');
    container.innerHTML = orders.map(o => `
        <div class="history-item hover-pop">
            <div>
                <div style="font-weight:600; color:var(--text-main)">${o.item}</div>
                <div style="font-size:11px; color:var(--text-muted)">${o.date} | ${o.id}</div>
            </div>
            <div style="color:var(--accent); font-weight:600;">+${o.pts} PTS</div>
        </div>
    `).join('');
}

function renderLogs() {
    const container = document.getElementById('mint-log');
    container.innerHTML = logs.map(l => `
        <div class="log-entry">
            <span class="time">[${l.time}]</span>
            <span class="msg">${l.msg}</span>
        </div>
    `).join('');
}

function renderRanks() {
    const currentRank = getCurrentRank();
    const container = document.getElementById('rank-list-container');
    container.innerHTML = ranksDef.map(r => {
        const isCurrent = (r.name === currentRank.name);
        return `
        <div class="rank-item ${isCurrent ? 'active-rank' : ''} hover-pop" style="display:flex; flex-direction:column; align-items:stretch; gap:8px; ${isCurrent ? `border-color: ${r.color}; box-shadow: 0 0 10px ${r.color}40;` : ''}">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:24px; height:24px; display:flex;">${r.svg}</div>
                    <span style="font-weight: ${isCurrent ? 'bold' : 'normal'}">${r.name} ${isCurrent ? '✅' : ''}</span>
                </div>
                <span style="color:${r.color}; font-weight:bold;">${r.reqStr}</span>
            </div>
            <div style="font-size:12px; color:var(--text-muted); text-align:left; line-height:1.5; border-top:1px dashed rgba(255,255,255,0.1); padding-top:8px;">
                ${r.desc}
            </div>
        </div>
        `;
    }).join('');
}

function addLog(msg) {
    const time = new Date().toLocaleTimeString('en-US', {hour12: false});
    logs.unshift({ time, msg });
    renderLogs();
}
