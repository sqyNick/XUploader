# XFUploader
js文件上传插件，支持上传进度获取，支持附加参数设置，支持批量文件上传

1.引入XFileUploader.js

2.页面中定义input控件

<input type="file" name="files" id="fileUploader" multiple/>    

<input type="button" onclick="uploadFile()" value="Upload" />    

3.js代码

    //上传进度回调函数  
    function getUploadingInfo(resp){  
        console.log(resp);  
    }  
    //创建文件上传对象  
    var uploader = new XUploader();  
    //通过input框id初始化  
    uploader.init("fileUploader");  
    //设置上传进度回调函数  
    uploader.setOnUploadingListener(getUploadingInfo);  
   //上传  
    function uploadFile() {    
      //除文件之外的键值对附带信息  
      var params = new HashMap();  
      params.put("test","123");  
      params.put("test2","1232");  
      //设置上传参数  
      uploader.setParams(params);  
      //上传文件跟附带参数信息，参数为自己接口  
      uploader.upload('uploadCommonSoftware');  
    }    
3.运行结果

{loader: 240697344, total: 288048840, percent: "84%"}

{loader: 244973568, total: 288048840, percent: "86%"}

{loader: 246841344, total: 288048840, percent: "86%"}

{loader: 254148608, total: 288048840, percent: "89%"}

{loader: 257638400, total: 288048840, percent: "90%"}

{loader: 259260416, total: 288048840, percent: "91%"}

{loader: 261963776, total: 288048840, percent: "91%"}

{loader: 265584640, total: 288048840, percent: "93%"}

{loader: 270467072, total: 288048840, percent: "94%"}

{loader: 272171008, total: 288048840, percent: "95%"}

{loader: 273940480, total: 288048840, percent: "96%"}

{loader: 278790144, total: 288048840, percent: "97%"}

{loader: 285081600, total: 288048840, percent: "99%"}

{loader: 288048840, total: 288048840, percent: "100%"}

onSuccess
