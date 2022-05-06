import React from 'react';
import styled from 'styled-components/native';

import Button from '../components/Button';
import Box from '../components/Box';
import Screen from '../components/Screen';
import { Label, Paragraph } from '../components/Text';

const rawQuestions: {
	id?: number;
	optional?: boolean;
	question: string;
	answerType: 'BOOLEAN' | 'NUMBER';
	problmaticWhen?: boolean; // self medication not recommended
	criticalWhen?: boolean; // true if the person must see a doctor
	nextIfTrue?: number;
}[] = [
	// Symptome
	{ question: 'Jucken die betroffenen Hautstellen', answerType: 'BOOLEAN' },
	{
		question: 'Haben Sie an den betroffenen Hautstellen Schmerzen',
		answerType: 'BOOLEAN',
		problmaticWhen: true,
	},
	{ question: 'Sind die betroffenen Hautstellen gerötet', answerType: 'BOOLEAN' },
	{ question: 'Brennen die betroffenen Hautstellen', answerType: 'BOOLEAN' },
	{ question: 'Nässen die betroffenen Hautstellen', answerType: 'BOOLEAN', problmaticWhen: true },
	{ question: 'Schuppen die betroffenen Hautstellen', answerType: 'BOOLEAN' },
	{
		question: 'Haben sich an den Stellen Bläschen gebildet',
		answerType: 'BOOLEAN',
		problmaticWhen: true,
	},
	{ question: 'Färben sich die betroffenen Hautstellen weißlich', answerType: 'BOOLEAN' },
	// Erfahrungen / Dauer
	{
		question: 'Wurden die Symptome bereits durch einen Arzt abgeklärt',
		answerType: 'BOOLEAN',
		problmaticWhen: false,
	},
	{
		question: 'Haben Sie die Symptome länger als 4 Wochen',
		answerType: 'BOOLEAN',
		problmaticWhen: true,
	},
	{
		question: 'Hatten Sie diese Symptome schon früher einmal',
		answerType: 'BOOLEAN',
		problmaticWhen: false,
	},
	// Zusammenhang
	{ question: 'Leiden Sie unter Schweißfüßen', answerType: 'BOOLEAN' },
	{
		question: 'Treten die Symptome in Zusammenhang mit dem Besuch eines Schwimmbads auf',
		answerType: 'BOOLEAN',
	},
	{
		question: 'Treten die Symptome in Zusammehang mit Sport z.B. Joggen auf',
		answerType: 'BOOLEAN',
	},
	{
		question: 'Treten die Symptome in Zusammehang mit dem Tragen bestimmter Schuhe auf',
		answerType: 'BOOLEAN',
	},
	// Betroffene Stellen
	{
		question: 'Sind die Fußkante, Fußgewölbe oder Zehenkanten betroffen',
		answerType: 'BOOLEAN',
		problmaticWhen: true,
	},
	{
		question: 'Sind auch die Fußnägel betroffen',
		problmaticWhen: true,
		answerType: 'BOOLEAN',
		nextIfTrue: 100,
	},
	{
		question: 'Sind auch über die Füße hinaus andere Köperregionen betroffen',
		answerType: 'BOOLEAN',
		problmaticWhen: true,
	},
	// Criticals
	{ question: 'Sind sie unter 18 Jahre alt', answerType: 'BOOLEAN', criticalWhen: true },
	{ question: 'Sind Sie schwanger', answerType: 'BOOLEAN', criticalWhen: true },
	{ question: 'Leiden Sie unter Diabetes', answerType: 'BOOLEAN', criticalWhen: true },
	{ question: 'Leiden Sie unter HIV', answerType: 'BOOLEAN', criticalWhen: true },
	{ question: 'Leiden Sie unter venöser Insuffizienz', answerType: 'BOOLEAN', criticalWhen: true },
	{
		question: 'Leiden Sie unter Psoriasis (Schuppenflechte)',
		answerType: 'BOOLEAN',
		criticalWhen: true,
	},
	{ question: 'Nehmen Sie Zytostatika ein', answerType: 'BOOLEAN', criticalWhen: true },
	{ question: 'Nehmen Sie Immunsuppressiva ein', answerType: 'BOOLEAN', criticalWhen: true },
	// optional TODO:
	// {
	// 	id: 100,
	// 	question:
	// 		'Sind mehr als zwei Drittel der Nagelplatte oder mehr als zwei bis drei Nägel betroffen',
	// 	optional: true,
	// 	answerType: 'BOOLEAN',
	// 	problmaticWhen: true,
	// },
];

