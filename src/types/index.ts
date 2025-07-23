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
type payment_method = 'online' | 'After receiving';

interface IProduct {
    id: string;
    title: string;
    category: string;
    img: URL;
    cost: number;
    description: string;
}

interface ICustomer {
    payment_method: payment_method;
    delivery_address: string;
    email: string;
    phone_number: string;
    setPayment(payment_method: payment_method): void;
    setAddress(delivery_address: string): void;
    setEmail(email: string): void;
    setPhone(phone_number: string): void;
    clearData(): void;
}

interface ICatalog {
    items: IProduct[];
    setItems(items: IProduct[]): void; //чтобы установить после загрузки из апи
    getProduct(id: string): IProduct;//чтобы получить при рендере списков
}

interface IBasket {
    items: Map<string, number>;
    get_total_cost(): number;
    add(id: string): void;
    remove(id: string): void;
    clear(): void;
    get_list(): Map<string, number>;
    return_total_cost(): number;
}








