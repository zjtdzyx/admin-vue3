import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

// Mock 顾客信息
mock.onGet('/customers').reply(200, [
  {
    customerNumber: 'C001',
    name: '李四',
    contact: '13900000002',
    address: '城市街道',
  },
  {
    customerNumber: 'C002',
    name: '王五',
    contact: '13800000003',
    address: '乡村小镇',
  },
])

// Mock 产品信息
mock.onGet('/products').reply(200, [
  {
    productNumber: 'P001',
    name: '新鲜西红柿',
    grade: 'A级',
    origin: '山东',
    costPrice: 3.00,
    packaging: '纸箱',
  },
  {
    productNumber: 'P002',
    name: '新鲜黄瓜',
    grade: 'A级',
    origin: '河北',
    costPrice: 2.50,
    packaging: '纸箱',
  },
])

// Mock 物资信息
mock.onGet('/materials').reply(200, [
  {
    materialNumber: 'M001',
    name: '肥料',
    unit: '袋',
    costPrice: 50.00,
    sellingPrice: 60.00,
  },
  {
    materialNumber: 'M002',
    name: '种子',
    unit: '包',
    costPrice: 20.00,
    sellingPrice: 25.00,
  },
])

// Mock 农户信息
mock.onGet('/farmers').reply(200, [
  {
    farmerNumber: 'F001',
    name: '张三',
    address: '农村村庄',
    contact: '13800000001',
    sowingArea: 10.5,
  },
  {
    farmerNumber: 'F002',
    name: '李四',
    address: '乡村小镇',
    contact: '13900000002',
    sowingArea: 15.0,
  },
])

// Mock 公司机构信息
mock.onGet('/organizations').reply(200, [
  {
    organizationName: '北方批发中心',
    type: '批发中心',
  },
  {
    organizationName: '南方生产基地',
    type: '生产基地',
  },
])

// Mock 产品入库信息
mock.onPost('/inventory/inbound').reply(201, {
  inboundNumber: 'IN001',
  productNumber: 'P001',
  quantity: 100,
  amount: 300.00,
  inboundDate: '2024-01-01',
  handler: '王五',
})

// Mock 销售单信息
mock.onPost('/sales').reply(201, {
  salesNumber: 'S001',
  productNumber: 'P001',
  quantity: 50,
  amount: 150.00,
  salesDate: '2024-01-02',
  customerNumber: 'C001',
  handler: '赵六',
})

// Mock 产品库存信息
mock.onGet('/inventory').reply(200, [
  {
    productNumber: 'P001',
    quantity: 200,
  },
  {
    productNumber: 'P002',
    quantity: 150,
  },
])

// Mock 产品盘存信息
mock.onPost('/inventory/audit').reply(200, {
  auditedCount: 195,
  systemCount: 200,
  difference: -5,
})

// Mock 生产计划信息
mock.onGet('/production/plans').reply(200, [
  {
    planId: 'P001',
    productNumber: 'P001',
    quantity: 100,
    startDate: '2024-01-01',
    endDate: '2024-01-10',
  },
  {
    planId: 'P002',
    productNumber: 'P002',
    quantity: 150,
    startDate: '2024-01-05',
    endDate: '2024-01-15',
  },
])

// Mock 物资入库信息
mock.onPost('/materials/inbound').reply(201, {
  materialNumber: 'M001',
  quantity: 20,
})

// Mock 物资出库信息
mock.onPost('/materials/outbound').reply(201, {
  materialNumber: 'M001',
  quantity: 5,
})

// Mock 物资库存信息
mock.onGet('/materials/inventory').reply(200, [
  {
    materialNumber: 'M001',
    quantity: 15,
  },
  {
    materialNumber: 'M002',
    quantity: 30,
  },
])

// Mock 物资盘点信息
mock.onPost('/materials/audit').reply(200, {
  auditedCount: 15,
  systemCount: 15,
  difference: 0,
})

// Mock 产品入库信息
mock.onPost('/products/inbound').reply(201, {
  productNumber: 'P001',
  quantity: 50,
})

// Mock 产品出库信息
mock.onPost('/products/outbound').reply(201, {
  productNumber: 'P001',
  quantity: 10,
})

// Mock 产品库存信息
mock.onGet('/products/inventory').reply(200, [
  {
    productNumber: 'P001',
    quantity: 190,
  },
  {
    productNumber: 'P002',
    quantity: 180,
  },
])

// Mock 产品盘点信息
mock.onPost('/products/audit').reply(200, {
  auditedCount: 190,
  systemCount: 190,
  difference: 0,
})

export default mock
