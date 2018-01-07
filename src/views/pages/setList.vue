<template>
<div >
  
    <div style="margin-bottom:20px">
      <el-input style="width:160px; float:left;" v-model="search"  value="tableData.search"></el-input><el-button type="primary" icon="el-icon-search" style="float: left;" @click="GoSearch">搜索</el-button>
    <div>
  <el-table :data="tableData" style="width: 100%" border :row-class-name="tableRowClassName" element-loading-text="拼命加载中"
  show-overflow-tooltip  @selection-change="handleSelectionChange" slot="empty" @row-dblclick="dataGotoDetail" @filter-change="filterChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="index" :index="indexMethod" label="index" width="60">
    </el-table-column>
    <el-table-column prop="host" label="host">
    </el-table-column>
    <el-table-column prop="database" label="database">
    </el-table-column>
	<el-table-column prop="table"  label="table">
    </el-table-column>
    <el-table-column prop="schema"  label="schema">
    </el-table-column>
	<el-table-column prop="start_time" :formatter="dateFormat" label="start_time">
    </el-table-column>
	<el-table-column prop="end_time"  :formatter="dateFormat" label="end_time">
    </el-table-column>
	<!-- <el-table-column prop="status" label="status">
    </el-table-column> -->





    <el-table-column prop="tag" label="status" width="100"
      :filters="[
          { text: 'submit', value: 'submit' }, 
          { text: 'execting', value: 'execting' },
          { text: 'fail', value: 'fail' },
          { text: 'success', value: 'success' },
      
      ]"  :filter-multiple=false>
      <template slot-scope="scope">
        <el-tag
          type=""
          close-transition>{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>  
  </el-table>
    </div>
  </div>
   <div class="block" style="margin-top:20px;margin-bottom:10px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import { getConfigList } from '../api/api';
//   import { deleteTaskList } from '../api/api';
//   import { ChangeStatusSubmit } from '../api/api'
  import moment from 'moment';
  export default {
    data() {
      return {
        tableData: [
          {'host':'host', 'database':'database', 'table':'table', "schema":"schema", "status": "wait", "id": 'id', "start_time":"1991-10-10", "end_time":""},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'success', "id":2},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'execting', "id":3},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'submit', "id":4},
        //   {'file_name':'name', 'read_table':'read_table', 'status':'fail', "id":5}

        ],
        multipleSelection: [],
        currentPage:1,
        total:20,
        pageSize:20,
        status:'all',
        search:'',



      }
	},
	mounted: function() {
            this.$nextTick(function () {
                this.loadData();
                })
            },
    methods: {
      loadData: function(){
          getConfigList({params:{pageNum:this.currentPage, pageSize:this.pageSize,status:this.status,table:this.search}}).then(data => {
						      //NProgress.done();
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.tableData = result.task_list;
                    this.currentPage4 = result.pageNum
                    this.pageSize = result.pageSize
                    this.total = result.total
                  }
                      }).catch(function (error){
                if (error.response){
                    console.log(error.response.status);
                    alert("接口报错！"+ error.response.status);
                }else{
                     alert("服务器出错！"+ error);
                }
            });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      filterChange(filters){
        var status = filters[Object.keys(filters)][0];
        this .currentPage = 1;
        this.status = status;
        this.search = ""
        this.loadData();

      },
      indexMethod(index) {
        var base_bum = (this.currentPage-1)*(this.pageSize);
        return index + 1 + base_bum;
    
      },
      tableRowClassName({row, rowIndex}) {
        if (row.status === 'fail') {
          return 'fail-row';
        } else if (row.status === 'success') {
          return 'success-row';
        } else if (row.status === 'execting') {
          return 'warning-row';
        } else if (row.status === 'submit') {
          return 'info-row';
        }
        return '';
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      DeleteSelection() {
      var dele_data_list = this.multipleSelection;
      var request_delete_list = [];
      for (var i=0; i<dele_data_list.length;i++){
			request_delete_list.push(dele_data_list[i].id)
			for (var j=0;j<this.tableData.length;j++){
				if (this.tableData[j] ===dele_data_list[i]){
					console.log(j);
					this.tableData.splice(j,1);
				}
			}

		}
		let formData = new FormData();
		formData.append('request_delete_list',JSON.stringify(request_delete_list));
		deleteTaskList(formData).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.$message({
                    message: msg,
                    type: 'success',
					          });
                  }
            });
      },
      SubmitSelection() {
        var submit_data_list = this.multipleSelection;
		var request_submit_list = [];
		for (var i=0; i<submit_data_list.length;i++){
			request_submit_list.push(submit_data_list[i].id)
			for (var j=0;j<this.tableData.length;j++){
				if (this.tableData[j] ===submit_data_list[i]){
					this.tableData[j].status = 'submit';
				}
			}
		}
		let formData = new FormData();
		formData.append('request_submit_list',JSON.stringify(request_submit_list));
		ChangeStatusSubmit(formData).then(data => {
                  let { msg, code, result } = data;
                  if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error',
                    });
                  } else {
                    this.$message({
					message: msg,
					type: 'success',
					});
                  }
            });
	  },
	  dataGotoDetail(row){
          function contains(arr, obj) {
          var i = arr.length;
          while (i--) {
            if (arr[i] === obj) {
              return true;
            }
          }
          return false;
          }
          var task_id = row.id;
          var task_status = row.status;
          var status_arry = ['execting', 'success', 'fail'];
          var router_string = "/setting/detail/?id=" +task_id;
          if (contains(status_arry, task_status)){
			this.$router.push(router_string);
          } else {
			this.$message({
				message:"执行中的,执行过的任务才有任务详情!",
				type:"info",
			});
          }
    },
    GoSearch(){
      this.pageNum=1;
      this.loadData();
    },
    dateFormat:function(row, column) {  
              var date = row[column.property];  
        if (date == undefined) {  
            return "";  
        }  
        return  moment(date).format("YYYY-MM-DD HH:mm:ss");  
          }  
      
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .info-row {
    background: #ECF5FF;
  }
  .el-table .fail-row {
    background: #FEF0F0;
  }
  .el-button {
    float: left;
  }
</style>