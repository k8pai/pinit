let savedUrls = [];
const email = document.getElementById('email_field');
const emailInfo = document.getElementById('email-info');
const savemail = document.getElementById('save_email');
const savedmails = document.getElementById('savedMails');
const saveUrl = document.getElementById('saveUrl');
const deleteAll = document.getElementById('deleteAll');
const windowTabs = document.getElementById('window');
const urlUlContainer = document.getElementById('urlUlContainer');
const copyButtons = document.querySelectorAll('.copy-button');
const cloudButtons = document.querySelectorAll('.cloud-button');

savemail.addEventListener('click', () => {
	// add the current mail id to localstorage.
	let mails = JSON.parse(localStorage.getItem('urlsavermails')) || [];
	mails = [email.value, ...mails];
	mailTags = mails
		.map(
			(
				el,
			) => `<button data-mail="${el}" class="active-mail mt-2 flex items-center text-blue-400 bg-transparent font-semibold text-base">
			<input data-mail="${el}" class="active-mail p-1 flex-grow border-l-2 cursor-default focus:outline-none focus:ring-0 border-cyan-500/90" readonly type='text' value='${el}' />
		</button>`,
		)
		.join('');
	localStorage.setItem('urlsavermails', JSON.stringify(mails));
	savedmails.innerHTML = mailTags;
});

function generateDataForArray(tabs) {
	return tabs.map(({ favIconUrl, url, title }, _) => ({
		id: Math.floor(Math.random() * 100000000000),
		url,
		title,
		icon: favIconUrl,
	}));
}

function generateData(value, title) {
	return {
		id: Math.floor(Math.random() * 100000000000),
		url: value,
		title: title,
	};
}

const getDomain = (link) => {
	return link.replace(/* prettier-ignore */ /^https?:\/\//, '');
};

windowTabs.addEventListener('click', function (event) {
	console.log('function invoked');
	chrome.tabs.query({ currentWindow: true }, (tabs) => {
		const links = generateDataForArray(tabs);
		savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
		savedUrls = [...links, ...savedUrls];
		localStorage.setItem('urlsaver', JSON.stringify(savedUrls));
		renderElement();
	});
});

function renderElement() {
	let listItems = '';
	savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
	largeOrShort = savedUrls.length > 5;

	if (largeOrShort) {
		urlUlContainer.classList.remove('short');
	} else {
		urlUlContainer.classList.add('short');
	}

	listItems = savedUrls
		?.map(
			({ id, url, title, icon }, _) =>
				`<li class="mt-2 flex items-center text-blue-400 bg-transparent font-semibold text-base">
					<div class="flex-col items-start flex-grow">
						<div class="text-sm text-zinc-600">
							<input class="px-1 cursor-default focus:outline-none focus:ring-0" title="${url}" readonly type='text' value='${title}' />
						</div>
						<div class="text-xs">
							<a class="px-1 inline-block" title="${url}" target='_blank' href='${url}'>visit link</a>
						</div>
					</div>
					
					<div id="actions-${id}" class="flex items-center">
						<button id="copy-button-${id}" title="Copy" data-url="${url}" class='copy-button ml-1 rounded-md border-2 border-transparent transition-all hover:scale-110 text-zinc-600 hover:text-blue-500'>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 copy-button" data-url="${url}">
								<path class="copy-button" data-url="${url}" stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
							</svg>
						</button>
						<button id="cloud-button-${id}" title="Save to Database" data-id="${id}" data-url="${url}" data-title="${title}" data-icon="${icon}"class='cloud-button ml-1 rounded-md border-2 border-transparent transition-all hover:scale-110 text-zinc-600 hover:text-blue-500'>
							<svg data-id="${id}" data-url="${url}" data-title="${title}" data-icon="${icon}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 cloud-button">
								<path class="cloud-button" data-id="${id}" data-url="${url}" data-title="${title}" data-icon="${icon}" stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
							</svg>
						</button>
						<button id="delete-button-${id}" title="Delete" data-id="${id}" class='delete-button ml-1 rounded-md border-2 border-transparent transition-all hover:animate-wiggle text-zinc-600 hover:text-red-500'>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-id="${id}" class="delete-button w-5 h-5">
								<path data-id="${id}" class="delete-button" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>		  
						</button>
					</div>
				</li>`,
		)
		.join('');
	urlUlContainer.innerHTML = listItems;
}

deleteAll.addEventListener('click', () => {
	localStorage.removeItem('urlsaver');
	renderElement();
});

saveUrl.addEventListener('click', () => {
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

		saveLinkToDb(activeTab.url, email.value);
		renderElement();
	});
});

