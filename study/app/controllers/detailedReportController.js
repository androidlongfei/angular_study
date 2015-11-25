app.controller('DetailedReportController', function($scope, $rootScope, $http, $cookies, $location, $routeParams) {

    init();

    function init() {

        if (!$cookies.token) $location.url('/');

        $rootScope.bodyClass = 'admin';
        $scope.serverUrl = serverUrl;


        var data = {
            token: $cookies.token,
            taskId: $cookies.taskId
        };
        if ($routeParams.taskId) {
            data.taskId = $routeParams.taskId;
        }

        var prefixColumns = [];
        $scope.taskId = data.taskId;
        $scope.samplePrefixes = [];

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        $http({
            method: 'POST',
            url: serverUrl + 'api/task/detailedReport',
            data: $.param(data),
            headers: header
        }).
        success(function(data, status, headers, config) {
            console.log('success!');


            if (data.inputFiles != undefined) {
                //window.reportData = response.report;
                //console.log(data.report.replace(/\\"/g, '"'));
                $scope.inputFiles = $.parseJSON(data.inputFiles);
                var prefixHash = {};
                for (var i in $scope.inputFiles['sequenceFile']) {
                    var fileStr = $scope.inputFiles['sequenceFile'][i];
                    var prefixStr = fileStr.substr(1, fileStr.lastIndexOf('_') - 1);
                    prefixHash[prefixStr] = 1;
                }
                for (var prefix in prefixHash) {
                    $scope.samplePrefixes.push(prefix);
                    var prefixColumn = {
                        field: prefix,
                        title: prefix
                    };
                    prefixColumns.push(prefixColumn);
                }
            }

            var sampleNum = $scope.samplePrefixes.length;
            $scope.samplePrefixGroups = [];

            var groupNum = parseInt($scope.samplePrefixes.length / 6) + 1;
            for (var i = 0; i < groupNum; i++) {
                $scope.samplePrefixGroups[i] = $scope.samplePrefixes.slice(6 * i, 6 * i + 6);
            }

            $(function() {

                $('link[href*="index.css"]').remove();
                $('a.carousel-control').attr('onclick', 'return false;');



                $('#summaryInfo').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary.information.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    }].concat(prefixColumns)
                });
                $('#summarySNPVariantStat').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_SNP_variant_statistics.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'exonic',
                        title: 'exonic'
                    },{
                        field: 'intronic',
                        title: 'intronic'
                    },{
                        field: 'UTR3',
                        title: 'UTR3'
                    },{
                        field: 'UTR5',
                        title: 'UTR5'
                    },{
                        field: 'intergenic',
                        title: 'intergenic'
                    },{
                        field: 'ncRNA_exonic',
                        title: 'ncRNA_exonic'
                    },{
                        field: 'ncRNA_intronic',
                        title: 'ncRNA_intronic'
                    },{
                        field: 'upstream',
                        title: 'upstream'
                    },{
                        field: 'downstream',
                        title: 'downstream'
                    },{
                        field: 'splicing',
                        title: 'splicing'
                    },{
                        field: 'ncRNA_splicing',
                        title: 'ncRNA_splicing'
                    }]
                });
                $('#summarySNPExonicStat').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_SNP_exonic_statistics.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'synonymous_SNV',
                        title: 'synonymous_SNV'
                    },{
                        field: 'nonsynonymous_SNV',
                        title: 'nonsynonymous_SNV'
                    },{
                        field: 'stopgain',
                        title: 'stopgain'
                    },{
                        field: 'stoploss',
                        title: 'stoploss'
                    },{
                        field: 'unknown',
                        title: 'unknown'
                    }]
                });
                $('#summaryTstv').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_tstv.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'novel_ts',
                        title: 'novel_ts'
                    },{
                        field: 'novel_ts/tv',
                        title: 'novel_ts/tv'
                    },{
                        field: 'novel_tv',
                        title: 'novel_tv'
                    },{
                        field: 'ts',
                        title: 'ts'
                    },{
                        field: 'ts/tv',
                        title: 'ts/tv'
                    },{
                        field: 'tv',
                        title: 'tv'
                    }]
                });
                $('#summarySNPStat').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_SNP_statistics.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'All',
                        title: 'All'
                    },{
                        field: 'genotype.Hom',
                        title: 'genotype.Hom'
                    },{
                        field: 'genotype.Het',
                        title: 'genotype.Het'
                    },{
                        field: 'novel',
                        title: 'novel'
                    },{
                        field: 'novel_proportion',
                        title: 'novel_proportion'
                    }]
                });
                $('#SNPHeadTable').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/' + $scope.samplePrefixes[0] + '_SNP.head_table.xls.json',
                    columns: [{
                        field: 'CHROM',
                        title: 'CHROM'
                    },{
                        field: 'POS',
                        title: 'POS'
                    },{
                        field: 'ID',
                        title: 'ID'
                    },{
                        field: 'REF',
                        title: 'REF'
                    },{
                        field: 'ALT',
                        title: 'ALT'
                    },{
                        field: 'QUAL',
                        title: 'QUAL'
                    },{
                        field: 'FILTER',
                        title: 'FILTER'
                    },{
                        field: 'GeneName',
                        title: 'GeneName'
                    },{
                        field: 'Func',
                        title: 'Func'
                    },{
                        field: 'GeneDetail',
                        title: 'GeneDetail'
                    },{
                        field: 'ExonicFunc',
                        title: 'ExonicFunc'
                    },{
                        field: 'AAChange',
                        title: 'AAChange'
                    },{
                        field: 'esp6500si_all',
                        title: 'esp6500si_all'
                    },{
                        field: '1000g2015aug_all',
                        title: '1000g2015aug_all'
                    },{
                        field: '1000g2015aug_eas',
                        title: '1000g2015aug_eas'
                    },{
                        field: 'snp138',
                        title: 'snp138'
                    },{
                        field: 'SIFT_score',
                        title: 'SIFT_score'
                    },{
                        field: 'Polyphen2_score',
                        title: 'Polyphen2_score'
                    },{
                        field: 'MutationTaster_score',
                        title: 'MutationTaster_score'
                    },{
                        field: 'FATHMM_score',
                        title: 'FATHMM_score'
                    },{
                        field: 'LR_score',
                        title: 'LR_score'
                    },{
                        field: 'CADD',
                        title: 'CADD'
                    },{
                        field: 'FORMAT',
                        title: 'FORMAT'
                    },{
                        field: 'SL003',
                        title: 'SL003'
                    }]
                });
                $('#summaryInDelVariantStat').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_InDel_variant_statistics.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'exonic',
                        title: 'exonic'
                    },{
                        field: 'intronic',
                        title: 'intronic'
                    },{
                        field: 'UTR3',
                        title: 'UTR3'
                    },{
                        field: 'UTR5',
                        title: 'UTR5'
                    },{
                        field: 'intergenic',
                        title: 'intergenic'
                    },{
                        field: 'ncRNA_exonic',
                        title: 'ncRNA_exonic'
                    },{
                        field: 'ncRNA_intronic',
                        title: 'ncRNA_intronic'
                    },{
                        field: 'upstream',
                        title: 'upstream'
                    },{
                        field: 'downstream',
                        title: 'downstream'
                    },{
                        field: 'splicing',
                        title: 'splicing'
                    },{
                        field: 'ncRNA_splicing',
                        title: 'ncRNA_splicing'
                    }]
                });
                $('#summaryInDelExonicStat').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_InDel_exonic_statistics.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'frameshift_deletion',
                        title: 'frameshift_deletion'
                    },{
                        field: 'frameshift_insertion',
                        title: 'frameshift_insertion'
                    },{
                        field: 'nonframeshift_deletion',
                        title: 'nonframeshift_deletion'
                    },{
                        field: 'nonframeshift_insertion',
                        title: 'nonframeshift_insertion'
                    },{
                        field: 'stopgain',
                        title: 'stopgain'
                    },{
                        field: 'stoploss',
                        title: 'stoploss'
                    },{
                        field: 'unknown',
                        title: 'unknown'
                    }]
                });
                $('#summaryInDelStat').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/summary_InDel_statistics.xls.json',
                    columns: [{
                        field: 'Sample',
                        title: 'Sample'
                    },{
                        field: 'All',
                        title: 'All'
                    },{
                        field: 'genotype.Hom',
                        title: 'genotype.Hom'
                    },{
                        field: 'genotype.Het',
                        title: 'genotype.Het'
                    },{
                        field: 'novel',
                        title: 'novel'
                    },{
                        field: 'novel_proportion',
                        title: 'novel_proportion'
                    }]
                });
                $('#InDelHeadTable').bootstrapTable({
                    url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/' + $scope.samplePrefixes[0] + '_InDel.head_table.xls.json',
                    columns: [{
                        field: 'CHROM',
                        title: 'CHROM'
                    },{
                        field: 'POS',
                        title: 'POS'
                    },{
                        field: 'ID',
                        title: 'ID'
                    },{
                        field: 'REF',
                        title: 'REF'
                    },{
                        field: 'ALT',
                        title: 'ALT'
                    },{
                        field: 'QUAL',
                        title: 'QUAL'
                    },{
                        field: 'FILTER',
                        title: 'FILTER'
                    },{
                        field: 'GeneName',
                        title: 'GeneName'
                    },{
                        field: 'Func',
                        title: 'Func'
                    },{
                        field: 'GeneDetail',
                        title: 'GeneDetail'
                    },{
                        field: 'ExonicFunc',
                        title: 'ExonicFunc'
                    },{
                        field: 'AAChange',
                        title: 'AAChange'
                    },{
                        field: 'esp6500si_all',
                        title: 'esp6500si_all'
                    },{
                        field: '1000g2015aug_all',
                        title: '1000g2015aug_all'
                    },{
                        field: '1000g2015aug_eas',
                        title: '1000g2015aug_eas'
                    },{
                        field: 'snp138',
                        title: 'snp138'
                    },{
                        field: 'SIFT_score',
                        title: 'SIFT_score'
                    },{
                        field: 'Polyphen2_score',
                        title: 'Polyphen2_score'
                    },{
                        field: 'MutationTaster_score',
                        title: 'MutationTaster_score'
                    },{
                        field: 'FATHMM_score',
                        title: 'FATHMM_score'
                    },{
                        field: 'LR_score',
                        title: 'LR_score'
                    },{
                        field: 'CADD',
                        title: 'CADD'
                    },{
                        field: 'FORMAT',
                        title: 'FORMAT'
                    },{
                        field: 'SL003',
                        title: 'SL003'
                    }]
                });

                navEvent();

                // $('#mytable').bootstrapTable({
                //     url: serverUrl + 'public/cardio/' + $scope.taskId + '/output/fig_table/detailedReport.xls.json',
                //     columns: [{
                //         field: 'Header1',
                //         title: 'Header1'
                //     }, {
                //         field: 'Header2',
                //         title: 'Header2'
                //     }]
                // });
            });

        }).
        error(function(data, status, headers, config) {
            console.log('login error!')
        });


    }

    function navEvent(){

        var aItems = $(".dropdown-menu a");
        for (var i = 0; i < aItems.length; i++) {
            var aItem = aItems.eq(i);
            //下拉菜单item点击
            aItem.click(function(e) {
                var li = $(this).parent().parent().parent(".dropdown");
                var children = li.children(".dropdown-toggle").eq(0);
                clearColor();
                children.addClass("headWord");

                var hrefValue = $(this).attr('href');
                $('html,body').animate({scrollTop: $(hrefValue).offset().top - 70},'slow');
                
                e.preventDefault();
            })
        }


        var navs = $("li.dropdown > a");
        function clearColor() {
            for (var i = 0; i < navs.length; i++) {
                var a = navs.eq(i);
                a.parent().removeClass("open");
                a.removeClass("a-hover");
                a.removeClass("headWord");
            }
        }


        var lis = $("li.dropdown");
        var currentIndex = 0;
        for (var i = 0; i < lis.length; i++) {
            var li = lis.eq(i);
            //鼠标移入
            li.mouseover(function(e) {
                var a = $(this).children("a").eq(0);
                if (a.hasClass("headWord")) {
                    a.removeClass("headWord");
                    currentIndex = i;
                } else {
                    currentIndex = -1;
                }
                //console.log(currentIndex);
                if($(this).children().size()>1){
                    //有下拉菜单
                    a.addClass("a-hover");
                    $(this).addClass("open");
                }
                a.click(function(e) {
                    clearColor();
                    $(this).addClass("headWord");

                    var hrefValue = $(this).attr('href');
                    $('html,body').animate({scrollTop: $(hrefValue).offset().top - 70},'slow');
                    
                    e.preventDefault();
                })

            })

            //鼠标移出
            li.mouseout(function(e) {
                var a = $(this).children("a").eq(0);
                if (i == currentIndex) {
                    a.addClass("headWord");
                }
                $(this).removeClass("open");
                a.removeClass("a-hover");
            });
        }

    }

    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }

    $scope.printMedicalReport = function() {
        window.print();
    }

    $scope.displayDetailedReport = function() {
        window.open('#/detailedReport', '_blank');
    }

});
