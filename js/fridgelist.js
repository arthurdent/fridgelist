// Save everything.

// Save data to HTML5 Local Storage
function saveLocal() {
	var cells = new Object();

	$('#grocery-list tr').each(function(i,data) {
		var checked = !$(data).children('.checkbox-cell').children('a').children('i').hasClass('check-empty');
		var listitem = $.trim($(data).children('.grocery-cell').children('.grocery-name').text());

		cells[listitem] = checked;

	});
	
	saveString = JSON.stringify(cells);

	localStorage.setItem('cells', saveString);

	//console.log(saveString);
}

// Restore HTML5 Local Storage
function restoreLocal() {

	cells = JSON.parse(localStorage.getItem('cells'));

	for (var item in cells) {
		if (cells.hasOwnProperty(item)) {
			addItem(cells[item], item);
			//console.log(item + " -> " + cells[item]);
		}
	}

}

// Escape HTML strings
function escapeHTML(html) {
	return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function addItem(checkedBool, listitem) {

		var checked = "icon-check";
		var gcchecked = "gc-checked";

		if (checkedBool == false) {
			checked = "check-empty icon-check-empty";
			gcchecked = "";
		}

		$('#grocery-list').append('<tr class="grocery-row"><td class="checkbox-cell"><a href="#" class="btn cb-button"><i class="icon-large check ' + checked + '"></i></a></td><td class="grocery-cell ' + gcchecked + '"><div class="grocery-name">' + listitem + '</div></td></tr>');


}

$(document).ready(function(){

	restoreLocal();

	// Normal vs Edit mode.
	var editstate = false;
  $('.list-button').on('click',function(){

		if (!editstate) {
			// Edit Mode
			$(this).removeClass('btn-info');
			$(this).addClass('btn-warning');
			$(this).children('i').removeClass('icon-th-list');
			$(this).children('i').addClass('icon-chevron-left');
			$('.check').removeClass('icon-check');
			$('.check-empty').removeClass('icon-check-empty');
			$('.check').addClass('icon-trash');
			$('.check-empty').addClass('icon-trash');
			$('#add-item-input').attr("disabled", true);
			$('#add-item-input').val('Return to list mode...');
		} else {
			// Normal Mode
			$(this).removeClass('btn-warning');
			$(this).addClass('btn-info');
			$(this).children('i').removeClass('icon-chevron-left');
			$(this).children('i').addClass('icon-th-list');
			$('.check').removeClass('icon-trash');
			$('.check-empty').removeClass('icon-trash');
			$('.check').addClass('icon-check');
			$('.check-empty').addClass('icon-check-empty');
			$('#add-item-input').attr("disabled", false);
			$('#add-item-input').val('');
		}

		editstate = !editstate;

  });

	// Submit item
	$('#add-item-form').submit(function() {

		addItem(false, escapeHTML($(this).children('#add-item-input').val()));

		$(this).children('#add-item-input').val('');
		
		saveLocal(); // Save to HTML5 local storage.

		return false; // Disable refresh

	});

});

// Check, uncheck, delete
$(document).on('click', '.grocery-row', function() {
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
	saveLocal(); // Save to HTML5 local storage.

});
