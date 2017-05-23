var flan = flan || {};

$(document).ready(function () {
	$('#flan-website-form #submit-button').on('click', function(e){
		e.preventDefault();

		flan.submitForm(e);
	});

	$('#flan-website-form input').on('change', function(e) {
		flan.validateFormInputs(e.currentTarget);
	});

	$('#flan-website-form input').on('focus', function(e) {
		flan.addFormLabelAnimation(e.currentTarget);
	});

	$('#flan-website-form input').on('blur', function(e) {
		flan.removeFormLabelAnimation(e.currentTarget);
	});
});

flan.submitForm = function(event) {
	var formData = flan.getFormInputs(event.currentTarget.form);

	if(formData) {
		var googleForm = $(window).jqGoogleForms({"formKey": "1FAIpQLSe0ik5Dt8V1KC1lvffrT8yRthy-K2mzPIXCscAQEyS9gNiyKg"});

		googleForm.sendFormData(formData);
	}

};

flan.getFormInputs = function(form) {

	var formData = {};
	var validationError = false;

	for (var i = 0; i < form.length; i++) {

		if(form[i].name) {
			if(flan.validateFormInputs(form[i])) {
				formData[form[i].name] = form[i].value;
			} else {
				if(!validationError) {
					$(form[i]).focus();
				}
				validationError = true;
			}
		}
	}

	if(!validationError) {
		return formData;
	} else {
		console.log('missing stuff');
		return;
	}
};

flan.validateFormInputs = function(input) {
	$(input).removeClass('invalid');
	$(input).removeAttr('aria-invalid');
	var errorElement = $('#' + $(input).attr('aria-describedby'));
	$(errorElement).addClass('hidden');

	if(input.value <= 0) {
		flan.applyInvalidToInput(input, errorElement);
		return false;

	} else if(input.type === 'email') {
		if(!input.value.includes('@')) {
			flan.applyInvalidToInput(input, errorElement);
			return false;

		} else {
			return true;
		}

	} else if (input.type === 'text') {
		if(input.value.match(/\d+/g)) {
			flan.applyInvalidToInput(input, errorElement);
			return false;

		} else {
			return true;
		}

	}
};

flan.applyInvalidToInput = function(input, errorElement) {
	$(input).addClass('invalid');
	$(input).attr('aria-invalid', 'true');
	$(errorElement).removeClass('hidden');
};

flan.addFormLabelAnimation = function(input) {
	var placeholder = $('#placeholder-' + $(input).attr('id'));

	$(placeholder).addClass('input-selected');
};

flan.removeFormLabelAnimation = function(input) {
	var placeholder = $('#placeholder-' + $(input).attr('id'));

	if(!input.value) {
		$(placeholder).removeClass('input-selected');
	}
};











