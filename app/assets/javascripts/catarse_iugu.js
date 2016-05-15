$.getScript( "https://js.iugu.com/v2", function( data, textStatus, jqxhr ) {
  Iugu.setAccountID(IUGU_ACCOUNT_ID);
  Iugu.setTestMode(true);
  Iugu.setup();
  $('#catarse-iugu-loader').addClass('hidden');
  $('#catarse_iugu_form').removeClass('hidden');
  $('#catarse_iugu_form_slip').removeClass('hidden');
});


jQuery(function($) {
  $('#catarse_iugu_form').submit(function submitIuguForm(evt) {
    var form = $(this);
    Iugu.createPaymentToken(this, tokenResponseHandler);
    return false;

    function tokenResponseHandler(data) {
      if (data.errors) {
        showErrors(data.errors);
      } else {
        $("#token").val( data.id );
        form.get(0).submit();
      }
    }

    function showErrors(errors) {
      if (errors.number) {
        $('[data-iugu=number]').addClass('error');
      }

      if (errors.verification_value) {
        $('[data-iugu=verification_value]').addClass('error');
      }

      if (errors.expiration) {
        $('[data-iugu=expiration]').addClass('error');
      }

      if (errors.first_name || errors.last_name) {
        $('[data-iugu=full_name]').addClass('error');
      }

      $('#iugu-error-messages').html(
        Object.keys(errors)
          .map(function toPair(key) {
            if (!Array.isArray(errors[key])) {
              return { key: key, errors: [errors[key]] };
            }
            return { key: key, errors: errors[key] };
          })
          .map(errorMessageFor)
          .map(toListItem)
      );
    }

    function errorMessageFor(error) {
      var requiredErrors = {
        first_name: 'Você deve preencher seu primeiro nome',
        last_name: 'Você deve preencher seu último nome',
        expiration: 'Você deve preencher a data de expiração do cartão com uma data futura',
        verification_value: 'Você deve preencher o código de validação do cartão',
        number: 'Você deve preencher o número do cartão'
      };

      if (error.errors[0] === 'is_invalid') {
        return requiredErrors[error.key];
      }

      switch (error.key) {
        case 'number':
          if (error.errors.filter(isEqual("is not a valid credit card number")).length) {
            return 'O número do cartão não é válido';
          }
          break;

        default:
          throw new Error('Unrecognized error: ', JSON.stringify(error));
      }
    }

    function toListItem(content) {
      return '<li>' + content + '</li>';
    }

    function isEqual(target) {
      return function delayedIsEqual(element) {
        return element == target;
      }
    }
  });
});
