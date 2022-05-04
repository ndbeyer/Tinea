import React from 'react';
import styled from 'styled-components/native';
import shortid from 'shortid';

import { Label, Paragraph } from './Text';
import Button from './Button';
import PortalProvider from './PortalProvider';

const BackgroundWrapper = styled.View`
	width: 100%;
	height: 100%;
	position: absolute;
	justify-content: center;
	align-items: center;
`;

const BackgroundOverlay = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	position: absolute;
	background-color: ${(p) => p.theme.colors.neutral1};
	opacity: 0.5;
`;

const ContentWrapper = styled.View`
	position: absolute;
	width: 80%;
	background-color: ${(p) => p.theme.colors.background0};
	border-radius: ${(p) => p.theme.rem2px('2rem')};
	padding: ${(p) => p.theme.rem2px(p.pad)};
`;

const Row = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	margin-top: ${(p) => p.theme.rem2px('1rem')};
`;

type DialogProps = {
	title?: string;
	description?: string;
	buttons?: { label: string; onPress: () => void; disabled: boolean; loading: boolean }[];
	dismissPortal: () => void;
};

const Dialog = ({ dismissPortal, title, description, buttons }: DialogProps): JSX.Element => {
	return (
		<>
			<BackgroundWrapper>
				<BackgroundOverlay onPress={dismissPortal} />
				<ContentWrapper pad="2.5rem">
					{title ? (
						<Label m="0 0 2rem 0" size="xl">
							{title}
						</Label>
					) : null}
					{description ? <Paragraph margin="2rem 0rem">{description}</Paragraph> : null}

					<Row>
						{buttons?.map(({ label, onPress, disabled, loading }, index) => (
							<Button
								margin="0 0 0 1rem"
								key={`DialogButton${index}`}
								label={label}
								onPress={onPress}
								backgroundColor={buttons.length > 1 && index === 0 ? 'background1' : 'background0'}
								disabled={disabled}
								loading={loading}
							/>
						)) || (
							<Button
								margin="0 0 0 1rem"
								// key={`DialogButton${index}`}
								label="OK"
								onPress={dismissPortal}
								backgroundColor="background0"
							/>
						)}
					</Row>
				</ContentWrapper>
			</BackgroundWrapper>
		</>
	);
};

const dialogStack: string[] = [];
Dialog.render = (props: Omit<DialogProps, 'dismissPortal'>, id?: string): void => {
	if (!id) {
		id = shortid.generate();
		dialogStack.push(id);
	}
	PortalProvider.render(id, Dialog, props);
};
Dialog.unmount = (id?: string) => {
	if (!id) id = dialogStack.pop();
	if (id) PortalProvider.unmount(id);
};

export default Dialog;
