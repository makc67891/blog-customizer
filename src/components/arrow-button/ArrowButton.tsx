import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	openForm: boolean;
	setOpenForm: (param: boolean) => void;
};

export const ArrowButton = ({ openForm, setOpenForm }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={() => setOpenForm(!openForm)}
			className={clsx(styles.container, openForm && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, openForm && styles.arrow_open)}
			/>
		</div>
	);
};
