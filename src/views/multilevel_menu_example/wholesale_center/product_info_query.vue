<script setup>
import { ref, onMounted } from 'vue';
import { createProduct, getProducts, updateProduct, deleteProduct } from '@/api/product';


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
const dialogVisible = ref(false);
const editDialogVisible = ref(false);

// 当前选中的产品
const selectedProduct = ref(null);

// 动态调整表格高度
function updateTableHeight() {
  const windowHeight = window.innerHeight;
  tableHeight.value = windowHeight - 200;
}

// 添加监听器，动态调整表格高度
window.addEventListener('resize', updateTableHeight);
onMounted(updateTableHeight);

// 获取所有产品信息
async function fetchProducts() {
  tableData.value = await getProducts();
}

// 创建产品
async function addProduct() {
  await createProduct(form.value);
  await fetchProducts();
}

// 更新产品
async function editProduct() {
  if (selectedProduct.value) {
    await updateProduct(selectedProduct.value.product_number, form.value);
    await fetchProducts();
    editDialogVisible.value = false;
  }
}

// 删除产品
async function removeProduct(productNumber) {
  await deleteProduct(productNumber);
  await fetchProducts();
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
async function handleDelete(row) {
  await removeProduct(row.product_number);
}

// 提交入库信息
async function onSubmit() {
  if (
    selectedProduct.value
    && form.value.inboundQuantity > 0
    && form.value.inbound_date
  ) {
    try {
      const updatedQuantity
        = selectedProduct.value.quantity + form.value.inboundQuantity;

      // 更新数据库
      await updateProduct(selectedProduct.value.product_number, {
        quantity: updatedQuantity,
        last_inbound_date: form.value.inbound_date,
      });

      // 更新前端数据
      selectedProduct.value.quantity = updatedQuantity;
      selectedProduct.value.last_inbound_date = form.value.inbound_date;
      fetchProducts();

      dialogVisible.value = false;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<template>
  <div class="container">
    <!-- 顶排按钮 -->
    <div class="product-info">
      <h2>产品信息管理</h2>

      <div class="mb-4">
        <el-button
          type="primary"
          plain
          :disabled="!selectedProduct"
          @click="handleAddStock"
        >
          入库（先点击勾选产品）
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :height="tableHeight"
      border
      style="width: 100%;"
      @row-click="row => selectedProduct = row"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="产品编号" width="100" align="center">
        <template #default="scope">
          {{ scope.row.product_number }}
        </template>
      </el-table-column>
      <el-table-column property="name" label="产品名称" width="120" align="center" />
      <el-table-column
        property="quantity"
        label="总量"
        width="100"
        align="center"
      />
      <el-table-column
        property="last_inbound_date"
        label="最后入库日期"
        width="180"
        align="center"
      />
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 入库弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="入库操作"
      width="400px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="入库数量">
          <el-input v-model.number="form.inboundQuantity" type="number" min="1" />
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker
            v-model="form.inbound_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="onSubmit">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑产品"
      width="400px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="产品数量">
          <el-input v-model.number="form.inboundQuantity" type="number" min="0" />
        </el-form-item>
        <el-form-item label="入库日期">
          <el-date-picker
            v-model="form.inbound_date"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"
          />
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
  margin-left: 20px;
}
</style>
