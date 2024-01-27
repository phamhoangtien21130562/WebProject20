function queryToJson(queryString) {
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    });
    return JSON.stringify(result);
}
fetch('http://localhost:8080/users', {
    method: 'GET',
    credentials: 'include', // Chắc chắn sử dụng include để bao gồm cookie
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

$("#add-user").submit(function(e) {
    e.preventDefault();
    $.ajax({
        url:"http://localhost:8080/users",
        method:"POST",
        data:queryToJson($(this).serialize()),
        
        success:function(result) {
            alert("Thêm người dùng thành công!");
            window.location.href = "http://127.0.0.1:5500/admin-user.html" ;
           
        },
        error:function(xhr, status, error) {
            console.log("Error: " + xhr.status + ": " + xhr.statusText,error);
        }
    })
    
});
$(document).ready(function() {
    // Lấy giá trị của tham số "id" từ URL
    var userId = getParameterByName('id');

    // Gọi API hoặc thực hiện các hành động cần thiết để lấy thông tin người dùng
    // Ví dụ: Gọi API để lấy thông tin người dùng theo userId và sau đó hiển thị thông tin
});

// Hàm để trích xuất giá trị của tham số từ URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function() {
    // Gọi API để lấy danh sách người dùng
    $.ajax({
        url: "http://localhost:8080/users",
        method: "GET",
        success: function(result) {
            if (result.length > 0) {
                // Hiển thị danh sách người dùng
                displayUserList(result);
            } else {
                console.log("Không có người dùng.");
            }
        },
        error: function(xhr, status, error) {
            console.log("Error: " + xhr.status + ": " + xhr.statusText, error);
        }
    });
});

function displayUserList(userList) {
    // Hiển thị danh sách người dùng trên trang HTML
    console.log(userList);

    // Ví dụ: Hiển thị thông tin trong một phần tử có id là "user-info"
    var userContainer = $("#admin-user");

    // Xóa nội dung cũ của userContainer
    userContainer.html("");

    // Lặp qua danh sách người dùng và hiển thị thông tin
    userList.forEach(function(userData) {
        userContainer.append(`
            <div class="user-item">
                <p>ID: ${userData.id}</p>
                <p>Username: ${userData.username}</p>
                <p>Email: ${userData.email}</p>
                <!-- Thêm các thông tin khác -->
            </div>
        `);
    });
}

