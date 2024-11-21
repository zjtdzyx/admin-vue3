<script setup lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElMessage, ElTable, ElTableColumn } from 'element-plus'
import { onMounted, ref, computed } from 'vue'
import 'element-plus/dist/index.css'

const farmerInfo = ref<any[]>([])

const defaultFarmerInfo = [
  { farmerNumber: '001', name: '张三', address: '北京市', contact: '123456789', sowingArea: '100亩' },
  { farmerNumber: '002', name: '李四', address: '上海市', contact: '987654321', sowingArea: '200亩' },
  { farmerNumber: '003', name: '王五', address: '广州市', contact: '456123789', sowingArea: '150亩' },
  { farmerNumber: '004', name: '赵六', address: '深圳市', contact: '321654987', sowingArea: '120亩' },
  { farmerNumber: '005', name: '孙七', address: '杭州市', contact: '789123456', sowingArea: '180亩' },
  { farmerNumber: '006', name: '周八', address: '成都市', contact: '654789123', sowingArea: '160亩' },
  { farmerNumber: '007', name: '吴九', address: '南京市', contact: '123789456', sowingArea: '140亩' },
  { farmerNumber: '008', name: '郑十', address: '苏州市', contact: '987321654', sowingArea: '130亩' },
  { farmerNumber: '009', name: '王十一', address: '武汉市', contact: '456987123', sowingArea: '170亩' },
  { farmerNumber: '010', name: '李十二', address: '长沙市', contact: '321987654', sowingArea: '110亩' }
]



// 从 localStorage 加载农民信息
function loadFarmerInfo() {
  const storedData = localStorage.getItem('farmerInfo')
  if (storedData) {
    farmerInfo.value = JSON.parse(storedData)
  } else {
    farmerInfo.value = defaultFarmerInfo
  }
}

// 保存农民信息到 localStorage
function saveFarmerInfo() {
  localStorage.setItem('farmerInfo', JSON.stringify(farmerInfo.value))
}

// 还原为默认数据
function restoreDefaultData() {
  farmerInfo.value = [...defaultFarmerInfo]
  saveFarmerInfo() // 保存到 localStorage
  ElMessage.success('数据已恢复为默认值')
}

const searchQuery = ref('')
const filteredFarmerInfo = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return farmerInfo.value
  return farmerInfo.value.filter(farmer =>
    Object.values(farmer).some(value =>
      String(value).toLowerCase().includes(query)
    )
  )
})

const newFarmer = ref({ farmerNumber: '', name: '', address: '', contact: '', sowingArea: '' })
const editingFarmer = ref<{ farmerNumber: string, name: string, address: string, contact: string, sowingArea: string } | null>(null)

onMounted(() => {
  loadFarmerInfo() // 加载数据
  ElMessage.success('Farmer info loaded successfully')
})

function addFarmerHandler() {
  farmerInfo.value.push({ ...newFarmer.value })
  newFarmer.value = { farmerNumber: '', name: '', address: '', contact: '', sowingArea: '' }
  saveFarmerInfo() // 保存到 localStorage
  ElMessage.success('Farmer added successfully')
}

function editFarmerHandler(farmer) {
  editingFarmer.value = { ...farmer }
}

function updateFarmerHandler() {
  const index = farmerInfo.value.findIndex(f => f.farmerNumber === editingFarmer.value?.farmerNumber)
  if (index !== -1 && editingFarmer.value) {
    farmerInfo.value[index] = { ...editingFarmer.value }
    editingFarmer.value = null
    saveFarmerInfo() // 保存到 localStorage
    ElMessage.success('Farmer updated successfully')
  }
}

function removeFarmerHandler(farmerNumber) {
  farmerInfo.value = farmerInfo.value.filter(f => f.farmerNumber !== farmerNumber)
  saveFarmerInfo() // 保存到 localStorage
  ElMessage.success('Farmer removed successfully')
}
</script>

