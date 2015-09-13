var ItemView = {
	container: '',
	API_URL: 'http://jsonplaceholder.typicode.com/posts',

	init: function() {
		this.container = $('.js-container');
		this.addEvents();
	},

	addEvents: function(){
		var self = this;

		Livestax.store.watch('item-list.item_id', function(data){
			self.populateView(data);
		});
	},

	populateView: function(item_id){
		var self = this,
				URL = self.API_URL + '/' + item_id;

		$.getJSON(URL, function(data){
			self.container.empty().append('<h1>' + data.title + '</h1><p>' + data.body + '</p>');
			Livestax.title(data.title);
		});
	}
}

$(function(){
	ItemView.init();
});