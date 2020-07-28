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
		props: ['technology', 'wlan', 'speed', 'bluetooth', 'gps', {
			prop: 'nfc',
			render: value => value?.toLowerCase().includes('yes') ? 'NFC' : null
		}]
	},
	{
		header: 'Hardware',
		props: ['cpu', 'gpu', 'chipset', 'internal', 'card_slot']
	},
	{
		header: 'OS',
		props: ['os']
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
			{
				prop: 'loudspeaker_',
				render: value => value && value.toLowerCase().includes('yes') ? 'Loudspeaker' : null
			},
			{
				prop: '_3_5mm_jack_',
				render: value => value && value.toLowerCase().includes('yes') ? '3.5mm jack' : null
			}
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
