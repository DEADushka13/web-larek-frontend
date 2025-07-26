// Типов данных с которыми будете работать в приложении. Как минимум у вас
// должны быть описаны объекты приходящие к вам через API и
// объекты выводимые на экране. Ваши модели в итоге должны будут
// трансформировать один тип в другой.

// +Интерфейс API-клиента
// +Интерфейсы модели данных
// Интерфейсы отображений
// +Интерфейсы базовых классов
// +Перечисление событий и их интерфейсы (если используете брокер)
// Любые другие типы и интерфейсы если вы заложили их в архитектуру
import { Product } from '../components/AppData';

export type CategoryType =
	| 'другое'
	| 'софт-скил'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export type CategoryMapping = {
	[Key in CategoryType]: string;
};

export interface ApiResponse {
	items: IProduct[];
}

export interface IProduct {
	id: string;
	title: string;
	category: CategoryType;
	image: string;
	price: number | null;
	description: string;
	selected: boolean;
}

export interface IAppState {
	basket: Product[];
	catalog: Product[];
	order: IOrder;
	formErrors: FormErrors;
	addToBasket(value: Product): void;
	deleteFromBasket(id: string): void;
	clearBasket(): void;
	getBasketAmount(): number;
	getTotalBasketPrice(): number;
	setItems(): void;
	setOrderForm(field: keyof IOrderForm, value: string): void;
	validateContacts(): boolean;
	validateOrder(): boolean;
	refreshOrder(): boolean;
	setCatalog(items: IProduct[]): void;
	resetSelected(): void;
}

export interface IOrder {
	items: string[];
	payment: string;
	total: number;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}
