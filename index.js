Page({
  data: {
    // 当前选中的时间
    selectedHour: 7,
    selectedMinute: 0,
    
    // 闹钟列表
    alarmList: [
      { id: 1, time: '07:00', label: '早起打卡', ringtone: '激昂交响曲', active: true },
      { id: 2, time: '07:15', label: '贪睡备用', ringtone: 'CEO的呼唤', active: false }
    ],

    // 弹窗控制
    showRingtoneModal: false,
    showAnalysisModal: false,

    // 铃声选项
    ringtones: ['默认蜂鸣', '激昂交响曲', '自然鸟叫', 'CEO的呼唤', '收款到账音'],
    currentRingtoneIndex: 1,

    // 分析数据 (模拟)
    analysisData: {
      score: 88,
      trend: '本周早起率提升了 15%，击败了全国 90% 的总裁',
      prediction: '根据大数据，您下周一需要在 06:45 设置闹钟以避开早高峰。'
    }
  },

  // 滚动选择小时
  onHourChange(e) {
    this.setData({ selectedHour: e.detail.value });
  },

  // 滚动选择分钟
  onMinuteChange(e) {
    this.setData({ selectedMinute: e.detail.value });
  },

  // 添加闹钟
  addAlarm() {
    const { selectedHour, selectedMinute, alarmList, currentRingtoneIndex, ringtones } = this.data;
    
    // 格式化时间 07:00
    const timeStr = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    
    // 检查是否重复
    const exists = alarmList.some(alarm => alarm.time === timeStr);
    if (exists) {
      wx.showToast({ title: '该时间已有闹钟', icon: 'none' });
      return;
    }

    const newAlarm = {
      id: Date.now(),
      time: timeStr,
      label: '新计划',
      ringtone: ringtones[currentRingtoneIndex],
      active: true
    };

    // 排序并更新列表
    const newList = [...alarmList, newAlarm].sort((a, b) => a.time.localeCompare(b.time));
    this.setData({ alarmList: newList });
    
    wx.vibrateShort(); // 震动反馈
  },

  // 删除闹钟
  deleteAlarm(e) {
    const id = e.currentTarget.dataset.id;
    const newList = this.data.alarmList.filter(item => item.id !== id);
    this.setData({ alarmList: newList });
  },

  // 切换开关
  toggleSwitch(e) {
    const id = e.currentTarget.dataset.id;
    const index = this.data.alarmList.findIndex(item => item.id === id);
    if (index !== -1) {
      const key = `alarmList[${index}].active`;
      this.setData({ [key]: !this.data.alarmList[index].active });
    }
  },

  // 打开选铃声弹窗
  openRingtoneModal() {
    this.setData({ showRingtoneModal: true });
  },

  // 选择铃声
  selectRingtone(e) {
    this.setData({ 
      currentRingtoneIndex: e.detail.value,
      showRingtoneModal: false 
    });
  },

  // 打开分析面板
  openAnalysis() {
    // 这里可以加入更复杂的计算逻辑
    this.setData({ showAnalysisModal: true });
  }
});
