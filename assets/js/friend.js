function toggleFriend(friendBtn) {
  console.log(friendBtn);
  $(friendBtn).click(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: $(friendBtn).attr('href'),
      success: function (data) {
        console.log(data.deleted);
        if (data.deleted) {
          $(friendBtn).html('Add Friend');
        } else {
          $(friendBtn).html('Remove Friend');
        }
      },
      error: function (error) {
        console.log(error.responseText);
      },
    });
  });
}

// toggleFriend($('.btn'));
