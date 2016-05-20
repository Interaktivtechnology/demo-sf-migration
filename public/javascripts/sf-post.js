$(function(){
  $(this).on('click', '#submitBtn', function(e){
    e.preventDefault();
    $('#output').val('loading...');
    $.ajax({
      url : "/users/save",
      method : "POST",
      data : {
        id1 : $('#id1').val(),
        pwd1 : $('#pwd1').val(),
        server1: $('#server1').val(),
        id2 : $('#id2').val(),
        pwd2 : $('#pwd2').val(),
        server2: $('#server2').val(),
      },
      success : function(result){
        $('#output').val(JSON.stringify(result, null, 4));

      }
    })
  })

  $(this).on('click', '#migrate', function(e){
    e.preventDefault();
    $('#output2').val('loading...');
    $.ajax({
      url : "/users/migrate",
      method : "POST",
      data : {
        id2 : $('#id2').val(),
        pwd2 : $('#pwd2').val(),
        server2: $('#server2').val(),
        data : $('#output').val()
      },
      success : function(result){
        $('#output2').val(JSON.stringify(result, null, 4));

      }
    })
  })
})
