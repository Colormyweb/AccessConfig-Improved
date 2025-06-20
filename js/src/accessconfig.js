(function(window) {
	'use strict';

	// Configuration globale
	window.AccessConfig = {
		config: {
			// Classes CSS
			FormFieldsetContent: {
				classSetting: 'content'
			},
			FormFieldset: {
				classSetting: 'fieldset'
			},
			LegendFieldset: {
				classSetting: 'legend'
			},
			FormRadio: {
				classSetting: 'radio'
			},
			// Langues
			ContrastLegend: {
				lang: {
					en: 'Contrast',
					fr: 'Contrastes'
				}
			},
			TextSizeLegend: {
				lang: {
					en: 'Text size',
					fr: 'Taille du texte'
				}
			},
			ImageLegend: {
				lang: {
					en: 'Images',
					fr: 'Images'
				}
			},
			AudioLegend: {
				lang: {
					en: 'Audio',
					fr: 'Audio'
				}
			},
			ModalContainer: {
				titleLang: {
					en: 'Accessibility settings',
					fr: 'Paramètres d\'accessibilité'
				}
			},
			CloseButton: {
				lang: {
					en: 'Close',
					fr: 'Fermer'
				}
			}
		},

		onload: function() {
			console.log('AccessConfig: Début de l\'initialisation');
			
			// Configuration initiale
			AccessConfig.userPrefix = 'ac'; // Préfixe par défaut
			console.log('AccessConfig: Préfixe :', AccessConfig.userPrefix);
			
			// Créer le formulaire d'accessibilité
			AccessConfig.settingForm();
			
			// Initialiser les événements pour chaque groupe de paramètres
			['contrast', 'text-size', 'image', 'audio'].forEach(function(setting) {
				AccessConfig.setEvent(setting);
			});
			
			// Initialiser les préférences sauvegardées
			['contrast', 'text-size', 'image', 'audio'].forEach(function(setting) {
				var savedId = AccessConfig.getItem(setting);
				if (savedId) {
					var savedRadio = document.getElementById(savedId);
					if (savedRadio) {
						savedRadio.checked = true;
						AccessConfig.setAdaptive(savedRadio);
					}
				}
			});
			
			console.log('AccessConfig: Initialisation terminée');
		},

		settingForm: function() {
			var modal = document.createElement('div');
			modal.id = AccessConfig.userPrefix;
			modal.className = 'modal';

			var content = document.createElement('div');
			content.className = 'modal-content';

			var title = document.createElement('h2');
			title.id = AccessConfig.userPrefix + '-title';
			title.className = 'modal-title';
			title.textContent = AccessConfig.config.ModalContainer.titleLang[document.documentElement.lang] || 'Paramètres d\'accessibilité';

			var closeButton = document.createElement('button');
			closeButton.id = AccessConfig.userPrefix + '-close';
			closeButton.className = 'close-button';
			closeButton.textContent = AccessConfig.config.CloseButton.lang[document.documentElement.lang] || 'Fermer';

			content.appendChild(title);
			content.appendChild(closeButton);

			var settingsGroups = [
				{ name: 'contrast', label: 'Contrastes' },
				{ name: 'text-size', label: 'Taille du texte' },
				{ name: 'image', label: 'Images' },
				{ name: 'audio', label: 'Audio' }
			];

			settingsGroups.forEach(function(group) {
				var groupElement = AccessConfig.createFormGroup(group.name, group.label);
				content.appendChild(groupElement);
			});

			modal.appendChild(content);
			document.body.appendChild(modal);
		},

		createFormGroup: function(name, label) {
			var fieldset = document.createElement('fieldset');
			fieldset.id = AccessConfig.userPrefix + '-' + name;
			fieldset.className = AccessConfig.config.FormFieldset.classSetting;

			var legend = document.createElement('legend');
			legend.className = AccessConfig.config.LegendFieldset.classSetting;
			legend.textContent = label;

			// Créer les boutons radio selon le type de paramètre
			var options = [];
			switch(name) {
				case 'contrast':
					options = [
						{ id: AccessConfig.userPrefix + '-default-contrast', value: 'default-contrast', label: 'Par défaut' },
						{ id: AccessConfig.userPrefix + '-high-contrast', value: 'high-contrast', label: 'Contraste élevé' },
						{ id: AccessConfig.userPrefix + '-inv-contrast', value: 'inv-contrast', label: 'Inversé' }
					];
					break;
				case 'text-size':
					options = [
						{ id: AccessConfig.userPrefix + '-default-text-size', value: 'default-text-size', label: 'Par défaut' },
						{ id: AccessConfig.userPrefix + '-dys-font', value: 'dys-font', label: 'Dyslexie' }
					];
					break;
				case 'image':
					options = [
						{ id: AccessConfig.userPrefix + '-default-image', value: 'default-image', label: 'Par défaut' },
						{ id: AccessConfig.userPrefix + '-replace-img', value: 'replace-img', label: 'Remplacer' }
					];
					break;
				case 'audio':
					options = [
						{ id: AccessConfig.userPrefix + '-default-audio', value: 'default-audio', label: 'Par défaut' }
					];
					break;
			}

			// Créer les boutons radio et leurs labels
			options.forEach(function(option) {
				var radio = document.createElement('input');
				radio.type = 'radio';
				radio.id = option.id;
				radio.name = AccessConfig.userPrefix + '-' + name;
				radio.value = option.value;
				radio.checked = option.value === 'default-' + name;

				var label = document.createElement('label');
				label.htmlFor = option.id;
				label.textContent = option.label;

				fieldset.appendChild(radio);
				fieldset.appendChild(label);
			});

			fieldset.appendChild(legend);

			return fieldset;
		},

		setEvent: function(settingName) {
			var fieldset = document.getElementById(AccessConfig.userPrefix + '-' + settingName);
			if (!fieldset) {
				console.error('setEvent: Fieldset non trouvé pour', settingName);
				return;
			}

			var radioButtons = fieldset.querySelectorAll('input[type="radio"]');
			var savedId = AccessConfig.getItem(settingName);

			if (savedId) {
				var savedRadio = document.getElementById(savedId);
				if (savedRadio) {
					savedRadio.checked = true;
					AccessConfig.setAdaptive(savedRadio);
				}
			} else {
				var defaultRadio = fieldset.querySelector('input[id*="default"]');
				if (defaultRadio) {
					defaultRadio.checked = true;
				}
			}

			for (var i = 0; i < radioButtons.length; i++) {
				radioButtons[i].addEventListener('click', function() {
					AccessConfig.setAdaptive(this);
				});
			}
		},

		isLocalStorageAvailable: function() {
			try {
				localStorage.setItem('test', 'test');
				localStorage.removeItem('test');
				return true;
			} catch (e) {
				return false;
			}
		},

		setItem: function(name, value) {
			if (AccessConfig.isLocalStorageAvailable()) {
				localStorage.setItem(AccessConfig.userPrefix + '-' + name, value);
			} else {
				AccessConfig.createCookie(AccessConfig.userPrefix + '-' + name, value, 365);
			}
		},

		getItem: function(name) {
			if (AccessConfig.isLocalStorageAvailable()) {
				return localStorage.getItem(AccessConfig.userPrefix + '-' + name);
			} else {
				return AccessConfig.readCookie(AccessConfig.userPrefix + '-' + name);
			}
		},

		removeItem: function(name) {
			if (AccessConfig.isLocalStorageAvailable()) {
				localStorage.removeItem(AccessConfig.userPrefix + '-' + name);
			} else {
				AccessConfig.eraseCookie(AccessConfig.userPrefix + '-' + name);
			}
		},

		createCookie: function(name, value, days) {
			var expires = '';
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = '; expires=' + date.toUTCString();
			}
			document.cookie = name + '=' + (value || '') + expires + '; path=/';
		},

		readCookie: function(name) {
			var nameEQ = name + '=';
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) === ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},

		eraseCookie: function(name) {
			AccessConfig.createCookie(name, '', -1);
		},

		setAdaptive: function(obj) {
			var groupName = obj.name.replace(AccessConfig.userPrefix + '-', '');
			var selectedValue = obj.value;
			var selectedId = obj.id;

			AccessConfig.setItem(groupName, selectedId);

			switch(groupName) {
				case 'contrast':
					AccessConfig.setContrast(selectedValue);
					break;
				case 'text-size':
					AccessConfig.setTextSize(selectedValue);
					break;
				case 'image':
					AccessConfig.setImageMode(selectedValue);
					break;
				case 'audio':
					AccessConfig.setAudioMode(selectedValue);
					break;
			}
		},

		setContrast: function(value) {
			var body = document.body;
			// Supprimer les classes de contraste existantes
			body.classList.remove('high-contrast', 'inv-contrast');
			// Ajouter la nouvelle classe
			if (value === 'high-contrast') {
				body.classList.add('high-contrast');
			} else if (value === 'inv-contrast') {
				body.classList.add('inv-contrast');
			}
		},

		setTextSize: function(value) {
			var body = document.body;
			// Supprimer la classe de police existante
			body.classList.remove('dys-font');
			// Ajouter la nouvelle classe
			if (value === 'dys-font') {
				body.classList.add('dys-font');
			}
		},

		setImageMode: function(value) {
			var images = document.querySelectorAll('.replace-img');
			images.forEach(function(img) {
				if (value === 'replace-img') {
					img.classList.add('replace-style');
				} else {
					img.classList.remove('replace-style');
				}
			});
		},

		setAudioMode: function(value) {
			// À implémenter selon les besoins spécifiques
			console.log('setAudioMode: Mode audio non implémenté');
		}
	};

	// Polyfill pour la méthode remove non disponible dans InternetExplorer
	(function (arr) {
		arr.forEach(function (item) {
			if (item.hasOwnProperty('remove')) return;
			Object.defineProperty(item, 'remove', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function remove() {
					this.parentNode.removeChild(this);
				}
			});
		});
	})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

	// Attendre que le DOM soit chargé avant d'initialiser
	document.addEventListener('DOMContentLoaded', function() {
		AccessConfig.onload();
	});

})(window);
