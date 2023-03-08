import fs from 'fs'

class ProductManager{
    static idCounter = 0;
    constructor(){
        this.path = "./src/ProductLibrary.json";
        this.products = [];
    }
 
    async addProduct(obj){
        // TODO validar entrada
        
        class Product{
            constructor(obj){//dar formato id title description price thumbnail code stock
                this.title = obj.title;
                this.description = obj.description;
                this.price = obj.price;
                this.thumbnail = obj.thumbnail;
                this.code = obj.code;
                this.stock = obj.stock;
                this.id = ProductManager.idCounter++; //asignar id autoincrementable
            }
        }
        let product = new Product(obj)
        this.products.push(product) //guardar en el arreglo
        let json = JSON.stringify(this.products,null,'\t')
        await fs.promises.writeFile(this.path, json)
        // TODO guardar en archivo
        return product;
    }
    async getProducts(){ //leer el archivo de productos y devolver un arreglo con los productos
        let productos = JSON.parse(await fs.promises.readFile(this.path,'utf-8'))
        this.products = productos;
        return this.products;
    }
    async getProductById(id){//lee el archivo, busca el producto con el id y lo devuelve como objeto
        let products = await this.getProducts()
        let idNum = Number(id)
        let found = products.find(e=>e.id===idNum)
        return found? found : {error:"No encontrado"}
    }
    async updateProduct(id,obj){//recibir el id del producto a actualizar y campo a actualizar/objeto completo, no borrar ID. 
        let products = await this.getProducts()
        let i = products.findIndex(e=>{return e.id===id})
        let updProd = Object.assign(products[i], obj)
        
    }
    async deleteProduct(id){//eliminar el producto que tenga ese id de archivo
        let products = await this.getProducts()
        console.log(products)
        let i = products.findIndex(e=>{return e.id===id})
        if (i===-1) return {}
        products.splice(i, 1)
        let json = JSON.stringify(products, null,'\t')
        fs.promises.writeFile(this.path, json)
    }
}
 
export default ProductManager;

