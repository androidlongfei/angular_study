/**
 * Created by longfei on 15/10/26.
 */

var secondController = function($scope){
    $scope.name = "张三";
    $scope.count = 0;

    $scope.data = {
        myName:"test",
        setCount:function(){
            $scope.data.myName = "lu";
            console.log( $scope.data.myName);
        }
    }

    /**
     * name:代表监听的model
     * newVal:代表model的新值,oldVal:代表监听的model的原始值
     *
     */
    $scope.$watch("name",function(newVal,oldVal){
        ++$scope.count;
        console.log(newVal+"..."+oldVal);
        if($scope.count>10){
            $scope.name = "已经大于十次了";
            $scope.data.setCount();
        }
    });

}

//注意：系统自带的对象，会自动触发脏检查,例如ng-...
//只有自定义的对象才需要手动触发脏检查