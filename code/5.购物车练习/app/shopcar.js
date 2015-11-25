/**
 * Created by longfei on 15/10/26.
 */

var carController = function($scope){

    $scope.carItem = [
        {
            id:100,
            name:"iphone",
            number:5,
            price:1000,
        },
        {
            id:300,
            name:"iphone4s",
            number:10,
            price:2000,
        },
        {
            id:600,
            name:"iphone5",
            number:15,
            price:4000,
        },
        {
            id:200,
            name:"iphone5s",
            number:7,
            price:5000,
        }
    ];

    /**
     * 总价
     * @returns {total price}
     */
    $scope.totalPrice = function(){
        var total = 0;
        angular.forEach($scope.carItem,function (item) {
            total += (parseInt(item.number))*(item.price);
        });
        return total;
    }

    /**
     * 购买总数量
     * @returns { total number}
     */
    $scope.totalNumber = function(){
        var total = 0;
        angular.forEach($scope.carItem,function (item) {
            total += parseInt(item.number);
        });
        return total;
    }

    /*
    删除指定项
     */
    $scope.remove = function(id){
        var index = getIndexById(id);
        if(index!==-1)
        $scope.carItem.splice(index,1);
    }

    function getIndexById(id){
        var index = -1;
        var i=0;
        angular.forEach($scope.carItem,function(item){
            if(item.id === id){
                index = i;
                return;
            }
            i++;
        });
        return index;
    }


    $scope.clearAll = function(){
        $scope.carItem = {};

    }

    /**
     * 减少商品的数量
     * @param id
     */
    $scope.reduce = function(id){
        var index = getIndexById(id);
        if(index!==-1){
            if($scope.carItem[index].number>1){
                $scope.carItem[index].number--;
            }else{
                var returnKey = confirm("确定从购物车中删除该商品");
                if(returnKey){
                    $scope.remove(id);
                }
            }

        }

    }

    /**
     * 增加商品的的数量
     * @param id
     */
    $scope.add = function(id){
        var index = getIndexById(id);
        if(index!==-1)
            $scope.carItem[index].number++;
    }

    $scope.$watch("carItem",function(newVal,oldVal){

        angular.forEach(newVal,function(item,key){

            if(item.number<0){
                var returnKey = confirm("确定从购物车中删除该商品");
                if(returnKey){
                    $scope.remove(item.id);
                }else{
                    item.number = oldVal[key].number;
                }
            }
        });

    },true);

}