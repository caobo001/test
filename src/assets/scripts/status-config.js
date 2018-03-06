// 订单状态，：@1:待付款 @2:竞标中,@3:选标中,@4:执行中@9:已结束@10:已取消,@11:已流标，@12:已流单，@13:未选标

// 订单项状态参数: "@1:待竞标(私募竞标存在该状态)，@2:待选标，@3:待执行@4:待确认@9:已结束@10:已取消,@11:已流标，@12:已流单，@13:未中标 @21未选标"

module.exports = {
  orderStatus: {
    waitingPayment: 1,
    bidding: 2,
    bidSelecting: 3,
    processing: 4,
    finish: 9,
    cancel: 10,
    liubiao: 11,
    liudan: 12,
    unSelected: 13
  },
  orderItemStatus: {
    waitingBid: 1,
    waitingSelection: 2,
    waitingProcess: 3,
    waitingConfirm: 4,
    finish: 9,
    cancel: 10,
    liubiao: 11,
    liudan: 12,
    miss: 13,
    unSelected: 21
  },
  mediaOrderStatus: {
    waitingRespond: 1, // 待响应
    processing: 2, // 执行中
    waitingConfirm: 3, // 待确认
    end: 9, // 已结束
    cancel: 10, // 已取消
    finish: 100 // 已完成
  }
}

