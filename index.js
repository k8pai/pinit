let savedUrls = [];
const inpField = document.getElementById('inpField');
const showLinks = document.getElementById('showLinks');
const saveInput = document.getElementById('saveInput');
const saveUrl = document.getElementById('saveUrl');
const deleteAll = document.getElementById('deleteAll');
const urlUlContainer = document.getElementById('urlUlContainer');
const copyButtons = document.querySelectorAll('.copy-button');

showLinks.addEventListener('click', () => {
	renderElement();
});

function generateData(value, title) {
	return {
		id: Math.floor(Math.random() * 100000000000),
		url: value,
		title: title,
	};
}

function renderElement() {
	let listItems = '';
	savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
	largeOrShort = savedUrls.length > 5;

	if (largeOrShort) {
		urlUlContainer.classList.remove('short');
	} else {
		urlUlContainer.classList.add('short');
	}
	console.log('largeOrShort = ', largeOrShort);
	listItems = savedUrls
		?.map(
			(el) =>
				`<li class="mt-2 flex items-center text-blue-400 bg-transparent font-semibold text-base">
					<input class="p-1 flex-grow border-l-2 cursor-default focus:outline-none focus:ring-0 border-cyan-500/90" readonly type='text' value='${el.title}' />
					<a class='p-1 rounded-md border-2 border-transparent hover:border-green-400/80' target='_blank' href='${el.url}'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
						</svg>
					</a>
					<button data-url="${el.url}" class='copy-button p-1 ml-1 rounded-md border-2 border-transparent hover:border-green-400/80'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 copy-button" data-url="${el.url}">
							<path class="copy-button" data-url="${el.url}" stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
						</svg>
					</button>
					<button data-id="${el.id}" class='delete-button p-1 ml-1 rounded-md border-2 border-transparent hover:border-green-400/80'>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-id="${el.id}" class="delete-button w-6 h-6">
							<path data-id="${el.id}" class="delete-button" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>		  
					</button>
				</li>`,
		)
		.join('');
	urlUlContainer.innerHTML = listItems;
}

saveInput.addEventListener('click', () => {
	if (!inpField.value) {
		return;
	}
	savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
	const data = inpField.value;
	const title = data.replace(/* prettier-ignore */ /^https?:\/\//, '');
	console.log('title = ', title);
	savedUrls.unshift(generateData(inpField.value, title));
	localStorage.setItem('urlsaver', JSON.stringify(savedUrls));
	inpField.value = '';
	renderElement();
});

deleteAll.addEventListener('click', () => {
	localStorage.removeItem('urlsaver');
	renderElement();
});

saveUrl.addEventListener('click', () => {
	console.log('function invoked');
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		var activeTab = tabs[0];
		console.log('activeTab = ', activeTab);
		savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
		const title = activeTab.url.replace(
			/* prettier-ignore */ /^https?:\/\//,
			'',
		);
		console.log('title = ', title);
		savedUrls.unshift(generateData(activeTab.url, title));
		localStorage.setItem('urlsaver', JSON.stringify(savedUrls));
		renderElement();
	});
});

urlUlContainer.addEventListener('click', function (event) {
	if (event.target.classList.contains('copy-button')) {
		const url = event.target.dataset.url;
		navigator.clipboard
			.writeText(url)
			.then(() => {
				console.log('Text copied to clipboard');
			})
			.catch((error) => {
				console.error('Error copying text to clipboard:', error);
			});
	}
	if (event.target.classList.contains('delete-button')) {
		savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
		const data = savedUrls.filter((el) => el.id != event.target.dataset.id);
		localStorage.setItem('urlsaver', JSON.stringify(data));
		renderElement();
	}
});

urlUlContainer.addEventListener('click', function (event) {});
