
    
;(function($) {
    "use strict";

    let form = document.getElementById('contactForm');
    form.addEventListener("submit", function(event){
        if (grecaptcha.getResponse() === '') {                            
        event.preventDefault();
            alert('Por favor, completa el recaptcha');
        }
    }
    , false);

    
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            debug: true,
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    required: true,
                    minlength: 6
                },
                message: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: "Por favor, ingresa tu nombre.",
                },
                email: {
                    required: "Por favor, ingresa tu email."
                },
                subject: {
                    required: "Por favor, ingresa el asunto"
                },
                message: {
                    required: "Por favor, ingresa tu mensaje",
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"contact_form.php",
                    success: function() {
                        $('#contactForm :input').val('');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                        })
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                        })
                    }
                })
            }
        })
    })
        
})(jQuery)
