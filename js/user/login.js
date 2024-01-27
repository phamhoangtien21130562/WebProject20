document.addEventListener("DOMContentLoaded", function () {
    function submitLoginForm(event) {
        event.preventDefault();
        var usernameInput = document.getElementById("exampleInputEmail1");
        var passwordInput = document.getElementById("exampleInputPassword1");

        var username = usernameInput.value;
        var password = passwordInput.value;

        // Gửi thông tin đăng nhập đến server
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/LoginServlet", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        alert("Đăng nhập thành công!");

                        // Thay đổi nội dung của nút đăng nhập thành tên người dùng
                        var loginButton = document.getElementById("login-button");
                        if (loginButton) {
                            loginButton.innerHTML = response.username;
                        }

                        // Các hành động khác sau khi đăng nhập thành công
                    } else {
                        alert("Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập và mật khẩu của bạn.");
                    }
                } else {
                    alert("Đã xảy ra lỗi trong quá trình xử lý yêu cầu.");
                }
            }
        };

        // Gửi dữ liệu đăng nhập dưới dạng x-www-form-urlencoded
        var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
        xhr.send(data);
    }

    // Bắt sự kiện submit cho form
    var loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", submitLoginForm);
});
