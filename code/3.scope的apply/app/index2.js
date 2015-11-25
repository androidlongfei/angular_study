/**
 * Created by longfei on 15/10/26.
 */

var secondController = function($scope){
    $scope.name = "张三";
    $scope.date = new Date();

    setInterval(function(){
        //触发脏检查
        $scope.$apply(function(){
            //更新model数据，进而更新view数据
            $scope.date = new Date();
        });
    },1000);
}

//注意：系统自带的对象，会自动触发脏检查,例如ng-...
//只有自定义的对象才需要手动触发脏检查