(function (angular) {
	'use strict';

	/**
	 * MyTodoMvc Module
	 *
	 * 应用程序的主要的模块*/
	var myApp = angular.module('todolist', []);

	// 注册一个主控制器
	myApp.controller('MainController', ['$scope',
		function ($scope) {
			function getID(){
				var id = Math.random();
				for (var i =0; i<$scope.todos.length;i++) {
					if ($scope.todos[i].id === id){
						id = getID();
						break;
					}
				}
				return id;
			}

			// 文本框需要一个模型
			$scope.text = '';
			// 任务列表也需要一个模型
			$scope.todos = [{
				id:0.123,
				text:'请输入内容',
				completed:false
			}];

			//添加todo项
			$scope.add = function(){
				if(!$scope.text){
					return;
				}
				$scope.todos.push({
					id:getID(),
					text:$scope.text,
					completed:false
				});
				$scope.text='';
			};

			//处理删除项
			$scope.remove = function(id){
				for (var i =0; i<$scope.todos.length;i++) {
					if ($scope.todos[i].id === id){
						$scope.todos.splice(i,1);
						break;
					}
				}
			};
			//清空已完成选项
			$scope.clear = function(){
				var result = [];
				for (var i=0 ; i<$scope.todos.length; i++){
					if(!$scope.todos[i].completed){
						result.push($scope.todos[i]);
					}
				}
				$scope.todos = result;
				};
			//是否有completed选项
			$scope.existCompleted = function(){
				for (var i = 0; i<$scope.todos.length;i++){
					if($scope.todos[i].completed){
						return true;
					}
				}
				return false;
			};


			//全选任务
			var now = true;
			$scope.toggleAll = function(){
				for (var i = 0; i<$scope.todos.length; i++){
					$scope.todos[i].completed = now;
				}
				now = !now;
			}

			//当前编辑元素
			$scope.currentEditingId = -1;
			$scope.editing = function(id){
				$scope.currentEditingId = id;
			};
			$scope.save = function(){
				$scope.currentEditingId = -1;
			};

		}]
	);

})(angular);




