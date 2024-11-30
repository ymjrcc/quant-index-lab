// const dataList = [
//   {
//     a20: 3988.7745,
//     a50: 3938.12502,
//     date: "2020/1/2",
//     value: 4152.24
//   },
//   {
//     a20: 4002.05455,
//     a50: 3943.61096,
//     date: "2020/1/3",
//     value: 4144.964
//   },
//   {
//     a20: 4013.40005,
//     a50: 3948.26102,
//     date: "2020/1/6",
//     value: 4129.295
//   }
// ]

export const calcQuantList = (dataList: any[]) => {
  // dataList 是沪深 300 指数的每日收盘价、20 日均线、50 日均线
  // 计算每日收盘价与 50 日均线交叉点
  // 如果交叉点在 50 日均线之上，则买入，否则卖出
  // 返回的列表中，增加一个字段，标记是买入、卖出、还是不动
  // 返回的列表中，增加一个字段 s50，列表第一个元素的 s50 值为 value 的值
  // 其余元素的 s50 值根据前一个元素的 s50 值和当日 value 值计算得出
  dataList.forEach((item, index) => {
    // 初始化返回对象，包含原始数据
    item.action = ''

    // 第一个元素直接返回
    if (index === 0) {
      if(item.value > item.a50) {
        item.action = 'buy';
      } else {
        item.action = 'sell';
      }
      item.s50 = item.value
      return
    }

    // 获取前一天的数据
    const prevItem = dataList[index - 1];

    // 计算前一天和当天的差值
    const prevDiff = prevItem.value - prevItem.a50;
    const currDiff = item.value - item.a50;

    // 检查是否发生交叉
    if ((prevDiff > 0 && currDiff < 0) || (prevDiff < 0 && currDiff > 0)) {
      // 如果交叉点在50日均线之上，则买入
      if (item.value > item.a50) {
        item.action = 'buy';
      } else {
        // 否则卖出
        item.action = 'sell';
      }
    } else if (prevItem.action === 'buy' || prevItem.action === 'hold') {
      item.action = 'hold';
    } else if (prevItem.action === 'sell' || prevItem.action === 'empty') {
      item.action = 'empty';
    }

    // 计算s50值
    // 如果 item.action 是 buy 或 empty, 则 s50 等于前一天的 value
    // 如果 item.action 是 hold 或 sell, 则 s50 等于 前一天的 s50 乘以 当天的 value 除以 前一天的 value
    if (item.action === 'buy' || item.action === 'empty') {
      item.s50 = prevItem.s50;
    } else if (item.action === 'hold' || item.action === 'sell') {
      item.s50 = prevItem.s50 * (item.value / prevItem.value);
    }
    return item;
  });

  console.log(dataList);

  return dataList;
}