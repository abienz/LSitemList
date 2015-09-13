var Main = {
	item_list: '',
	API_URL: 'http://jsonplaceholder.typicode.com/posts',

	init: function(){
		this.item_list = $('.js-item-list');
		this.populateList();
		this.addEvents();
	},

	populateList: function(){
		var self = this;

		$.getJSON(self.API_URL, function(data){
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

			clicked_link = $(e.target);
			item_id = clicked_link.data('item-id');
			
			self.item_list.find('a').removeClass('active');
			clicked_link.addClass('active');
			Livestax.store.set('item_id', item_id);
		});
	}
}

$(function(){
	Main.init();
});