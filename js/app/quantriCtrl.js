app.controller('quantriCtrl', function ($scope, $http) {
    // Khởi tạo
    $scope.students = [];
    $scope.isSuccess = true;
    $scope.message = "";
    $scope.student = {
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
            $scope.totalPage = Math.ceil($scope.students.length / 10);
            $scope.isLoading = false;
        })
        .catch(function (error) {
            console.log(error);
            $scope.isLoading = false;
        });

    // TODO
    // if (index == -1) {
    //     // them moi
    // } else {
    //     // cap nhat
    // }
    $scope.onDelete = function (id, index) {
        console.log(id);
        const deleteAPI = api + '/' + id;
        $scope.isLoading = true;
        $http.delete(deleteAPI)
            .then(function (response) {
                $scope.isLoading = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa thành công!',
                    // text: 'Quay lại trang chủ!',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
                $scope.students.splice(index, 1);
                // splice -> xóa trong $scope.students

                $("#modal_delete_" + id).modal('hide');
            })
            .catch(function (error) { })
    }

    $scope.onUpdate = function () {
        const id = $scope.student.id;
        const apiUpdate = api + "/" + id;

        $http.put(apiUpdate, $scope.student)
            .then(function (response) {
                $scope.isLoading = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công!',
                    // text: 'Vui lòng sử dụng username khác!',
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });

    }
    $scope.edit = function (index) {
        $scope.index = index;
        $scope.student = $scope.students[index];
    }


    $scope.onSubmitForm = function (event) {
        event.preventDefault(); //Phương thức preventDefault() của đối tượng event được sử dụng để ngăn chặn cách xử lý mặc định của trình duyệt khi xảy ra sự kiện. đồng thời ngăn cản trình duyệt chuyển tiếp người dùng tới trang đích của link liên kết.
        $http.get(api) // Gửi 1 request dạng GET lên API
            .then(function (response) {
                $scope.students = response.data;
                // $scope.totalPage = Math.ceil($scope.students.length / 10);
                var ig = true;
                $scope.students.forEach(st => {
                    if (st.username == $scope.student.username) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Username này đã tồn tại!',
                            text: 'Vui lòng sử dụng username khác!',
                            showConfirmButton: false,
                            closeOnClickOutside: false,
                            allowOutsideClick: false,
                            timer: 1600
                        });
                        ig = false;
                    };
                });
                if (ig == true) {
                    $scope.isLoading = true;
                    // Gửi request dạng POST kèm data lên API
                    $http.post(api, $scope.student)
                        .then(function (response) {
                            // Tắt loading
                            $scope.isLoading = false;

                            // Thông báo
                            Swal.fire({
                                icon: 'success',
                                title: 'Lưu thành công!',
                                // text: 'Quay lại trang chủ!',
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600
                            });

                            // Thêm vào bảng
                            $scope.students.push(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                            $scope.isLoading = false;
                            $scope.message = "Lưu thất bại";
                            $scope.isSuccess = false;
                        });
                }
                $scope.isLoading = false;
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
            });
    }


});