/*注意js加载先后顺序*/
/*递归实现获取无级树数据并生成DOM结构*/
var str = "";
var forTree = function(o){
	for(var i=0;i<o.length;i++){
		var urlstr = "";
		try{
			if(typeof o[i]["icourl"] == "undefined"){
				urlstr = "<div class='menulist'><span>"+o[i]["name"]+"</span><ul>";
			}else{
				urlstr = "<div class='menulist'><span>"+"<img width='20' height='20' src="+o[i]["icourl"]+">"+o[i]["name"]+"</span><ul>";	
			}
			str += urlstr;
			if(o[i]["list"] != null){
				forTree(o[i]["list"]);
			}
			str += "</ul></div>";
		}catch(e){}
	}
	return str;
}
/*添加无级树*/
$("#menuTree").html(forTree(data));
/*树形菜单*/
var menuTree = function(){
	//给有子对象的元素加[+-]
	$("#menuTree ul").each(function(index, element) {
		var ulContent = $(element).html();
		var spanContent = $(element).siblings("span").html();
        if(ulContent){
			$(element).siblings("span").html("[+]"+spanContent)	
		}
    });
	$("#menuTree").find("div span").click(function(){
		var ul = $(this).siblings("ul");
		var spanStr = $(this).html();
		var spanContent = spanStr.substr(3,spanStr.length);
		if(ul.find("div").html() != null){
			if(ul.css("display") == "none"){
				ul.show(200);
				$(this).html("[-]"+spanContent);
			}else{
				ul.hide(200);
				$(this).html("[+]"+spanContent);
			}
		}
	})
}()
/*展开*/
$("#btn_open").click(function(){
	$("#menuTree ul").show(200);
	curzt("-");
})
/*收缩*/
$("#btn_close").click(function(){
	$("#menuTree ul").hide(200);
	curzt("+");
})
function curzt(v){
	$("#menuTree span").each(function(index, element) {
		var ul = $(this).siblings("ul");
        var spanStr = $(this).html();
		var spanContent = spanStr.substr(3,spanStr.length);
		if(ul.find("div").html() != null){
			$(this).html("["+v+"]"+spanContent);
		}
    });	
};