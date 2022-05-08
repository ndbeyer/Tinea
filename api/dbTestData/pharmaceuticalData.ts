type ApplicationArea = 'FOOT_FUNGUS' | 'NAIL_FUNGUS';

export type PharmaceuticalData = {
	created_at: string;
	updated_at: string;
	pzn: string;
	title: string;
	image: string;
	price_in_cents: string;
	application_area: ApplicationArea;
	dosage_form: string;
	application_interval: string;
	application_duration: string;
}[];

const baseObject = {
	created_at: '$$now()',
	updated_at: '$$now()',
	info_text:
		'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
};

const userTestData: PharmaceuticalData = [
	{
		// id: 1,
		pzn: '08907142',
		title: 'Ciclopoli® gegen Nagelpilz',
		image: 'https://cdn.shop-apotheke.com/images/448x0/D08/907/142/D08907142-p1.webp',
		price_in_cents: '3619',
		application_area: 'NAIL_FUNGUS' as ApplicationArea,
		dosage_form: 'Wirkstoffhaltiger Nagellack',
		application_interval: '1x täglich',
		application_duration: '6 - 12 Monate',
		manufacturer: 'Almirall Hermal GmbH',
		amount: '6.6 ml',
	},
	{
		// id: 2,
		pzn: '11286181',
		title: 'Loceryl® Nagellack gegen Nagelpilz mit DIREKT-Applikator + Loceryl Nagellack GRATIS',
		image: 'https://cdn.shop-apotheke.com/images/448x0/D11/286/181/D11286181-p1.webp',
		price_in_cents: '5499',
		application_area: 'NAIL_FUNGUS' as ApplicationArea,
		dosage_form: 'Wirkstoffhaltiger Nagellack',
		application_interval: '1x wöchentlich',
		application_duration: '6 - 12 Monate',
		manufacturer: 'Galderma Laboratorium GmbH',
		amount: '5 ml',
	},
	{
		// id: 3,
		pzn: '00619053',
		title: 'Canesten® EXTRA Nagelset',
		image: 'https://cdn.shop-apotheke.com/images/448x0/D00/619/053/D00619053-p1.webp',
		price_in_cents: '3798',
		application_area: 'NAIL_FUNGUS' as ApplicationArea,
		dosage_form: 'Salbe',
		application_interval: '1x täglich',
		application_duration: '5 - 6 Wochen',
		manufacturer: 'Bayer Vital GmbH',
		amount: '1 Stück',
	},
	{
		// id: 4,
		pzn: '00679629',
		title: 'Canesten® EXTRA Bifonazol Creme',
		image: 'https://cdn.shop-apotheke.com/images/448x0/D00/679/629/D00679629-p1.webp',
		price_in_cents: '2197',
		application_area: 'FOOT_FUNGUS' as ApplicationArea,
		dosage_form: 'Creme',
		application_interval: '1x täglich',
		application_duration: '2 - 4 Wochen',
		manufacturer: 'Bayer Vital GmbH',
		amount: '50g',
	},
	{
		// id: 5,
		pzn: '00679629',
		title: 'Clotrimazol AL 1%',
		image: 'https://cdn.shop-apotheke.com/images/448x0/D04/941/509/D04941509-p1.webp',
		price_in_cents: '497',
		application_area: 'FOOT_FUNGUS' as ApplicationArea,
		dosage_form: 'Creme',
		application_interval: '2 - 3x täglich',
		application_duration: 'mindestens 4 Wochen',
		manufacturer: 'ALIUD Pharma GmbH',
		amount: '50g',
	},
	{
		// id: 5,
		pzn: '03839507',
		title: 'LAMISIL® Creme',
		image: 'https://cdn.shop-apotheke.com/images/448x0/D03/839/507/D03839507-p1.webp',
		price_in_cents: '989',
		application_area: 'FOOT_FUNGUS' as ApplicationArea,
		dosage_form: 'Creme',
		application_interval: '1-2x täglich',
		application_duration: '',
		manufacturer: 'GlaxoSmithKline Consumer Healthcare',
		amount: '15g',
	},
].map((obj) => ({ ...baseObject, ...obj }));

export default userTestData;
