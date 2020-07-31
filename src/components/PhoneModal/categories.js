const categories = [
	{
		header: 'Dimensions',
		props: ['dimensions', 'size', 'weight']
	},
	{
		header: 'Screen',
		props: ['resolution', 'type', 'protection']
	},
	{
		header: 'Wireless',
		props: [
			'technology',
			'wlan',
			'speed',
			'bluetooth',
			'gps',
			phone => phone.nfc?.toLowerCase().includes('yes') ? 'NFC' : null
		]
	},
	{
		header: 'Hardware',
		props: [
			({ cpu, cpuInfo }) => (cpu || cpuInfo) ? `${cpu || ''} ${cpuInfo || ''}` : '',
			'gpu',
			'chipset',
			'internal',
			'card_slot'
		]
	},
	{
		header: 'OS',
		props: [({ os, osInfo }) => (os || osInfo) ? `${os || ''} ${osInfo || ''}` : '']
	},
	{
		header: 'SIM',
		props: ['sim']
	},
	{
		header: 'Camera',
		props: ['single', 'triple', 'video']
	},
	{
		header: 'Sound',
		props: [
			'sound_c',
			phone => phone.loudspeaker_?.toLowerCase().includes('yes') ? 'Loudspeaker' : null,
			phone => phone._3_5mm_jack_?.toLowerCase().includes('yes') ? '3.5mm jack' : null,
		]
	},
	{
		header: 'Battery',
		props: ['battery_c', 'charging']
	},
	{
		header: 'Additional',
		props: ['features', 'features_c', 'usb', 'sensors', 'radio']
	},
	{
		header: 'Colors',
		props: ['colors']
	}
];

export default categories;
