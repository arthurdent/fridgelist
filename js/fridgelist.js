$(document).ready(function(){
	/* ===== Globals ===== */

	editmode = false;

	/* Save HTML5 Local Storage */
	function saveLocal() {
		var cells = new Object();

		$('#grocery-list tr').each(function(i,data) {
			var checked = !$(data).children('.checkbox-cell').children('a').children('i').hasClass('check-empty');
			var listitem = $.trim($(data).children('.grocery-cell').children('.grocery-name').text());

			cells[listitem] = checked;

		});

		saveString = JSON.stringify(cells);

		localStorage.setItem('cells', saveString);

	}

	/* Restore HTML5 Local Storage */
	function restoreLocal() {

		cells = JSON.parse(localStorage.getItem('cells'));

		for (var item in cells) {
			if (cells.hasOwnProperty(item)) {
				addItem(cells[item], item);
			}
		}

	}

	/* Escape HTML Strings */
	function escapeHTML(html) {
		return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	}

	/* Add an item to the list */
	function addItem(checkedBool, listitem) {

		var checked = "icon-check";
		var gcchecked = "gc-checked";

		if (checkedBool == false) {
			checked = "check-empty icon-check-empty";
			gcchecked = "";
		}

		$('#grocery-list').prepend('<tr class="grocery-row"><td class="checkbox-cell"><a href="#" class="btn cb-button"><i class="icon-large check ' + checked + '"></i></a></td><td class="grocery-cell ' + gcchecked + '"><div class="grocery-name">' + listitem + '</div></td></tr>');

	}

	/* Delete an item from the list */
	function removeItem(item) {
		item.remove();
	}

	/* Enter edit mode */
	function editMode() {

		$('#list-button').removeClass('btn-info');
		$('#list-button').addClass('btn-warning');
		$('#list-button').children('i').removeClass('icon-th-list');
		$('#list-button').children('i').addClass('icon-chevron-left');

		$('.check').removeClass('icon-check');
		$('.check').addClass('icon-trash');
		$('.check-empty').removeClass('icon-check-empty');

		$('#add-item-input').attr("disabled", true);
		$('#add-item-input').val('Return to list mode...');

	}

	/* Enter Normal Mode */
	function normalMode() {

		$('#list-button').addClass('btn-info');
		$('#list-button').removeClass('btn-warning');
		$('#list-button').children('i').addClass('icon-th-list');
		$('#list-button').children('i').removeClass('icon-chevron-left');

		$('.check').addClass('icon-check');
		$('.check').removeClass('icon-trash');
		$('.check-empty').addClass('icon-check-empty');

		$('#add-item-input').attr("disabled", false);
		$('#add-item-input').val('');

	}


	// Normal vs Edit mode.

	$('#list-button').on('click',function(){

		if (!editmode) {
			editMode();
		} else {
			normalMode();
		}

		editmode = !editmode;

	});

	// Submit item
	$('#add-item-form').submit(function() {

		addItem(false, escapeHTML($('#add-item-input').val()));

		//$('#add-item-input').val('');
		$('input[id=add-item-input]').val('');

		saveLocal(); // Save to HTML5 local storage.

		return false; // Disable refresh

	});


	// Check, uncheck, delete
	$(document).on('click', '.grocery-row', function() {
		checkbox = $(this).children('.checkbox-cell').children('.cb-button').children('i');
		listitem = $(this).children('.grocery-cell');

		if (checkbox.hasClass('icon-trash')) {
			removeItem($(this));
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

	restoreLocal();

});
