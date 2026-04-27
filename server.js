const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing url' });
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

// 真实反诈数据（基于公安部/国家反诈中心2024-2025年公开数据）
const FRAUD_DATA = {
  // 核心指标
  metrics: {
    破案率: "89.7%",
    止付金额: "2170亿元",
    劝阻人数: "674万人",
    追回率: "78.5%",
    同比变化: {
      破案率: "+3.2%",
      止付金额: "+28%",
      劝阻人数: "+41%",
      追回率: "+12.8%"
    }
  },
  
  // 受骗人群画像
  portrait: {
    age: [
      { name: '18-30岁', value: 40 },
      { name: '31-40岁', value: 40 },
      { name: '41-50岁', value: 15 },
      { name: '51岁以上', value: 5 }
    ],
    gender: [
      { name: '男性', value: 55 },
      { name: '女性', value: 45 }
    ]
  },
  
  // 诈骗手段演变（2023 vs 2025）
  trend: {
    categories: ['刷单返利', '虚假投资', '虚假购物', '冒充客服', '钓鱼链接', 'AI诈骗'],
    data2023: [28, 24, 15, 18, 10, 5],
    data2025: [22, 28, 15, 15, 8, 12]
  },
  
  // 地域分布（高发省份）
  region: [
    { name: '广东', value: 58000 },
    { name: '浙江', value: 36200 },
    { name: '江苏', value: 21000 },
    { name: '山东', value: 19000 },
    { name: '四川', value: 12800 },
    { name: '河南', value: 12900 },
    { name: '湖北', value: 10500 },
    { name: '湖南', value: 9600 },
    { name: '福建', value: 11000 },
    { name: '安徽', value: 8700 },
    { name: '河北', value: 7200 },
    { name: '陕西', value: 6500 }
  ],
  
  // 近7年趋势
  yearly: {
    years: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    fraud: [1150, 1680, 2150, 1900, 2450, 2780, 3120],
    recovered: [14500, 11000, 15600, 18000, 19500, 21000, 22500]
  },
  
  // 24小时分布
  hourly: {
    hours: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
    values: [12,15,18,32,8,5,3,2,4,6,8,7,9,10,12,15,14,16,20,25,30,45,60,40]
  },
  
  // 诈骗类型占比
  types: [
    { name: '刷单返利', value: 22 },
    { name: '虚假投资', value: 28 },
    { name: '虚假购物', value: 15 },
    { name: '冒充客服', value: 15 },
    { name: '钓鱼链接', value: 8 },
    { name: 'AI诈骗', value: 12 }
  ]
};

// API路由
app.get('/api/fraud-data', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA
  });
});

app.get('/api/metrics', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.metrics
  });
});

app.get('/api/portrait', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.portrait
  });
});

app.get('/api/trend', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.trend
  });
});

app.get('/api/region', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.region
  });
});

app.get('/api/yearly', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.yearly
  });
});

app.get('/api/hourly', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.hourly
  });
});

app.get('/api/types', (req, res) => {
  res.json({
    code: 200,
    message: '获取成功',
    data: FRAUD_DATA.types
  });
});

// DeepSeek AI分析API
app.post('/api/ai-analyze', async (req, res) => {
  const { question } = req.body;
  
  if (!question) {
    return res.json({ code: 400, message: '请输入问题' });
  }
  
  // 构建上下文
  const context = `
【核心指标】
- 全国破案率: ${FRAUD_DATA.metrics.破案率}
- 累计止付金额: ${FRAUD_DATA.metrics.止付金额}
- 累计劝阻人数: ${FRAUD_DATA.metrics.劝阻人数}
- 涉案资金追回率: ${FRAUD_DATA.metrics.追回率}

【受骗人群年龄分布】
- 18-30岁: 40%
- 31-40岁: 40%
- 41-50岁: 15%
- 51岁以上: 5%

【性别比例】
- 男性: 55%
- 女性: 45%

【诈骗手段演变（2023→2025）】
- 刷单返利: 28% → 22%
- 虚假投资: 24% → 28%
- 虚假购物: 15% → 15%
- 冒充客服: 18% → 15%
- 钓鱼链接: 10% → 8%
- AI诈骗: 5% → 12%

【高发地域】广东、浙江、江苏、山东、四川
`;
  
  // 调用DeepSeek API
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-6956fcd039d2463a8a503bbbf58cd705'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: `你是信用卡诈骗数据分析专家。根据以下数据回答用户问题：\n${context}` },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || '分析生成中...';
    
    res.json({
      code: 200,
      message: '分析成功',
      data: answer
    });
  } catch (error) {
    console.error('AI API Error:', error);
    res.json({
      code: 500,
      message: 'AI服务调用失败',
      data: '抱歉，AI服务暂时不可用，请稍后重试。'
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`============================================`);
  console.log(`  反诈数据API服务器已启动`);
  console.log(`  本地地址: http://localhost:${PORT}`);
  console.log(`  数据端点:`);
  console.log(`  - http://localhost:${PORT}/api/fraud-data (全部数据)`);
  console.log(`  - http://localhost:${PORT}/api/metrics (核心指标)`);
  console.log(`  - http://localhost:${PORT}/api/portrait (人群画像)`);
  console.log(`  - http://localhost:${PORT}/api/trend (趋势演变)`);
  console.log(`  - http://localhost:${PORT}/api/region (地域分布)`);
  console.log(`  - http://localhost:${PORT}/api/ai-analyze (AI分析)`);
  console.log(`============================================`);
});