<template>
  <div class="container">
    <ElCard class="box-card">
      <div class="card-header">
        <h1>农民信息管理</h1>
      </div>
      <!-- 搜索框 -->
      <div class="search-container">
        <ElInput
          v-model="searchQuery"
          placeholder="输入关键词搜索农民信息..."
          clearable
        />
      </div>
      <ElForm label-width="120px" @submit.prevent="addFarmerHandler">
        <ElFormItem label="农民编号">
          <ElInput v-model="newFarmer.farmerNumber" placeholder="农民编号" required />
        </ElFormItem>
        <ElFormItem label="名称">
          <ElInput v-model="newFarmer.name" placeholder="名称" required />
        </ElFormItem>
        <ElFormItem label="地址">
          <ElInput v-model="newFarmer.address" placeholder="地址" required />
        </ElFormItem>
        <ElFormItem label="联系人">
          <ElInput v-model="newFarmer.contact" placeholder="联系人" required />
        </ElFormItem>
        <ElFormItem label="播种面积">
          <ElInput v-model="newFarmer.sowingArea" placeholder="播种面积" required />
        </ElFormItem>
        <ElFormItem class="form-actions">
          <ElButton type="primary" @click="addFarmerHandler">
            添加农民
          </ElButton>
        </ElFormItem>
      </ElForm>
      <div class="table-container">
        <ElTable :data="filteredFarmerInfo" style="width: auto; margin: 0 auto;" height="400" border>
          <ElTableColumn prop="farmerNumber" label="农民编号" width="150" />
          <ElTableColumn prop="name" label="名称" width="150" />
          <ElTableColumn prop="address" label="地址" width="150" />
          <ElTableColumn prop="contact" label="联系人" width="150" />
          <ElTableColumn prop="sowingArea" label="播种面积" width="150" />
          <ElTableColumn label="操作" width="150">
            <template #default="scope">
              <ElButton type="primary" size="small" @click="editFarmerHandler(scope.row)">
                编辑
              </ElButton>
              <ElButton type="danger" size="small" @click="removeFarmerHandler(scope.row.farmerNumber)">
                删除
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <!-- 还原数据按钮 -->
      <ElButton type="warning" @click="restoreDefaultData">还原数据</ElButton>
    </ElCard>
    <div v-if="editingFarmer" class="edit-container">
      <ElCard class="box-card">
        <div class="card-header">
          <h2>编辑农民</h2>
        </div>
        <ElForm label-width="120px" @submit.prevent="updateFarmerHandler">
          <ElFormItem label="农民编号">
            <ElInput v-model="editingFarmer.farmerNumber" placeholder="农民编号" required />
          </ElFormItem>
          <ElFormItem label="名称">
            <ElInput v-model="editingFarmer.name" placeholder="名称" required />
          </ElFormItem>
          <ElFormItem label="地址">
            <ElInput v-model="editingFarmer.address" placeholder="地址" required />
          </ElFormItem>
          <ElFormItem label="联系人">
            <ElInput v-model="editingFarmer.contact" placeholder="联系人" required />
          </ElFormItem>
          <ElFormItem label="播种面积">
            <ElInput v-model="editingFarmer.sowingArea" placeholder="播种面积" required />
          </ElFormItem>
          <ElFormItem class="form-actions">
            <ElButton type="primary" @click="updateFarmerHandler">
              更新农民
            </ElButton>
            <ElButton @click="editingFarmer = null">
              取消
            </ElButton>
          </ElFormItem>
        </ElForm>
      </ElCard>
    </div>
  </div>
</template>


<style scoped>
.container {
  padding: 20px;
}

h1 {
  margin-bottom: 16px;
  text-align: center;
}

.search-container {
  margin-bottom: 20px;
}

.el-table th,
.el-table td {
  padding: 8px !important;
  border-right: 1px solid #ebeef5;
}

.el-table th:last-child,
.el-table td:last-child {
  border-right: none;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.table-container {
  display: flex;
  justify-content: center;
}

.edit-container {
  margin-top: 20px;
}
</style>
