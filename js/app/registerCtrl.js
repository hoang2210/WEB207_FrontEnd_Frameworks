app.controller('registerCtrl', function ($scope, $http) {
    // Khởi tạo
    $scope.students = [];
    $scope.isSuccess = true;
    $scope.message = "";
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

    $scope.onSubmitForm = function (event) {
        event.preventDefault();

        $scope.isLoading = true;
        // Gửi request dạng POST kèm data lên API
        $http.post(api, $scope.studentR)
            .then(function (response) {
                // Tắt loading
                $scope.isLoading = false;

                // Thông báo
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng ký thành công!',
                    text: 'Quay lại trang đăng nhập!',      
                    showConfirmButton: false,
                    closeOnClickOutside: false,
                    allowOutsideClick: false,
                    timer: 1600
                });
                window.location.href = "#!login";

                // Thêm vào bảng
                $scope.students.push(response.data);
            })
            .catch(function (error) {
                console.log(error);
                $scope.isLoading = false;
                $scope.message = "Thêm mới thất bại";
                $scope.isSuccess = false;
            });
    }

    $scope.onDelete = function (id, index) {
        console.log(id);
        const deleteAPI = api + '/' + id;
        $scope.isLoading = true;
        $http.delete(deleteAPI)
            .then(function (response) {
                $scope.isLoading = false;
                console.log("Xóa thành công");
                $scope.students.splice(index, 1);
                // splice -> xóa trong $scope.students

                $("#modal_delete_" + id).modal('hide');
            })
            .catch(function (error) { })
    }
});