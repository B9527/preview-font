<template>
  <div id="setting_content">
    <el-form  label-position="left" :rules="rules" ref="setData" label-width="80px" :model="setData">
        <el-form-item label="host:" prop="host">
            <el-input v-model="setData.host" class='input_class'></el-input>
        </el-form-item>
        <el-form-item label="database:" prop="database">
            <el-input v-model="setData.database" class='input_class'></el-input>
        </el-form-item>
        <el-form-item label="table:" prop="table">
            <el-input v-model="setData.table" class='input_class'></el-input>
        </el-form-item>
        <el-form-item label="schema:" prop="schema">
            <el-input v-model="setData.schema" class='input_class'></el-input>
        </el-form-item>
        
    </el-form>
     <el-button type="primary" @click.once="submitForm('setData')" style="margin-left:-44%">立即创建</el-button>
</div>
</template>
<script>

  import { setInput } from '../api/api';
  export default {
    data() {
      return {
        setData: {
            host: '',
            database: '',
            table: '',
            schema:''
        },
        rules: {
            host: [
                { required: true, message: '请输入host', trigger: 'blur' },
                ],
            database: [
                { required: true, message: '请输入database', trigger: 'blur' },
                ],
            table: [
                { required: true, message: '请输入table', trigger: 'blur' },
                ],
            schema: [
                { required: true, message: '请输入schema', trigger: 'blur' },
                ],
        },
      };
    },
    methods: {
        resetForm(setData) {
            this.$refs[setData].resetFields();
      },
       submitForm(setData) {
        this.$refs[setData].validate((valid) => {
          if (valid) {
            let formData = new FormData();
            formData.append('host',this.setData.host);
            formData.append('database',this.setData.database);
            formData.append('table',this.setData.table);
            formData.append('schema',this.setData.schema);
            var user = sessionStorage.getItem('user');
			if (user) {
                user = JSON.parse(user);
                console.log(user);
				formData.append('user',user.user_id);
			}
           
            console.log(formData);
            var uploadParams = formData
            setInput(uploadParams).then(data => {
              //NProgress.done();
              let { msg, code, result } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error',
                });
              } else {
                this.$message({
                  message: msg,
                  type: 'success'
                });
              }
            }).catch(function (error){
                if (error.response){
                    console.log(error.response.status);
                    alert("接口报错！"+ error.response.status);
                }else{
                     alert("服务器出错！"+ error);
                }
            });
          } else {
            this.$message({
                    message: "请检查数据",
                    type: 'error',
                    });
          }
        });
    }
  }
  }
</script>

<style scoped>
#setting_content {
    margin: 5%;
    margin-left: 30%;

}
.input_class {
    width:40%;
    float: left;
}
</style>

