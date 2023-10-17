interface Product {
    getDescripcion(): string;
}

class ConcreteProductA implements Product {
    getDescripcion(): string {
        return 'Product A';
    }
}

class ConcreteProductB implements Product {
    getDescripcion(): string {
        return 'Product B';
    }
}

class ProductFactory {
    public createProduct(type: string): Product {
        if (type === 'A') {
            return new ConcreteProductA();
        } 
        
        if (type === 'B') {
            return new ConcreteProductB();
        }

        throw new Error('Producto no soportado.');
    }
}

export default ProductFactory;