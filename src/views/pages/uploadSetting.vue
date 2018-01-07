<template>
<div id="upload_form" style="margin-top:5%;">
    <el-form :inline="true"  class="demo-form-inline">
        <el-form-item  label="请 选 择 文 件：">
           <input type="file" name="file" style="width:200px" class="file" @change="getFile($event)"  />
                          
        </el-form-item></br>
        <el-form-item  label=" 提   交： ">
           
              <el-button type="primary" style="width:200px" @click.once="submitForm($event)">上传</el-button>
        </el-form-item>            
    </el-form>
        
</div>
</template>


<script>
  import { setUpload } from '../api/api';
  export default {
    data() {
      return {
        }
       
    },
    methods: {
       getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
          },
       submitForm(event) {
            event.preventDefault();
            let formData = new FormData();
            formData.append('file', this.file);
            var user = sessionStorage.getItem('user');
			if (user) {
                user = JSON.parse(user);
                console.log(user);
				formData.append('user',user.user_id);
			}
            var uploadParams = formData
            setUpload(uploadParams).then(data => {
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
    }   }
  }
</script>

<style scoped>
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
</style>
