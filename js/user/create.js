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
            alert("User added successfully!");
            
        },
        error:function(xhr, status, error) {
            console.log("Error: " + xhr.status + ": " + xhr.statusText,error);
        }
    })
    
});
// $(document).ready(function() {
//     $.ajax({
//         url:"http://localhost:8080/users",
//         method:"GET",
//         success:function(result) {
//             console.log(result);
        
//         },
//         error:function(xhr, status, error) {
//             console.log("Error: " + xhr.status + ": " + xhr.statusText,error);
//         }
//     })
// });