$( document ).ready(function() {




    $('.js-phone').mask('(999) 999-99-99');

    $('[type="checkbox"]').on('click', function() {
        if ($(this).prop("checked")) {
            $(this).closest('form').find('[type="submit"]').attr('disabled', false);
        } else {
            $(this).closest('form').find('[type="submit"]').attr('disabled', true);
        }
    });




    // Отправляет данные из формы на сервер и получает ответ
    $('form').on('submit', function(event) {

        event.preventDefault();

        var form = $(this),
            button = form.find('[type="submit"]'),
            // answer = form.find('#answer'),
            loader = form.find('.form-loader');
        // console.log($(this));

        $.ajax({
            url: 'handler.php',
            type: 'POST',
            scriptCharset: "utf-8",
            data: form.serialize(),
            beforeSend: function() {
                // console.log('ajax_beforeSend');
                // answer.empty();
                button.attr('disabled', true).css('margin-bottom', '20px');
                loader.fadeIn();
            },
            success: function(result) {
                result = JSON.parse(result);
                var linkDownload = document.createElement('a');
                linkDownload.setAttribute('href', result.file);
                linkDownload.setAttribute('download','download');
                linkDownload.click();
                loader.fadeOut(300, function() {
                    // answer.text(result);
                });
                form.find('input').not('[name="clientPhoneCode"], [type="hidden"]').val('');
                button.attr('disabled', false);
            },
            error: function() {
                console.log('ajax_error');
                loader.fadeOut(300, function() {
                    // answer.text('Произошла ошибка! Попробуйте позже.');
                });
                button.attr('disabled', false);
            }
        });

    });

});
