<template>
<div>
    <div style="margin-top:50px;width=100%">
        <el-form :inline="true" :model="tableInfo" class="demo-form-inline">
            <el-form-item label="Host:">
                <el-input v-model="tableInfo.host" placeholder="host" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="Database:">
                <el-input v-model="tableInfo.database" placeholder="database" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="Table:">
                <el-input v-model="tableInfo.table" placeholder="table" disabled=""></el-input>
            </el-form-item>
        </el-form>
    </div>
    <div>
        <el-popover ref="popover4" placement="right" width="400" trigger="click">
        <div style="margin-top: 20px">
            <el-radio-group v-model="radio" size="medium" v-for="field in fields" :key=field>
                
                <el-radio-button :label=field></el-radio-button>
            </el-radio-group>
  </div>
        </el-popover>

        <p style="margin-left:-32%">fields:<el-button v-popover:popover4  type="primary" plain>选择过滤不为空fields</el-button></p>
    </div>
    <div>
        <el-popover ref="popover4" placement="right" width="400" trigger="click">
        <div>
          <el-checkbox-group v-model="checkList">
              <el-checkbox-button v-for="field in fields" :label="field" :key="field">{{field}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        </el-popover>

        <p style="margin-left:-32%">fields:<el-button v-popover:popover4  type="primary" plain>选择需要展示的fields</el-button></p>
    </div>
    <div>
        <el-table :data="showData" stripe border style="width: 100%" >
             <el-table-column type="index" :index="indexMethod" label="index" width="60">
            </el-table-column>
            <el-table-column v-for="item in checkList" :key="item" :prop=item :label=item  width="180"></el-table-column>
  </el-table>
    </div>
</div>
</template>
<script>
import { getTableInfo } from '../api/api';
import { getTableData } from '../api/api';
export default {
  data() {
    return {
        tableInfo:{
            host: 'host',
            database: 'database',
            table: 'table',
        },
        fields:["field_1", "field_2"],
        radio:"",
        checkList:[],
        showData:[],
    }

  },
  mounted: function() {
            this.$nextTick(function () {
                this.loadTableData();
                })
            },
  methods: {
      loadTableData: function(){
          getTableInfo({params:{"id":this.$route.query.id}}).then(data => {
							//NProgress.done();
				let { msg, code, result } = data;
				if (code !== 200) {
				this.$message({
                    message: msg,
                    type: 'error',
                    });
				} else {
				this.tableInfo = result.tableInfo;
				this.fields = result.fields;
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
      loadShowData: function(){
          getTableData({params:{"host":this.tableInfo.host, "database":this.tableInfo.database,"table":this.tableInfo.table,"field":this.radio}}).then(data => {
							//NProgress.done();
				let { msg, code, result } = data;
				if (code !== 200) {
				this.$message({
                    message: msg,
                    type: 'error',
                    });
				} else {
				this.showData= result.data;
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
      indexMethod(index) {
        return index + 1;
    
      },
  },
  watch: {
      checkList: function(arry){
          console.log(arry);
      },
      radio: function(str){
          this.loadShowData();
      }
  }
}
</script>