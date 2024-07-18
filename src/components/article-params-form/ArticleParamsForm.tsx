import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from 'components/text';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [openForm, setOpenForm] = useState(false);
	const [selectState, setSelectState] = useState(articleState);
	const formRef = useRef<HTMLDivElement>(null);

	const inputChangeHandler = (key: keyof ArticleStateType, value: OptionType) =>
		setSelectState((state) => ({ ...state, [key]: value }));

	const formSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectState);
	};

	const formResetHandler = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(defaultArticleState);
		setSelectState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: openForm,
		onChange: setOpenForm,
		rootRef: formRef,
	});

	return (
		<>
			<ArrowButton openForm={openForm} setOpenForm={setOpenForm} />

			<aside
				ref={formRef}
				className={clsx(styles.container, openForm && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={selectState.fontFamilyOption}
						onChange={(selectElement) => {
							inputChangeHandler('fontFamilyOption', selectElement);
						}}
					/>
					<RadioGroup
						name='fontSizeOption'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={selectState.fontSizeOption}
						onChange={(selectElement) => {
							inputChangeHandler('fontSizeOption', selectElement);
						}}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectState.fontColor}
						onChange={(selectElement) => {
							inputChangeHandler('fontColor', selectElement);
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectState.backgroundColor}
						onChange={(selectElement) => {
							inputChangeHandler('backgroundColor', selectElement);
						}}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={selectState.contentWidth}
						onChange={(selectElement) => {
							inputChangeHandler('contentWidth', selectElement);
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
