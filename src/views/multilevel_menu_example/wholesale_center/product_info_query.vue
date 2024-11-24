<script setup>
import { ref, onMounted } from 'vue';

// 表单数据
const form = ref({
  inboundQuantity: 0,
  inbound_date: '',
});

// 响应式表格数据
const tableData = ref([]);

// 动态表格高度
const tableHeight = ref(0);

// 控制弹窗的显隐
const editDialogVisible = ref(false);

// 当前选中的产品
const selectedProduct = ref(null);

// 搜索关键字
const searchKeyword = ref('');

// 动态调整表格高度
function updateTableHeight() {
  const windowHeight = window.innerHeight;
  tableHeight.value = windowHeight - 200;
}

// 添加监听器，动态调整表格高度
window.addEventListener('resize', updateTableHeight);
onMounted(updateTableHeight);

// 生成10组死数据
const initialData = [
  { product_number: '001', name: '产品1', quantity: 10, last_inbound_date: '2023-01-01' },
  { product_number: '002', name: '产品2', quantity: 20, last_inbound_date: '2023-02-01' },
  { product_number: '003', name: '产品3', quantity: 30, last_inbound_date: '2023-03-01' },
  { product_number: '004', name: '产品4', quantity: 40, last_inbound_date: '2023-04-01' },
  { product_number: '005', name: '产品5', quantity: 50, last_inbound_date: '2023-05-01' },
  { product_number: '006', name: '产品6', quantity: 60, last_inbound_date: '2023-06-01' },
  { product_number: '007', name: '产品7', quantity: 70, last_inbound_date: '2023-07-01' },
  { product_number: '008', name: '产品8', quantity: 80, last_inbound_date: '2023-08-01' },
  { product_number: '009', name: '产品9', quantity: 90, last_inbound_date: '2023-09-01' },
  { product_number: '010', name: '产品10', quantity: 100, last_inbound_date: '2023-10-01' },
];

// 本地存储数据
function saveToLocalStorage(data) {
  localStorage.setItem('products', JSON.stringify(data));
}

// 从本地存储获取数据
function loadFromLocalStorage() {
  const data = localStorage.getItem('products');
  return data ? JSON.parse(data) : initialData;
}

// 获取所有产品信息
function fetchProducts() {
  tableData.value = loadFromLocalStorage();
}

// 更新产品
function editProduct() {
  if (selectedProduct.value) {
    const index = tableData.value.findIndex(product => product.product_number === selectedProduct.value.product_number);
    if (index !== -1) {
      tableData.value[index] = { ...selectedProduct.value, ...form.value };
      saveToLocalStorage(tableData.value);
      fetchProducts();
      editDialogVisible.value = false;
    }
  }
}

// 删除产品
function removeProduct(productNumber) {
  tableData.value = tableData.value.filter(product => product.product_number !== productNumber);
  saveToLocalStorage(tableData.value);
  fetchProducts();
}

// 删除选中的产品
function removeSelectedProducts() {
  const selectedProductNumbers = tableData.value.filter(product => product._checked).map(product => product.product_number);
  tableData.value = tableData.value.filter(product => !selectedProductNumbers.includes(product.product_number));
  saveToLocalStorage(tableData.value);
  fetchProducts();
}

// 初始化获取产品信息
onMounted(fetchProducts);

// 打开编辑弹窗
function handleEdit(row) {
  selectedProduct.value = row;
  form.value.inboundQuantity = row.quantity || 0;
  form.value.inbound_date = row.last_inbound_date || '';
  editDialogVisible.value = true;
}

// 删除产品处理
function handleDelete(row) {
  removeProduct(row.product_number);
}

// 搜索产品
function searchProducts() {
  const keyword = searchKeyword.value.toLowerCase();
  tableData.value = loadFromLocalStorage().filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.product_number.includes(keyword)
  );
}

// 还原数据
function resetData() {
  saveToLocalStorage(initialData);
  fetchProducts();
}
</script>

<template>
  <div class="container">
    <!-- 顶排按钮 -->
    <div class="product-info">

      <div class="mb-4">
        <el-input v-model="searchKeyword" placeholder="搜索产品" @input="searchProducts" clearable />
        <el-button type="warning" plain @click="resetData">
          还原数据
        </el-button>
        <el-button type="danger" plain @click="removeSelectedProducts">
          删除选中
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" :height="tableHeight" border style="width: 100%;" @row-click="row => selectedProduct = row">
      <el-table-column type="selection" width="55" />
      <el-table-column label="产品编号" width="100" align="center">
        <template #default="scope">
          {{ scope.row.product_number }}
        </template>
      </el-table-column>
      <el-table-column property="name" label="产品名称" width="120" align="center" />
      <el-table-column property="quantity" label="总量" width="100" align="center" />
      <el-table-column property="last_inbound_date" label="最后入库日期" width="180" align="center" />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑产品" width="400px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="产品数量">
          <el-input v-model.number="form.inboundQuantity" type="number" min="0" />
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker v-model="form.inbound_date" type="date" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editProduct">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  margin: 20px;
}

.product-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mb-4 {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.dialog-footer {
  text-align: right;
}
</style>