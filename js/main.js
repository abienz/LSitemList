var Main = {
	item_list: '',
	item_filter: '',
	API_URL: 'http://jsonplaceholder.typicode.com/posts',
	json_data: '',

	init: function(){
		this.item_list = $('.js-item-list');
		this.item_filter = $('.js-item-filter');
		this.populateList();
		this.addEvents();
	},

	populateList: function(){
		var self = this;

		$.getJSON(self.API_URL, function(data){
			self.json_data = data;
			$.each(data, function(index, item){
				self.item_list.append('<a href="#" class="list-group-item" data-item-id="' + item.id + '">' + item.title + '</a>');
			});

			Livestax.title('Items list (found ' + data.length + ')');
		});
	},

	addEvents: function(){
		var self = this;

		$(document.body).on('click', self.item_list.find('a'), function(e){
			var clicked_link,
					item_id;

			e.preventDefault();
			clicked_link = $(e.target);
			item_id = clicked_link.data('item-id');
			
			self.item_list.find('a').removeClass('active');
			clicked_link.addClass('active');
			Livestax.store.set('item_id', item_id);
		});

		self.item_filter.on('keypress', function(){
			var new_data = self.json_data.filter(function(obj){
				if (obj.title.indexOf(self.item_filter.val()) > -1) {
					return true;
				} else {
					return false;
				};
			});
			self.item_list.empty();
			$.each(new_data, function(index, item){
				self.item_list.append('<a href="#" class="list-group-item" data-item-id="' + item.id + '">' + item.title + '</a>');
			});
		});
	}
}

$(function(){
	Main.init();
});