urlUlContainer.addEventListener('click', async (event) => {
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

	if (event.target.classList.contains('cloud-button')) {
		const val = ({
			id: datasetId,
			url: datasetUrl,
			title: datasetTitle,
			icon: datasetIcon,
		} = event.target.dataset);

		// console.log('val => ', val, val.id, val.icon, val.title, val.url);

		let copybtn = document.getElementById(`copy-button-${datasetId}`);
		let cloudbtn = document.getElementById(`cloud-button-${datasetId}`);
		let deletebtn = document.getElementById(`delete-button-${datasetId}`);

		if (!email.value) {
			email.classList.remove('border-green-400/80');
			email.classList.add('border-red-400/80');
			// console.log('from !mail');
			emailInfo.textContent =
				'Select one of your saved mails or type in your mail to save link to linkwrap';
			return;
		}

		copybtn.disabled = true;
		cloudbtn.disabled = true;
		deletebtn.disabled = true;

		let res = await saveLinkToDb(val, email.value);
		if (!res) {
			return;
		}
		savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
		const data = savedUrls.filter((el) => el.id != event.target.dataset.id);
		localStorage.setItem('urlsaver', JSON.stringify(data));
		renderElement();
	}
});

savedmails.addEventListener('click', (event) => {
	if (event.target.classList.contains('active-mail')) {
		email.value = event.target.dataset.mail;
	}
});

// urlUlContainer.addEventListener('click', function (event) {});

document.addEventListener('DOMContentLoaded', async function () {
	let mails = JSON.parse(localStorage.getItem('urlsavermails')) || [];
	savedUrls = JSON.parse(localStorage.getItem('urlsaver')) || [];
	mailTags = mails
		.map(
			(
				el,
			) => `<button data-mail="${el}" class="active-mail mt-2 flex items-center text-blue-400 bg-transparent font-semibold text-base">
			<input data-mail="${el}" class="active-mail p-1 flex-grow border-l-2 cursor-default focus:outline-none focus:ring-0 border-cyan-500/90" readonly type='text' value='${el}' />
		</button>`,
		)
		.join('');

	renderElement();

	savedmails.innerHTML = mailTags;

	const linkList = document.getElementById('linkList');

	const links = await getLinksFromServer();
	links.forEach((link) => {
		const listItem = document.createElement('li');
		listItem.textContent = link.url;
		linkList.appendChild(listItem);
	});
});

async function getLinksFromServer() {
	try {
		const response = await fetch('http://localhost:3000/links');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

async function saveLinkToDb({ url, title, icon }, mail) {
	if (!email.classList.contains('border-green-400/80')) {
		email.classList.add('border-green-400/80');
		email.classList.remove('border-red-400/80');
		emailInfo.textContent = '';
	}

	const body = { email: mail, link: url, title, icon };
	console.log('body => ', body);
	try {
		const response = await fetch(
			'https://linkwrap.k8pai.dev/api/extention',
			{
				method: 'POST',
				headers: {
					Origin: 'chrome-extension://aolnceioghacpcffiianinmfpepnagkj',
				},
				body: JSON.stringify(body),
			},
		);
		const data = await response.json();
		// console.log('data as the response in saveLinkToDB function => ', data);
		return data;
	} catch (error) {
		console.error(error);
		return undefined;
	}
}
