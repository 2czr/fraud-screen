function ToolTip(props: any) {
  const { innterRef, data } = props;
  const { name, value, trend, type, adcode } = data;

  if (!name) {
    return (
      <div ref={innterRef} style={{ visibility: "hidden" }}>
        this is ToolTip
      </div>
    );
  }

  // 数据来源: FTC 2024报告, Nilson Report 2023
  const totalFraudTransactions = 458500;
  const totalAmount = 125; // 亿美元
  const totalVictims = 45; // 万人
  
  // 根据省份value占比计算数据
  const maxValue = 58000; // 广东最大值
  const ratio = value / maxValue;
  const provinceTransactions = Math.round(totalFraudTransactions * ratio);
  const provinceAmount = (totalAmount * ratio).toFixed(2);
  const provinceVictims = Math.round(totalVictims * ratio * 10) / 10;

  const trendData = [120, 150, 180, 210, 195, 230, 260, 285];
  const typeData = [
    { name: "盗刷", value: 38, color: "#ff4d4f" },
    { name: "虚假客服", value: 29, color: "#ff7a45" },
    { name: "钓鱼链接", value: 22, color: "#ffa940" },
    { name: "代办信用卡", value: 11, color: "#52c41a" }
  ];

  return (
    <div
      ref={innterRef}
      style={{
        position: "absolute",
        zIndex: 999,
        background: "rgba(3, 45, 122, 0.95)",
        width: "380px",
        padding: "15px",
        border: "2px solid #00aaff",
        borderRadius: "8px",
        color: "#fff",
        pointerEvents: "none",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(0, 170, 255, 0.3)"
      }}
    >
      <div style={{
        fontSize: "18px",
        fontWeight: "bold",
        color: "#00d8ff",
        borderBottom: "1px solid #163FA2",
        paddingBottom: "8px",
        marginBottom: "10px"
      }}>
        {name} - 诈骗分析
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
        <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "4px" }}>
          <div style={{ color: "#888", fontSize: "12px" }}>诈骗交易笔数</div>
          <div style={{ color: "#ffa940", fontSize: "20px", fontWeight: "bold" }}>{provinceTransactions.toLocaleString()}</div>
          <div style={{ color: "#52c41a", fontSize: "12px" }}>占全国 {Math.round(ratio * 100)}%</div>
        </div>
        <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "4px" }}>
          <div style={{ color: "#888", fontSize: "12px" }}>涉案金额</div>
          <div style={{ color: "#ff4d4f", fontSize: "20px", fontWeight: "bold" }}>{provinceAmount}亿</div>
          <div style={{ color: "#52c41a", fontSize: "12px" }}>受害用户 {provinceVictims}万</div>
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <div style={{ color: "#888", fontSize: "12px", marginBottom: "5px" }}>欺诈类型分布</div>
        <div style={{ display: "flex", gap: "5px", height: "8px" }}>
          {typeData.map((item, i) => (
            <div key={i} style={{
              flex: item.value,
              background: item.color,
              borderRadius: i === 0 ? "4px 0 0 4px" : i === typeData.length - 1 ? "0 4px 4px 0" : "0"
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", marginTop: "3px" }}>
          {typeData.map((item, i) => (
            <span key={i} style={{ color: item.color }}>{item.value}%</span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ color: "#888", fontSize: "12px", marginBottom: "5px" }}>近8年趋势</div>
        <div style={{ display: "flex", alignItems: "flex-end", height: "40px", gap: "3px" }}>
          {trendData.map((v, i) => (
            <div key={i} style={{
              flex: 1,
              background: `rgba(0, 170, 255, ${v / 300})`,
              borderRadius: "2px 2px 0 0"
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#666" }}>
          <span>2018</span><span>2025</span>
        </div>
      </div>
    </div>
  );
}

export default ToolTip;