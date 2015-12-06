(function() {

	// can be: triad, tetrad, monochromatic, analogous, splitcomplement
	var selectedScheme = 'triad';

	// create instance
	var colorPicker = new ColorPicker.ColorPickerComponent(50)
		.onColorChanged(function (c) {
			var selected = document.getElementById('SelectedColor');
			selected.style.backgroundColor = '#' + c.toHex();
			selected.innerText = '#' + c.toHex();
			var colors = c.fullScheme(selectedScheme);
			var container = document.getElementById('GeneratedColors');
			container.innerHTML = '';

			for (var i in colors) {
				var color = colors[i];
				var elem = document.createElement('div');
				elem.innerText = '#' + color;
				elem.style.backgroundColor = '#' + color;
				container.appendChild(elem);
			}
		});

	// mithril rendering
	m.module(document.getElementById('ColorPickerContainer'), colorPicker);
})();