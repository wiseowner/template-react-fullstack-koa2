import { observable } from 'mobx';
class Example {
    @observable list = [1, 2, 3]
}

export default new Example();