$(document).ready(function() {
	$(".main-tabs").click(function() {
		var tabid = $(this).attr('id');
		tabid = tabid.substring(4);
		$(".main-tabs").removeClass('active');
		$(".main-panes").removeClass('active');
		$("#tab-" + tabid).addClass('active');
		$("#pane-" + tabid).addClass('active');
	});
});