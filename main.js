var GitHub = (function($){
	'use strict'

	var self = {};
	self.api = 'https://api.github.com/users'


	/*****************************************************/
	/* Requisições */
	/*****************************************************/

	function ajax(url){
		return $.ajax(url);
	}
		
	function getUser(username){
		return ajax(self.api + '/' + username)
	}

	function getRepo(username){
		return ajax(self.api + '/' + username + '/repos')
	}

	/*****************************************************/
	/* Rederizar, Callbacks */
	/*****************************************************/


	function buscarUser() {
		$('#btnBuscar').on('click', function(e){
			e.preventDefault()
			var username = $('#username').val();
			getUser(username).then(callbackUser, erroUser);
			getRepo(username).then(callbacRepo, erroUser);

		});
	}

	function callbackUser(data) {
		$('#username').val('');
		var container = $('#containerAvatar');
		var source = $('#templateAvatar').html();

		var template = Handlebars.compile(source);
		var compiled = template(data);
		container.children().remove();
		container.append(compiled)
	}

	function callbacRepo(data) {

		var container = $('#containerListRepo');
		var source = $('#templateListRepo').html();

		var template = Handlebars.compile(source);
		var compiled = template({repos: data});
		container.children().remove();
		container.append(compiled)

	}

	function erroUser(err) {
		console.log(err)
	}

	function initHandler() {
		buscarUser()
	}


	return {
		init: initHandler
	}


})(jQuery)


GitHub.init();
