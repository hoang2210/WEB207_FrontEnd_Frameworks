app.controller('loginCtrl', function ($scope, $http, $rootScope) {
    // Khởi tạo
    $scope.login = function () {
        $scope.students = [];
        $scope.studentR = {
            id: "",
            username: "",
            password: "",
            fullname: "",
            email: "",
            gender: true,
            birthday: "",
            schoolfee: "",
            marks: ""
        };

        $scope.isLoading = false;
        const api = 'https://6215e0317428a1d2a352ea94.mockapi.io/students/student';

        $scope.isLoading = true;

        $http.get(api) // Gửi 1 request dạng GET lên API
            .then(function (response) {
                $scope.students = response.data;
                // $scope.totalPage = Math.ceil($scope.students.length / 10);
                var ig = true;
                $scope.students.forEach(st => {
                    if (st.username == $scope.username) {
                        if (st.password == $scope.password) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Đăng nhập thành công!',
                                text: 'Quay lại trang chủ!',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600
                            });
                            window.location.href = "#!index";
                            $rootScope.indexStudent = st.index;
                            $rootScope.student = st;
                            ig = false;
                        };
                    };

                });
                if (ig == true) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Đăng nhập thất bại!',
                        text: 'Nhập lại!'
                    });
                }

                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
        // var ig = true;
        // $rootScope.students.forEach(st => {
        //     if (st.username == $scope.username) {
        //         if (st.password == $scope.password) {
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Đăng nhập thành công!',
        //                 text: 'Quay lại trang chủ!',
        //                 showConfirmButton: false,
        //                 closeOnClickOutside: false,
        //                 allowOutsideClick: false,
        //                 timer: 1600
        //             });
        //             $rootScope.indexStudent = st.index;
        //             $rootScope.student = st;
        //             window.location.href = "#!index";


        //             ig = false;
        //             return;
        //         };
        //     };
        // });
        // if (ig == true) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Đăng nhập thất bại!',
        //         text: 'Nhập lại!'
        //     });
        // }

        // $scope.onSubmitForm = function (event) {
        //     event.preventDefault();

        //     $scope.isLoading = true;
        //     // Gửi request dạng POST kèm data lên API
        //     $http.post(api, $scope.studentR)
        //         .then(function (response) {
        //             // Tắt loading
        //             $scope.isLoading = false;

        //             // Thông báo
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Đăng nhập thành công!',
        //                 text: 'Quay lại trang chủ!',
        //                 showConfirmButton: false,
        //                 closeOnClickOutside: false,
        //                 allowOutsideClick: false,
        //                 timer: 1600
        //             });
        //             window.location.href = "#!login";

        //             // Thêm vào bảng
        //             $scope.students.push(response.data);
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //             $scope.isLoading = false;
        //             $scope.message = "Thêm mới thất bại";
        //             $scope.isSuccess = false;
        //         });
        // }

        // $scope.onDelete = function (id, index) {
        //     console.log(id);
        //     const deleteAPI = api + '/' + id;
        //     $scope.isLoading = true;
        //     $http.delete(deleteAPI)
        //         .then(function (response) {
        //             $scope.isLoading = false;
        //             console.log("Xóa thành công");
        //             $scope.students.splice(index, 1);
        //             // splice -> xóa trong $scope.students

        //             $("#modal_delete_" + id).modal('hide');
        //         })
        //         .catch(function (error) { })
        // }
    };
});