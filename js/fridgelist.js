$(document).ready(function(){
	/* ===== Globals ===== */

	editor_menu = false;
	normalMode();
	restoreLocal();

	/* Save HTML5 Local Storage */
	function saveLocal() {
		var cells = new Object();

		$('#item-list .item-container').each(function(i,data) {

			var checked = !$(data).children('.item-button').children('a').children('i').hasClass('check-empty');
			var listitem = $.trim($( this ).children('.item-name').text());

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
				restoreItem(cells[item], item);
			}
		}
	}
	
	/* Restore item */
	function restoreItem(checkedBool, listitem) {

		checked = checkedBool ? "icon-check" : "check-empty icon-check-empty";
		crossthru = checkedBool ? "gc-checked" : "";

		$('#item-list').append('<div class="item-container ' + crossthru + '"><div class="item-button"><a href="#" class="btn cb-button"><i class="icon-large check ' + checked + '"></i></a></div><span class="item-name">' + listitem + '</span>');

	}

	/* Escape HTML Strings */
	function escapeHTML(html) {
		return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	}
	
	/* Normal vs Edit mode. */
	$('#list-button').on('click', function(){

		editor_menu = !editor_menu ? editMode() : normalMode();

	});


	/* Add an item to the list */
	function addItem(item_name) {

		$('#item-list').prepend('<div class="item-container"><div class="item-button"><a href="#" class="btn cb-button"><i class="icon-large check check-empty icon-check-empty"></i></a></div><span class="item-name">' + item_name + '</span>');

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

		return true;

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

		return false;

	}

	// Submit item
	$('#add-item-form').submit(function() {

		if ($('#add-item-input').val() == '') {
			return false;
		}

		addItem(escapeHTML($('#add-item-input').val()));

		// Clear input box
		$('input[id=add-item-input]').val("");

		// Hack to fix firefox for android
		$('#add-item-input').blur();
		$('#add-item-input').focus();

		saveLocal(); // Save to HTML5 local storage.

		return false; // Disable refresh

	});


	// Check, uncheck, delete
	$(document).on('click', '.item-container', function() {

		checkbox = $(this).children('.item-button').children('.cb-button').children('i');

		if (checkbox.hasClass('icon-trash')) {
			removeItem($(this));
		} else {
			if (checkbox.hasClass('check-empty')) {
				// Check
				checkbox.removeClass('icon-check-empty');
				checkbox.addClass('icon-check');
				checkbox.removeClass('check-empty');
				$(this).addClass('gc-checked');
			} else {
				// Uncheck
				checkbox.addClass('check-empty');
				checkbox.removeClass('icon-check');
				checkbox.addClass('icon-check-empty');
				$(this).removeClass('gc-checked');
			}
		}

		saveLocal(); // Save to HTML5 local storage.

	});

});
