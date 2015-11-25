app.controller('ContactController', function($scope, $rootScope, $http, $cookies, $location, $window) {

    init();

    function init() {
        if (!$cookies.token) $location.url('/');
        $rootScope.bodyClass = 'admin';
    }

    $.when(
        $.getScript("js/shim.js"),
        $.getScript("js/jszip.js"),
        $.getScript("js/xlsx.js"),
        $.getScript("js/ods.js"),
        $.Deferred(function(deferred) {
            $(deferred.resolve);
        })
    ).done(function() {

        //place your code here, the scripts are all loaded



        $(function() {

            var X = XLSX;
            var XW = {
                /* worker message */
                msg: 'xlsx',
                /* worker scripts */
                rABS: 'js/xlsxworker2.js',
                norABS: 'js/xlsxworker1.js',
                noxfer: 'js/xlsxworker.js'
            };

            var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";


            var use_worker = typeof Worker !== 'undefined';


            var transferable = use_worker;


            var wtf_mode = false;

            function fixdata(data) {
                var o = "",
                    l = 0,
                    w = 10240;
                for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            }

            function ab2str(data) {
                var o = "",
                    l = 0,
                    w = 10240;
                for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
                return o;
            }

            function s2ab(s) {
                var b = new ArrayBuffer(s.length * 2),
                    v = new Uint16Array(b);
                for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
                return [v, b];
            }

            function xw_noxfer(data, cb) {
                var worker = new Worker(XW.noxfer);
                worker.onmessage = function(e) {
                    switch (e.data.t) {
                        case 'ready':
                            break;
                        case 'e':
                            console.error(e.data.d);
                            break;
                        case XW.msg:
                            cb(JSON.parse(e.data.d));
                            break;
                    }
                };
                var arr = rABS ? data : btoa(fixdata(data));
                worker.postMessage({
                    d: arr,
                    b: rABS
                });
            }

            function xw_xfer(data, cb) {
                var worker = new Worker(rABS ? XW.rABS : XW.norABS);
                worker.onmessage = function(e) {
                    switch (e.data.t) {
                        case 'ready':
                            break;
                        case 'e':
                            console.error(e.data.d);
                            break;
                        default:
                            xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
                            console.log("done");
                            cb(JSON.parse(xx));
                            break;
                    }
                };
                if (rABS) {
                    var val = s2ab(data);
                    worker.postMessage(val[1], [val[1]]);
                } else {
                    worker.postMessage(data, [data]);
                }
            }

            function xw(data, cb) {
                //transferable = document.getElementsByName("xferable")[0].checked;
                if (transferable) xw_xfer(data, cb);
                else xw_noxfer(data, cb);
            }

            function get_radio_value(radioName) {
                var radios = document.getElementsByName(radioName);
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked || radios.length === 1) {
                        return radios[i].value;
                    }
                }
            }

            function to_json(workbook) {
                var result = {};
                workbook.SheetNames.forEach(function(sheetName) {
                    var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (roa.length > 0) {
                        result[sheetName] = roa;
                    }
                });
                return result;
            }

            function to_csv(workbook) {
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                    if (csv.length > 0) {
                        result.push("SHEET: " + sheetName);
                        result.push("");
                        result.push(csv);
                    }
                });
                return result.join("\n");
            }

            function to_formulae(workbook) {
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
                    if (formulae.length > 0) {
                        result.push("SHEET: " + sheetName);
                        result.push("");
                        result.push(formulae.join("\n"));
                    }
                });
                return result.join("\n");
            }



            function process_wb(wb) {
                var output = "";
                var format = "json"
                switch (format) {
                    case "json":
                        output = JSON.stringify(to_json(wb), 2, 2);
                        break;
                    case "form":
                        output = to_formulae(wb);
                        break;
                    default:
                        output = to_csv(wb);
                }

                if (typeof console !== 'undefined') console.log("output: " + output);
                //$('#xslxContainer').html(output);

                // $rootScope.contactWB = $.parseJSON(output);
                $window.sessionStorage.contactWB = output;
                var contactWB = JSON.parse($window.sessionStorage.contactWB);

                $('#contactMessage').hide();
                $('#contactTable').show().bootstrapTable({
                    columns: [{
                        field: '样品编号',
                        title: '样品编号'
                    }, {
                        field: '姓名',
                        title: '姓名'
                    }, {
                        field: '性别',
                        title: '性别'
                    }, {
                        field: '年龄',
                        title: '年龄'
                    }, {
                        field: '样品类型',
                        title: '样品类型'
                    }, {
                        field: '送检医院',
                        title: '送检医院'
                    }, {
                        field: '送检医生',
                        title: '送检医生'
                    }, {
                        field: '收样日期',
                        title: '收样日期'
                    }, {
                        field: '临床表现',
                        title: '临床表现'
                    }, {
                        field: '家族史',
                        title: '家族史'
                    }, {
                        field: '检测产品编号',
                        title: '检测产品编号'
                    }, {
                        field: '检测方法',
                        title: '检测方法'
                    }, {
                        field: '测序文件',
                        title: '测序文件'
                    }],
                    data: contactWB['Sheet1']
                });
            }

            var drop = document.getElementById('xslxContainer');

            function handleDrop(e) {
                e.stopPropagation();
                e.preventDefault();
                //rABS = document.getElementsByName("userabs")[0].checked;
                //use_worker = document.getElementsByName("useworker")[0].checked;
                var files = e.dataTransfer.files;
                var f = files[0]; {
                    var reader = new FileReader();
                    var name = f.name;
                    reader.onload = function(e) {
                        if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
                        var data = e.target.result;
                        if (use_worker) {
                            xw(data, process_wb);
                        } else {
                            var wb;
                            if (rABS) {
                                wb = X.read(data, {
                                    type: 'binary'
                                });
                            } else {
                                var arr = fixdata(data);
                                wb = X.read(btoa(arr), {
                                    type: 'base64'
                                });
                            }
                            process_wb(wb);
                        }
                    };
                    if (rABS) reader.readAsBinaryString(f);
                    else reader.readAsArrayBuffer(f);
                }
            }

            function handleDragover(e) {
                e.stopPropagation();
                e.preventDefault();
                e.dataTransfer.dropEffect = 'copy';
            }

            if (drop.addEventListener) {
                drop.addEventListener('dragenter', handleDragover, false);
                drop.addEventListener('dragover', handleDragover, false);
                drop.addEventListener('drop', handleDrop, false);
            }


        });

    });

    $scope.nextPage = function() {
        $location.url('/parameter');
    }

    $scope.logout = function() {
        $cookies.token = undefined;
        $location.url('/');
    }
});