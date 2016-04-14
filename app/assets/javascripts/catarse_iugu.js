$(window).bind("load", function() {
  Iugu.setAccountID("671e7c16-950b-4de4-9b29-2f441d66cd2c");
  Iugu.setTestMode(true);
  Iugu.setup();
});

jQuery(function($) {
  $('#catarse_iugu_form').submit(function submitIuguForm(evt) {
    var form = $(this);
    Iugu.createPaymentToken(this, tokenResponseHandler);
    return false;

    function tokenResponseHandler(data) {
      if (data.errors) {
        // console.log(data.errors);
        alert("Erro salvando cartão: " + JSON.stringify(data.errors));
      } else {
        $("#token").val( data.id );
        form.get(0).submit();
      }
    }
  });
});
