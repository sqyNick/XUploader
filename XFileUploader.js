/**
 * @author 孙其尧 描述：version 1.0版本
 */
function XFileUploader() {

	/**
	 * 对应input对象
	 */
	var fileInput;

	/**
	 * 全局回调函数,外部传入
	 */
	var onUploading, onSuccess, onFailed, onCanceled;

	/**
	 * FormData对象,存储将上传的文件跟附带信息，附带信息以键值对形式存放
	 */
	var formData = new FormData();
	
	/**
	 * 核心上传类
	 */
	var xhr = new XMLHttpRequest();

	/**
	 * 初始化文件上传对象 emId为input [type = file]的Id
	 */
	this.bindFiles = function(emId) {
		fileInput = document.getElementById(emId);
		fileInput.onchange = function() {
			var files = fileInput.files;
			var fileInfo = {};
			if (files) {
				var fileSize = 0;
				for ( var i in files) {
					fileSize += files[i].size;
				}
				if (fileSize > 1024 * 1024 * 1024) {
					fileSize = (Math.round(fileSize * 100 / (1024 * 1024 * 1024)) / 100)
					.toString()
					+ 'G';
				} else if (fileSize > 1024 * 1024 && fileSize < 1024 * 1024 * 1024) {
					fileSize = (Math.round(fileSize * 100 / (1024 * 1024)) / 100)
							.toString()
							+ 'M';
				} else if (fileSize > 1024 && fileSize < 1024 * 1024){
					fileSize = (Math.round(fileSize * 100 / 1024) / 100)
							.toString()
							+ 'K';
				} else {
					fileSize = (Math.round(fileSize))
					.toString()
					+ 'B';
				}
			} else {

			}
		};
	}

	/**
	 * 上传文件
	 */
	this.upload = function(url) {
		var name = fileInput.getAttribute("name");
		var fileLists = fileInput.files;
		if (fileLists) {
			for ( var i in fileLists) {
				formData.append(name, fileLists[i]);
			}
		}
		xhr.upload.addEventListener("progress", this.onProgress, false);
		xhr.addEventListener("load", this.onComplete, false);
		xhr.addEventListener("error", this.onFailed, false);
		xhr.addEventListener("abort", this.onCanceled, false);
		xhr.open("POST", url);// 修改成自己的接口
		xhr.send(formData);
	}
	
	/**
	 * 取消上传
	 */
	this.cancel = function() {
		xhr.abort();
	}
	/**
	 * 文件上传中
	 */
	this.onProgress = function(evt) {
		if (evt.lengthComputable) {
			var percentComplete = Math.ceil(evt.loaded * 100 / evt.total)
					+ '%';
			var resp = {
				loader : evt.loaded,
				total : evt.total,
				percent : percentComplete
			};
			if (onUploading) {
				onUploading(resp);
			}
		} else {
			if (onUploading) {
				onUploading('unable to compute');
			}
		}
	}
	/**
	 * 文件上传完毕
	 */
	this.onComplete = function(evt) {
		if (onSuccess) {
			onSuccess(evt.target.responseText);
		}
		console.log("onSuccess");
	}
	/**
	 * 文件上传失败
	 */
	this.onFailed = function(evt) {
		if (onFailed) {
			onFailed("failed");
		}
		console.log("onFailed");
	}
	/**
	 * 文件取消上传
	 */
	this.onCanceled = function(evt) {
		if (onCanceled) {
			onCanceled("canceled");
		}
		console.log("onCanceled");
	}
	
	/**
	 * 设置上传时附带的键值对信息
	 */
	this.setParams = function(mapData){
		if (mapData && mapData instanceof  HashMap) {
			var keyArray = mapData.keySet();
			for(var i = 0; i < mapData.size(); i++) {
				var k = keyArray[i];
				formData.append(k,mapData.get(k));
			}
		} else {
			alert("参数数据类型错误，必须为HashMap对象");
		}
	}
	
	/**
	 * 设置上传过程回调监听
	 */
	this.setOnUploadingListener = function(callback) {
		onUploading = callback;
	}
	/**
	 * 设置上传成功回调监听
	 */
	this.setOnSuccessListener = function(callback) {
		onSuccess = callback;
	}
	/**
	 * 设置上传失败回调监听
	 */
	this.setOnFailedListener = function(callback) {
		onFailed = callback;
	}
	/**
	 * 设置取消上传回调监听
	 */
	this.setOnCanceledListener = function(callback) {
		onCanceled = callback;
	}

}

/**
 * 定义键值对
 */
function HashMap() {
	// 定义长度
	var length = 0;
	// 创建一个对象
	var obj = new Object();

	/**
	 * 判断Map是否为空
	 */
	this.isEmpty = function() {
		return length == 0;
	};

	/**
	 * 判断对象中是否包含给定Key
	 */
	this.containsKey = function(key) {
		return(key in obj);
	};

	/**
	 * 判断对象中是否包含给定的Value
	 */
	this.containsValue = function(value) {
		for(var key in obj) {
			if(obj[key] == value) {
				return true;
			}
		}
		return false;
	};

	/**
	 * 向map中添加数据
	 */
	this.put = function(key, value) {
		if(!this.containsKey(key)) {
			length++;
		}
		obj[key] = value;
	};

	/**
	 * 根据给定的Key获得Value
	 */
	this.get = function(key) {
		return this.containsKey(key) ? obj[key] : null;
	};

	/**
	 * 根据给定的Key删除一个值
	 */
	this.remove = function(key) {
		if(this.containsKey(key) && (delete obj[key])) {
			length--;
		}
	};

	/**
	 * 获得Map中的所有Value
	 */
	this.values = function() {
		var _values = new Array();
		for(var key in obj) {
			_values.push(obj[key]);
		}
		return _values;
	};

	/**
	 * 获得Map中的所有Key
	 */
	this.keySet = function() {
		var _keys = new Array();
		for(var key in obj) {
			_keys.push(key);
		}
		return _keys;
	};

	/**
	 * 获得Map的长度
	 */
	this.size = function() {
		return length;
	};

	/**
	 * 清空Map
	 */
	this.clear = function() {
		length = 0;
		obj = new Object();
	};

	/**
	 * 将hashMap转换成json
	 */
	this.toString = function() {
		var s = "[";
		var keyArray = this.keySet();
		for(var i = 0; i < length; i++, s += ',') {
			var k = keyArray[i];
			s += "{'" + k + "':" + obj[k] + "}";
		}
		s = s.substring(0, s.length - 1);
		if(s != "") {
			s += "]";
		}
		return s;
	}
}