const StyledScreen = styled(Screen)`
	justify-content: center;
`;

const Wrapper = styled(Box)`
	align-self: stretch;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Row = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;

const questions = rawQuestions.map((question, index) => ({ id: index + 1, ...question }));
const maxIndex = questions.length - 1;

const QuestionaireScreen = (): JSX.Element => {
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const [answers, setAnswers] = React.useState<{
		[questionId: number]: {
			question: string;
			answer: boolean;
			problematicAnswer: boolean;
			criticalAnswer: boolean;
		};
	}>({});
	const [finished, setFinished] = React.useState(false);
	const [hasProblematicAnswer, setHasProblematicAnswer] = React.useState(false);
	const [hasCriticalAnswer, setHasCriticalAnswer] = React.useState(false);

	const handleFinished = React.useCallback(() => {
		const answersArray = Object.values(answers);
		const someProblematicAnswer = answersArray.some(
			({ problematicAnswer }) => problematicAnswer === true
		);
		const someCriticalAnswer = answersArray.some(({ criticalAnswer }) => criticalAnswer === true);
		setHasProblematicAnswer(someProblematicAnswer);
		setHasCriticalAnswer(someCriticalAnswer);
		setFinished(true);
	}, [answers]);

	const handleNextQuestion = React.useCallback(() => {
		const nextIndex = currentIndex + 1;
		if (nextIndex > maxIndex) {
			handleFinished();
			return;
		}
		setCurrentIndex(nextIndex);
	}, [currentIndex, handleFinished]);

	const handleAnswerYes = React.useCallback(
		(questionId) => {
			const question = questions.find(({ id }) => id === questionId);
			setAnswers((b) => ({
				...b,
				[questionId as number]: {
					question: question!.question,
					answer: true,
					problematicAnswer: question?.problmaticWhen === true,
					criticalAnswer: question?.criticalWhen === true,
				},
			}));
			handleNextQuestion();
		},
		[handleNextQuestion]
	);

	const handleAnswerNo = React.useCallback(
		(questionId) => {
			const question = questions.find(({ id }) => id === questionId);
			setAnswers((b) => ({
				...b,
				[questionId as number]: {
					question: question!.question,
					answer: true,
					problematicAnswer: question?.problmaticWhen === false,
					criticalAnswer: question?.criticalWhen === false,
				},
			}));
			handleNextQuestion();
		},
		[handleNextQuestion]
	);

	const questionId = questions[currentIndex].id;

	console.log('answers', answers);

	return (
		<StyledScreen>
			<Wrapper m="2rem" elevation={1} bg="background0" borderRadius="1rem" p="2rem">
				{finished ? (
					<>
						<Box height="20rem" justifyContent="center" alignItems="center">
							<Label size="xl" align="center" m="2rem">
								Fertig
							</Label>
							<Paragraph>
								{!hasProblematicAnswer && !hasCriticalAnswer
									? 'Basierend auf ihren Eingaben kann eine Selbstmedikation vorgenommen werden. '
									: hasProblematicAnswer
									? 'Eine Selbstmedikation wird nicht empfohlen'
									: 'Bitte sprechen Sie mit einem Arzt'}
							</Paragraph>
						</Box>
					</>
				) : (
					<>
						<Box height="20rem" justifyContent="center" alignItems="center">
							<Label size="xl" align="center" m="2rem">
								{questions[currentIndex].question}?
							</Label>
						</Box>

						<Row>
							<Button fullWidth label="Ja" id={questionId} onPress={handleAnswerYes} />
							<Button fullWidth label="Nein" id={questionId} onPress={handleAnswerNo} />
						</Row>
					</>
				)}
			</Wrapper>
		</StyledScreen>
	);
};

export default QuestionaireScreen;
