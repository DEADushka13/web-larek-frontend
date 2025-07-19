import './scss/styles.scss';

<<<<<<< HEAD
import { EventEmitter } from './components/base/events';
import { Api } from './components/base/api';
import {API_URL, CDN_URL} from "./utils/constants";


const events = new EventEmitter();
const api = new Api(CDN_URL);



// По чуть-чуть

=======
interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

interface IEventEmitter {
    emit: (event: string, data: unknown) => void;
}
>>>>>>> 77e5cd6aedef6c32db1a600a47da5632f31aac2b

class BasketModel implements IBasketModel {
    items: Map<string, number> = new Map();
    constructor(protected events: IEventEmitter) { }
    add(id: string): void {
        if (!this.items.has(id)) this.items.set(id, 0);
        this.items.set(id, this.items.get(id)! + 1);
        this._changed();
    }
    remove(id: string): void {
        if (!this.items.has(id)) return;
        if (this.items.get(id)! > 0) {
            this.items.set(id, this.items.get(id)! - 1);
            if (this.items.get(id)! === 0) this.items.delete(id);
        }
        this._changed();
    }

    protected _changed() {//метод генерирует уведомление об изменении
        this.events.emit('basket:change', { items: Array.from(this.items.keys()) });
    };
}

<<<<<<< HEAD

=======
interface IProduct {
    id: string;
    title: string;
}
interface CatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]): void; //чтобы установить после загрузки из апи
    getProduct(id: string): IProduct;//чтобы получить при рендере списков
}

interface IViewConstructor {
    new(container: HTMLElement, events?: IEventEmitter): IView; //на входе контейнер, в него выводить
}

interface IView {
    render(data?: object): HTMLElement;//Устанавливаем данные, возвращаем контейнер
}
>>>>>>> 77e5cd6aedef6c32db1a600a47da5632f31aac2b

class BasketItemView implements IView {
    // элементы внутри контейнера
    protected title: HTMLSpanElement;
    protected addButton: HTMLButtonElement;
    protected removeButton: HTMLButtonElement;
    // данные, которые сохраняем на будущее
    protected id: string | null = null;
    constructor(protected container: HTMLElement, protected events: IEventEmitter) {
        // инициализируем, чтобы не искать повторно
        this.title = container.querySelector('.basket-item__title') as HTMLSpanElement;
        this.addButton = container.querySelector('.basket-item__add') as HTMLButtonElement;
        this.removeButton = container.querySelector('.basket-item__remove') as HTMLButtonElement;
        //устанавливаем события
        this.addButton.addEventListener('click', () => {
            //генерируем событие в нашем брокере
            this.events.emit('ui:basket-add', { id: this.id });
        });
        this.removeButton.addEventListener('click', () => {
            //генерируем событие в нашем брокере
            this.events.emit('ui:basket-remove', { id: this.id });
        });
    }

    render(data: { id: string, title: string }) {
        if (data) {
            //если есть новые данные, то запомним их
            this.id = data.id;
            //и выведем в интерфейс
            this.title.textContent = data.title;
        }
        return this.container;
    }
}

<<<<<<< HEAD

=======
>>>>>>> 77e5cd6aedef6c32db1a600a47da5632f31aac2b
class BasketView implements IView {
    constructor(protected container: HTMLElement) { }
    render(data: { items: HTMLElement[] }) {
        if (data) {
            this.container.replaceChildren(...data.items);
        }
        return this.container;
    }
}

<<<<<<< HEAD
// const api = new Api('asd');
// const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BasketModel(events);
// const catalogModel = new CatalogModel(events);
=======
const api = new ShopAPI();
const events = new EventEmitter();
const basketView = new BasketView(document.querySelector('.basket'));
const basketModel = new BasketModel(events);
const catalogModel = new CatalogModel(events);
>>>>>>> 77e5cd6aedef6c32db1a600a47da5632f31aac2b

//можно собрать в функции или классы отдельные экраны с логикой их формариования
function renderBasket(items: string[]) {
    basketView.render(
        items.map(id => {
            const itemView = new BasketItemView(events);
            return itemView.render(catalogModel.getProduct(id));
        })
    );
}

<<<<<<< HEAD
// //при изменении рендерим
// events.on('basket:change', (event: { items: string[] }) => {
//     // выводим куда-то
//     // отобразить изменения через отображение
//     renderBasket(event.items);
// });

// //при действиях изменяем модель, а после этого случится рендер
// events.on('ui:basket-add', (event: { id: string }) => {
//     basketModel.add(event.id);
// });

// events.on('ui:basket-remove', (event: { id: string }) => {
//     basketModel.remove(event.id);
// });
=======
//при изменении рендерим
events.on('basket:change', (event: { items: string[] }) => {
    // выводим куда-то
    // отобразить изменения через отображение
    renderBasket(event.items);
});

//при действиях изменяем модель, а после этого случится рендер
events.on('ui:basket-add', (event: { id: string }) => {
    basketModel.add(event.id);
});

events.on('ui:basket-remove', (event: { id: string }) => {
    basketModel.remove(event.id);
});
>>>>>>> 77e5cd6aedef6c32db1a600a47da5632f31aac2b

api.getCatalog()
    .then(catalogModel.setItems.bind(catalogModel))
    .catch(err => console.error(err));
