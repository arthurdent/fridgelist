$(document).ready(function(){

	var editstate = false;

  $('.list-button').on('click',function(){

		if (!editstate) {
			// Normal Mode
			$(this).removeClass('btn-info');
			$(this).addClass('btn-warning');
			$(this).children('i').removeClass('icon-th-list');
			$(this).children('i').addClass('icon-chevron-left');
			$('.check').removeClass('icon-check');
			$('.check-empty').removeClass('icon-check-empty');
			$('.check').addClass('icon-trash');
			$('.check-empty').addClass('icon-trash');
		} else {
			// Edit Mode
			$(this).removeClass('btn-warning');
			$(this).addClass('btn-info');
			$(this).children('i').removeClass('icon-chevron-left');
			$(this).children('i').addClass('icon-th-list');
			$('.check').removeClass('icon-trash');
			$('.check-empty').removeClass('icon-trash');
			$('.check').addClass('icon-check');
			$('.check-empty').addClass('icon-check-empty');
		}

		editstate = !editstate;

  });

	$('.grocery-row').on('click', function() {
		checkbox = $(this).children('.checkbox-cell').children('.cb-button').children('i');

		if (checkbox.hasClass('icon-trash')) {
			$(this).remove();
		} else {
			if (checkbox.hasClass('check-empty')) {
				// Check
				checkbox.removeClass('icon-check-empty');
				checkbox.addClass('icon-check');
				checkbox.removeClass('check-empty');
				$(this).children('.grocery-cell').addClass('gc-checked');
			} else {
				// Uncheck
				checkbox.addClass('check-empty');
				checkbox.removeClass('icon-check');
				checkbox.addClass('icon-check-empty');
				$(this).children('.grocery-cell').removeClass('gc-checked');
			}

		}
	});

	$('#add-item-form').submit(function() {
		$('#grocery-list').append('<tr class="grocery-row"><td class="checkbox-cell"><a href="#" class="btn cb-button"><i class="icon-large check check-empty icon-check-empty"></i></a></td><td class="grocery-cell"><div class="grocery-name">' + escapeHTML($(this).children('#add-item-input').val()) + '</div></td></tr>');				

		$(this).children('#add-item-input').val('');
	});

	function escapeHTML(html) {
		return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	}
});
