import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import {
  fontFamilyOptions,
	fontSizeOptions,
  fontColors,
  backgroundColors,
	contentWidthArr,
  defaultArticleState
} from 'src/constants/articleProps';

import type { OptionType } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { formTexts } from 'src/constants/formTexts'; 

type ArticleParamsFormProps = {
	changeArticleState: (state: typeof defaultArticleState) => void;
	articleState: typeof defaultArticleState;
}

export const ArticleParamsForm = ({changeArticleState, articleState}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false); // состояние откыта или закрыта форма
	const [formState, setFormState] = useState(articleState); // состояние формы дя хранения значений полей
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		// закрытие формы при клике вне формы
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
	
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	//преключение закрытие и открытие формы
	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	// изменение состояния формы при изменении значения элемента формы
	const handleChange = (field: keyof typeof formState) => (selectedOption: OptionType) => {
		setFormState((prev) => ({...prev, [field]: selectedOption,}));
	};

	// обработчик кнопки сброса формы и стилей страницы до дефолтных
	const handleReset = () => {
		setFormState(defaultArticleState);
		changeArticleState(defaultArticleState);
	};

  // обработчик кнопки прменения стилей из формы к странице
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		changeArticleState(formState);
		handleToggle();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside ref={formRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text size={31} weight={800} uppercase >
						{formTexts.formTitle}
					</Text>
					<Select
						title={formTexts.fontFieldTitle}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
						placeholder={formTexts.fontFieldPlaceholder}
					/>
					<RadioGroup
						name='font-size'
						title={formTexts.fontSizeFieldTitle}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title={formTexts.fontColorFieldTitle}
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
						placeholder={formTexts.fontColorFieldPlaceholder}
					/>
					<Separator />
					<Select
						title={formTexts.backgroundColorFieldTitle}
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
						placeholder={formTexts.backgroundColorFieldPlaceholder}
					/>
					<Select
						title={formTexts.contentWidthFieldTitle}
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
						placeholder={formTexts.contentWidthFieldPlaceholder}
					/>
          <div className={styles.bottomContainer}>
						<Button title={formTexts.formResetButtonTitle} htmlType='reset' type='clear' />
						<Button title={formTexts.formSubmitButtonTitle} htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
