$(window).bind("load", function() {
  Iugu.setAccountID(IUGU_ACCOUNT_ID);
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
        alert("Erro salvando cartão: " + JSON.stringify(data.errors));
      } else {
        $("#token").val( data.id );
        form.get(0).submit();
      }
    }
  });
});
